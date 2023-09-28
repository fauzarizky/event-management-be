const { Event, Transaction, Referral, Coupon, Account, PaymentMethod } = require("../models");

exports.handleCreateTransaction = async (req, res) => {
  const eventId = req.params.eventid;
  const {
    quantityGold,
    quantityPlatinum,
    quantityDiamond,
    referralCode,
    couponCode,
    paymentMethod,
    userId, // BELOM FIX NUNGGU TOKEN BAGIANNYA ANIDA
    cardNumber,
    cardHolder,
    cardMonth,
    cardYear,
    cardCvv,
  } = req.body;

  try {
    // Step 1: Retrieve the user's account based on userId
    const account = await Account.findOne({
      where: { id: userId }, // Assuming the primary key of Account model is 'id'
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
      });

      if (!referral) {
        return res.status(400).json({
          ok: false,
          message: "Referral code not valid",
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

    if (["BCA Virtual Account", "Mandiri Virtual Account", "BNI Virtual Account"].includes(paymentMethod)) {
      if (paymentMethod === "BCA Virtual Account") {
        vaNumber = "88000" + account.phoneNumber;
      } else if (paymentMethod === "Mandiri Virtual Account") {
        vaNumber = "90012" + account.phoneNumber;
      } else if (paymentMethod === "BNI Virtual Account") {
        vaNumber = "8005" + account.phoneNumber;
      }
    } else if (["GOPAY", "OVO", "DANA"].includes(paymentMethod)) {
      eWalletNumber = account.phoneNumber;
    }

    const paymentMethodRecord = await PaymentMethod.create({
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
    const baseTotalPrice = quantityGold * goldTicketPrice + quantityPlatinum * platinumTicketPrice + quantityDiamond * diamondTicketPrice;

    // Step 8: Calculate the total price with coupon discount (if applicable)
    let totalPrice = baseTotalPrice;
    if (coupon && coupon.discount > 0) {
      totalPrice = baseTotalPrice - baseTotalPrice * (coupon.discount / 100);
    }

    // Step 9: Create a new transaction and associate it with the PaymentMethod record
    const transaction = await Transaction.create({
      eventId: event.id, // Assuming 'eventId' is a foreign key in Transaction model
      quantityGold,
      quantityPlatinum,
      quantityDiamond,
      quantityTotal,
      referralId: referral ? referral.id : null,
      couponId: coupon ? coupon.id : null,
      totalPrice, // Assign the calculated total price
      PaymentMethodId: paymentMethodRecord.id, // Assign the PaymentMethodId
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

    // Step 11: Prepare the response object with relevant quantities and payment method details
    const responseObj = {
      ok: true,
      message: "Transaction created!",
      event: event.name,
      quantities,
      totalPrice,
      paymentMethod: {
        name: paymentMethod,
      },
    };

    // Conditionally add vaNumber based on payment method
    if (!["Credit Card", "GOPAY", "OVO", "DANA"].includes(paymentMethod)) {
      responseObj.paymentMethod.vaNumber = vaNumber;
    }

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
