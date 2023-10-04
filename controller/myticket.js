const { Ticket, Transaction, Event, PaymentMethod } = require("../models");

exports.handleGetMyTicket = async (req, res) => {
  const accountId = req.user.id;

  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const offset = (page - 1) * limit;
    // Find tickets associated with the user's account
    const { count, rows: tickets } = await Ticket.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Transaction,
          where: { accountId: accountId }, // Filter transactions by accountId
          include: [
            {
              model: Event,
              attributes: ["name", "date", "location"], // Include the event date attribute
            },
            {
              model: PaymentMethod,
              attributes: ["paymentMethodName", "vaNumber", "eWalletNumber"], // Include the payment method name
            },
          ],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    // Check if there are no tickets
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "You don't have booked/purchased any tickets!",
      });
    }

    const ticketData = tickets.map((ticket) => {
      const responseObj = {
        ticketId: ticket.id,
        eventName: ticket.Transaction.Event.name,
        eventDate: ticket.Transaction.Event.date,
        Price: ticket.Transaction.totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
        ticketDetails: {},
        paymentBy: ticket.Transaction.PaymentMethod.paymentMethodName,
        isPayed: ticket.isPayed,
      };

      // Conditionally set quantity fields if they are not 0
      let Gold = ticket.Transaction.quantityGold;
      let Platinum = ticket.Transaction.quantityPlatinum;
      let Diamond = ticket.Transaction.quantityDiamond;
      let TotalTicket = ticket.Transaction.quantityTotal;
      let paymentName = ticket.Transaction.PaymentMethod.paymentMethodName;

      if (TotalTicket !== 0) {
        responseObj.ticketDetails.TotalTicket = TotalTicket + " " + (TotalTicket > 1 ? "Tickets" : "Ticket");
      }

      if (Gold !== 0) {
        responseObj.ticketDetails.Gold = Gold + " " + (Gold > 1 ? "Tickets" : "Ticket");
      }

      if (Platinum !== 0) {
        responseObj.ticketDetails.Platinum = Platinum + " " + (Platinum > 1 ? "Tickets" : "Ticket");
      }

      if (Diamond !== 0) {
        responseObj.ticketDetails.Diamond = Diamond + " " + (Diamond > 1 ? "Tickets" : "Ticket");
      }

      if (!ticket.isPayed && (paymentName === "BCA Virtual Account" || paymentName === "Mandiri Virtual Account" || paymentName === "BNI Virtual Account")) {
        responseObj.vaNumber = ticket.Transaction.PaymentMethod.vaNumber;
      }

      if (!ticket.isPayed && (paymentName === "GOPAY" || paymentName === "OVO" || paymentName === "DANA")) {
        responseObj.eWalletNumber = ticket.Transaction.PaymentMethod.eWalletNumber;
      }

      return responseObj;
    });

    res.status(200).json({
      ok: true,
      pagination: {
        totalData: count + (count > 1 ? " datas" : " data"),
        page,
      },
      data: ticketData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: String(error),
    });
  }
};
