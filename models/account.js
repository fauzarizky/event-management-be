'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {  
    static associate(models) {
      Account.hasMany(models.Event, {foreignKey: "accountId" });
      Account.hasMany(models.Transaction, {foreignKey: "accountId" });
      Account.hasOne(models.Referral, {foreignKey: "referralId"});
    }
  }
  Account.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    referralId: DataTypes.INTEGER,
    accountType: DataTypes.ENUM("user", "event organizer")
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};