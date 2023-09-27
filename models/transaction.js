'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    eventId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE,
    paymentMethodId: DataTypes.INTEGER,
    refferalId: DataTypes.INTEGER,
    couponId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};