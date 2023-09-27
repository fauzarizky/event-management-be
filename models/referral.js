'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Referral.hasMany(models.Transaction, { foreignKey: "referralId" });
    }
  }
  Referral.init({
    code: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Referral',
  });
  return Referral;
};

