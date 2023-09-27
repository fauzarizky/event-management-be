"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
    }
  }
  Event.init(
    {
      name: DataTypes.CHAR(100),
      type: DataTypes.ENUM("music", "webinar", "sports"),
      date: DataTypes.DATE,
      location: DataTypes.ENUM("online", "jakarta", "bekasi", "surabaya", "lombok", "bali", "lampung", "malaysia"),
      description: DataTypes.CHAR,
      gold_ticket_price: DataTypes.INTEGER,
      platinum_ticket_price: DataTypes.INTEGER,
      diamond_ticket_price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
