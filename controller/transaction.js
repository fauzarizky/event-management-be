const { Event, Transaction, Referral, Coupon, Account, PaymentMethod, Ticket } = require("../models");
const fs = require("fs");
const hbs = require("handlebars");
const mailer = require("../lib/nodemailer");

exports.handleCreateTransaction = async (req, res) => {
  const eventId = req.params.eventId;
  const { quantityGold, quantityPlatinum, quantityDiamond, referralCode, couponCode, paymentMethod, cardNumber, cardHolder, cardMonth, cardYear, cardCvv } = req.body;

  try {
    // Step 1: Retrieve the user's account based on userId
    const account = await Account.findOne({
      where: { id: req.user.id }, // Assuming the primary key of Account model is 'id'
    });

    if (!account) {
      return res.status(404).json({
        ok: false,
        message: "User account not found",
      });
    }

    // Step 2: Retrieve the event based on eventId
    const event = await Event.findOne({
      where: { id: eventId }, // Assuming the primary key of Event model is 'id'
    });

    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "Event not found",
      });
    }

    // Calculate the total quantity
    const quantityTotal = quantityGold + quantityPlatinum + quantityDiamond;

    // Step 3: Validate referral code (if provided)
    let referral = null;
    if (referralCode) {
      referral = await Referral.findOne({
        where: { code: referralCode },
        attributes: ["id", "code", "createdAt", "updatedAt"], // Explicitly specify the attributes to select
      });

      if (!referral) {
        return res.status(400).json({
          ok: false,
          message: "Referral code not valid",
        });
      }

      // Check if the referral belongs to the same user
      if (referral.id === req.user.id) {
        return res.status(400).json({
          ok: false,
          message: "You cannot use your own referral code",
        });
      }
    }
    // Step 4: Validate coupon code (if provided)
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        where: { code: couponCode },
      });

      if (!coupon) {
        return res.status(400).json({
          ok: false,
          message: "Coupon code not valid",
        });
      }
    }

    // // Step 5: Validate credit card details
    // if (paymentMethod === "Credit Card") {
    //   if (!cardNumber || !cardHolder || !cardMonth || !cardYear || !cardCvv) {
    //     return res.status(400).json({
    //       ok: false,
    //       message: "Credit card details are incomplete",
    //     });
    //   }
    //   // Add additional validation logic for card number, expiration date, and CVV as needed
    // }

    // Step 6: Create a new PaymentMethod record with vaNumber and eWalletNumber
    let vaNumber = null;
    let eWalletNumber = null;
    let cardNumber = null;
    let cardHolder = null;
    let cardMonth = null;
    let cardYear = null;
    let cardCvv = null;

    if (paymentMethod === "BCA Virtual Account") {
      vaNumber = "88000" + account.phoneNumber;
    } else if (paymentMethod === "Mandiri Virtual Account") {
      vaNumber = "90012" + account.phoneNumber;
    } else if (paymentMethod === "BNI Virtual Account") {
      vaNumber = "8005" + account.phoneNumber;
    } else if (["GOPAY", "OVO", "DANA"].includes(paymentMethod)) {
      eWalletNumber = account.phoneNumber;
    } else if (paymentMethod === "Credit Card") {
      // Set card fields from req.body if paymentMethod is "Credit Card"
      cardNumber = req.body.cardNumber;
      cardHolder = req.body.cardHolder;
      cardMonth = req.body.cardMonth;
      cardYear = req.body.cardYear;
      cardCvv = req.body.cardCvv;
    }

    const paymentMethodRecord = await PaymentMethod.create({
      paymentMethodName: paymentMethod,
      cardNumber,
      cardHolder,
      cardMonth,
      cardYear,
      cardCvv,
      vaNumber,
      eWalletNumber,
    });

    // Step 7: Calculate the base total price without coupon discount
    const goldTicketPrice = event.gold_ticket_price;
    const platinumTicketPrice = event.platinum_ticket_price;
    const diamondTicketPrice = event.diamond_ticket_price;
    let baseTotalPrice = 0;
    if (quantityGold) {
      baseTotalPrice += quantityGold * goldTicketPrice;
    }

    if (quantityPlatinum) {
      baseTotalPrice += quantityPlatinum * platinumTicketPrice;
    }

    if (quantityDiamond) {
      baseTotalPrice += quantityDiamond * diamondTicketPrice;
    }

    // Step 8: Calculate the total price with coupon discount (if applicable)
    let totalPrice = baseTotalPrice;
    if (coupon && coupon.discount > 0) {
      totalPrice = baseTotalPrice - baseTotalPrice * (coupon.discount / 100);
    }

    // Step 9: Create a new transaction and associate it with the PaymentMethod record
    const transaction = await Transaction.create({
      eventId: event.id,
      accountId: req.user.id, // Assuming 'eventId' is a foreign key in Transaction model
      quantityGold,
      quantityPlatinum,
      quantityDiamond,
      quantityTotal,
      transactionDate: new Date(),
      referralId: referral ? referral.id : null,
      couponId: coupon ? coupon.id : null,
      totalPrice, // Assign the calculated total price
      paymentMethodId: paymentMethodRecord.id, // Assign the PaymentMethodId
    });

    // Step 10: Prepare the response object with relevant quantities and payment method details
    const quantities = {};
    if (quantityGold > 0) {
      quantities.gold = quantityGold;
    }
    if (quantityPlatinum > 0) {
      quantities.platinum = quantityPlatinum;
    }
    if (quantityDiamond > 0) {
      quantities.diamond = quantityDiamond;
    }

    await Ticket.create({
      transactionId: transaction.id,
      isPayed: false,
    });

    const rupiahFormat = (number) => {
      // Format the number as Rupiah using the Indonesian locale (id-ID)
      return number.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    };

    const invoice =  "INV/" + transaction.createdAt.getTime() + "/" + transaction.id  + "/" + account.username.toUpperCase()

    // Step 11: Prepare the response object with relevant quantities and payment method details
    const responseObj = {
      ok: true,
      message: "Transaction created! the details has been mailed to your email!",
      invoice,
      transactionId: transaction.id,
      event: event.name,
      quantities,
      referral: referral ? referral.code : "No referral code applied",
      discount: coupon ? coupon.discount + "%" : "No discount code applied",
      totalPrice: rupiahFormat(totalPrice),
      paymentMethod: {
        name: paymentMethod,
      },
    };

    // Conditionally add vaNumber based on payment method
    if (!["Credit Card", "GOPAY", "OVO", "DANA"].includes(paymentMethod)) {
      responseObj.paymentMethod.vaNumber = vaNumber;
    }

    const templateRaw = fs.readFileSync(__dirname + "/../templates/transaction.html", "utf-8");

    const templateCompile = hbs.compile(templateRaw);
    const responseHTML = {
      invoice,
      transactionId: transaction.id,
      firstName: account.firstName,
      date: transaction.createdAt,
      eventName: event.name,
      eventDate: event.date,
      location: event.location,
      paymentMethod: paymentMethodRecord.paymentMethodName,
      ticket: transaction.quantityTotal + (transaction.quantityTotal > 1 ? " Tickets" : " Ticket"),
      price: transaction.totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
    };

    if (transaction.quantityGold) {
      responseHTML.goldTicket = transaction.quantityGold + (transaction.quantityGold > 1 ? " Tickets" : " Ticket");
    }
    if (transaction.quantityPlatinum) {
      responseHTML.platinumTicket = transaction.quantityPlatinum + (transaction.quantityPlatinum > 1 ? " Tickets" : " Ticket");
    }
    if (transaction.quantityDiamond) {
      responseHTML.diamondTicket = transaction.quantityDiamond + (transaction.quantityDiamond > 1 ? " Tickets" : " Ticket");
    }

    const emailHTML = templateCompile(responseHTML);

    const resultEmail = await mailer.sendMail({
      to: account.email,
      from: "no-reply@mytix.com",
      subject: "You have booked ticket! please complete your transaction.",
      html: emailHTML,
    });

    // Return the response object
    res.status(201).json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.handlePayTicket = async (req, res) => {
  const transactionId = req.params.transactionId;

  try {
    // Step 1: Retrieve the transaction based on transactionId
    const transaction = await Transaction.findOne({
      where: { id: transactionId },
      include: [
        {
          model: Event,
          attributes: ["name", "date", "location"],
        },
        {
          model: PaymentMethod,
          attributes: ["paymentMethodName"],
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({
        ok: false,
        message: "Transaction not found",
      });
    }

    // Step 2: Retrieve the associated ticket
    const ticket = await Ticket.findOne({
      where: { transactionId: transaction.id },
    });

    if (!ticket) {
      return res.status(404).json({
        ok: false,
        message: "Ticket not found",
      });
    }

    // Step 3: Check if isPayed is already true for the ticket
    if (ticket.isPayed) {
      return res.status(400).json({
        ok: false,
        message: "Ticket is already marked as paid",
      });
    }

    // Step 4: Check if a valid referral code is used in the transaction
    if (transaction.referralId) {
      const referral = await Referral.findOne({
        where: { id: transaction.referralId },
        attributes: ["id", "code", "createdAt", "updatedAt"],
      });

      if (referral && referral.userId !== transaction.accountId) {
        // Valid referral code is used (and not the user's own referral code)

        // Temukan akun yang merujuk kode referensi
        const referredAccount = await Account.findOne({
          where: { id: referral.id },
        });

        if (referredAccount) {
          referredAccount.accountPoint += 100;
          await referredAccount.save();
        }

        // Update the ticket to set isPayed to true
        ticket.isPayed = true;
        await ticket.save();

        const account = await Account.findOne({
          where: { id: req.user.id },
          attributes: ["firstName", "email", "username"],
        });

        const invoice =  "INV/" + transaction.createdAt.getTime() + "/" + transaction.id  + "/" + account.username.toUpperCase()
        
        // Use the user's firstName in the email template
        const templateRaw = fs.readFileSync(__dirname + "/../templates/paymentsuccess.html", "utf-8");

        const templateCompile = hbs.compile(templateRaw);
        const response2HTML = {
          invoice,
          ticketId: ticket.id,
          firstName: account.firstName,
          date: ticket.updatedAt,
          eventName: transaction.Event.name,
          eventDate: transaction.Event.date,
          location: transaction.Event.location,
          price: transaction.totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
          paymentMethod: transaction.PaymentMethod.paymentMethodName,
          ticket: transaction.quantityTotal + (transaction.quantityTotal > 1 ? " Tickets" : " Ticket"),
        };

        if (transaction.quantityGold) {
          response2HTML.goldTicket = transaction.quantityGold + (transaction.quantityGold > 1 ? " Tickets" : " Ticket");
        }
        if (transaction.quantityPlatinum) {
          response2HTML.platinumTicket = transaction.quantityPlatinum + (transaction.quantityPlatinum > 1 ? " Tickets" : " Ticket");
        }
        if (transaction.quantityDiamond) {
          response2HTML.diamondTicket = transaction.quantityDiamond + (transaction.quantityDiamond > 1 ? " Tickets" : " Ticket");
        }

        const emailHTML = templateCompile(response2HTML);

        const resultEmail = await mailer.sendMail({
          to: account.email,
          from: "no-reply@mytix.com",
          subject: "Thank you for the completing the transactions, This is your details of your ticket.",
          html: emailHTML,
        });

        // Create a custom message indicating the awarding of points
        const awardMessage = `You are using ${referredAccount.username}'s referral code, and they were awarded 100 points!`;

        // Return a success response with the custom award message
        return res.status(200).json({
          ok: true,
          message: "Payment Success, the detail of your ticket is sended to your email.",
          invoice,
          ticket: ticket,
          awardMessage: awardMessage,
        });
      }
    }
    // If no valid referral code is used, if the referral is not found, or if it belongs to the same user, return a success response without adding points
    // Update the ticket to set isPayed to true
    ticket.isPayed = true;
    await ticket.save();

    return res.status(200).json({
      ok: true,
      message: "Payment successful",
      ticket: ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};
