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
      Transaction.hasMany(models.ticket, { foreignKey: "transactionId" });
      Transaction.belongsTo(models.Event, { foreignKey: "eventId" });
      Transaction.belongsTo(models.paymentMethod, { foreignKey: "paymentMethodId" });
      Transaction.belongsTo(models.account, { foreignKey: "accountId" });
      Transaction.belongsTo(models.coupon, { foreignKey: "couponId" });
      Transaction.belongsTo(models.referral, { foreignKey: "referralId" });
    }
  }
<<<<<<< HEAD
  Transaction.init({
    eventId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE,
    paymentMethodId: DataTypes.INTEGER,
    referralId: DataTypes.INTEGER,
    couponId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
=======
  Transaction.init(
    {
      eventId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE,
      paymentMethodId: DataTypes.INTEGER,
      refferalId: DataTypes.INTEGER,
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
>>>>>>> 3554ba0de7948f10e03a56fd7c40ff22b61f2cd2
  return Transaction;
};
