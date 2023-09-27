const { Event } = require("../models");

exports.handleCreateEvent = async (req, res) => {
  const { name, type, date, location, description } = req.body;

  try {
    await Event.create({
      name,
      type,
      date,
      location,
      description,
      gold_ticket_price,
      platinum_ticket_price,
      diamond_ticket_price
    });

    res.status(201).json({
        ok: true,
        message: "Event created!",
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = Event.findAll();

    res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    res.status(400).json({
        ok: false,
        msg: String(error)
    })
  }
};
