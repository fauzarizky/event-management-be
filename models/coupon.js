'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coupon.hasMany(models.Transaction, { foreignKey: "CouponId" });
    }
  }
  Coupon.init({
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};