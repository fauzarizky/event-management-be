'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {  
    static associate(models) {
      Account.belongsToMany(models.Event, {through: "Event" });
      Account.belongsToMany(models.Transaction, {through: "Transaction" });
      Account.hasOne(models.Referral, {foreignKey: "referralId"});
    }
  }
  Account.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    referralId: DataTypes.STRING,
    accountType: DataTypes.ENUM("user", "event organizer")
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};