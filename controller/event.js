const { Event, Account } = require("../models");
const { Op } = require("sequelize");
const { fs } = require("fs");

exports.handleCreateEvent = async (req, res) => {
  const { name, type, date, location, description, gold_ticket_price, platinum_ticket_price, diamond_ticket_price } = req.body;
  console.log(req.file);
  const { filename } = req.file;

  try {
    if (profile.profilePicture) {
      //delete old picture
      fs.rmSync(__dirname + "/../public/" + profile.profilePicture);
    }
    const result = await Event.create({
      accountId: req.user.id,
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
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const offset = (page - 1) * limit;

    const events = await Event.findAll({
      limit,
      offset,
      include: [
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });

    // Transform the data
    const responseObj = events.map((event) => ({
      id: event.id,
      name: event.name,
      image: event.image,
      type: event.type,
      date: event.date,
      location: event.location,
      description: event.description,
      gold_ticket_price: event.gold_ticket_price,
      platinum_ticket_price: event.platinum_ticket_price,
      diamond_ticket_price: event.diamond_ticket_price,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      OrganizedBy: event.Account.username,
    }));

    res.status(200).json({
      ok: true,
      data: responseObj,
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

    const datas = await Event.findAll({
      where: {
        name: {
          [Op.like]: `%${event}`,
        },
      },
      include: [
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });

    const resData = datas.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image,
      type: data.type,
      date: data.date,
      location: data.location,
      description: data.description,
      gold_ticket_price: data.gold_ticket_price,
      platinum_ticket_price: data.platinum_ticket_price,
      diamond_ticket_price: data.diamond_ticket_price,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      OrganizedBy: data.Account.username,
    }));

    res.status(200).json({
      ok: true,
      data: resData,
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

    const datas = await Event.findAll({
      where: {
        location,
      },
      include: [
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });

    const resData = datas.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image,
      type: data.type,
      date: data.date,
      location: data.location,
      description: data.description,
      gold_ticket_price: data.gold_ticket_price,
      platinum_ticket_price: data.platinum_ticket_price,
      diamond_ticket_price: data.diamond_ticket_price,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      OrganizedBy: data.Account.username,
    }));

    res.status(200).json({
      ok: true,
      data: resData,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: String(error),
    });
  }
};

exports.getEventByType = async (req, res) => {
  try {
    const { type } = req.params;

    const datas = await Event.findAll({
      where: {
        type,
      },
      include: [
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });

    const resData = datas.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image,
      type: data.type,
      date: data.date,
      location: data.location,
      description: data.description,
      gold_ticket_price: data.gold_ticket_price,
      platinum_ticket_price: data.platinum_ticket_price,
      diamond_ticket_price: data.diamond_ticket_price,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      OrganizedBy: data.Account.username,
    }));

    res.status(200).json({
      ok: true,
      data: resData,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: String(error),
    });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const datas = await Event.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Account,
          attributes: ["username"],
        },
      ],
    });

    const resData = datas.map((data) => ({
      id: data.id,
      name: data.name,
      image: data.image,
      type: data.type,
      date: data.date,
      location: data.location,
      description: data.description,
      gold_ticket_price: data.gold_ticket_price,
      platinum_ticket_price: data.platinum_ticket_price,
      diamond_ticket_price: data.diamond_ticket_price,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      OrganizedBy: data.Account.username,
    }));

    res.status(200).json({
      ok: true,
      data: resData,
    });
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: String(error),
    });
  }
};
