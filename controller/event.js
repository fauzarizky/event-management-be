const { Event } = require("../models");
const { Op } = require("sequelize");

exports.handleCreateEvent = async (req, res) => {
  const { name, type, date, location, description, gold_ticket_price, platinum_ticket_price, diamond_ticket_price } = req.body;
  const { filename } = req.file;
  console.log(req.file);

  try {
    const result = await Event.create({
      image: filename,
      name,
      type,
      date,
      location,
      description,
      gold_ticket_price,
      platinum_ticket_price,
      diamond_ticket_price,
    });

    res.status(201).json({
      ok: true,
      message: "Event created!",
      detail: result,
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
      msg: String(error),
    });
  }
};

exports.getSpesificEvent = async (req, res) => {
  try {
    const { event } = req.params;

    const data = await Event.findAll({
      where: {
        name: {
          [Op.like]: `%${event}`,
        },
      },
    });

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: String(error),
    });
  }
};

exports.getEventByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    const data = await Event.findAll({
      where: {
        location,
      },
    });

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: String(error),
    });
  }
};
