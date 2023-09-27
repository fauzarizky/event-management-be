"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsToMany(models.Price, {through: "eventPrice" });
    }
  }
  Event.init(
    {
      name: DataTypes.CHAR(100),
      type: DataTypes.ENUM("music", "webinar", "sports"),
      date: DataTypes.DATE,
      location: DataTypes.ENUM("online", "jakarta", "bekasi", "surabaya", "lombok", "bali", "lampung", "malaysia"),
      description: DataTypes.CHAR,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
