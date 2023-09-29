'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.Transaction, { foreignKey: "transactionId" });
    }
  }
  Ticket.init({
    transactionId: DataTypes.INTEGER,
    isPayed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};