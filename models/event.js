"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // This should be 1 to M relation
    }
  }
  Event.init(
    {
      name: DataTypes.CHAR(100),
      accountId: DataTypes.INTEGER,
      type: DataTypes.ENUM("music", "webinar", "sports"),
      date: DataTypes.DATE,
      location: DataTypes.ENUM("online", "jakarta", "bekasi", "surabaya", "lombok", "bali", "lampung", "malaysia"),
      description: DataTypes.CHAR,
      gold_ticket_price: DataTypes.INTEGER,
      platinum_ticket_price: DataTypes.INTEGER,
      diamond_ticket_price: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
