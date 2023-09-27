'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentMethod.init({
    paymentMethodName: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    cardHolder: DataTypes.STRING,
    cardMonth: DataTypes.STRING,
    cardYear: DataTypes.STRING,
    cardCvv: DataTypes.STRING,
    vaNumber: DataTypes.STRING,
    eWalletNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentMethod',
  });
  return PaymentMethod;
};