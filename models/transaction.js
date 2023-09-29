"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.hasMany(models.Ticket, { foreignKey: "transactionId" });
      Transaction.belongsTo(models.Event, { foreignKey: "eventId" });
      Transaction.belongsTo(models.PaymentMethod, { foreignKey: "paymentMethodId" });
      Transaction.belongsTo(models.Account, { foreignKey: "accountId" });
      Transaction.belongsTo(models.Coupon, { foreignKey: "couponId" });
      Transaction.belongsTo(models.Referral, { foreignKey: "referralId" });
    }
  }
  Transaction.init(
    {
      eventId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE,
      paymentMethodId: DataTypes.INTEGER,
      referralId: DataTypes.INTEGER,
      couponId: DataTypes.INTEGER,
      quantityGold: DataTypes.INTEGER,
      quantityPlatinum: DataTypes.INTEGER,
      quantityDiamond: DataTypes.INTEGER,
      quantityTotal: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
