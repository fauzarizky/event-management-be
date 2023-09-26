'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.CHAR(100),
        allowNull: false,
        unique: true
      },
      type: {
        type: Sequelize.ENUM('music', 'webinar', 'sports'),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.ENUM('online', 'jakarta', 'bekasi', 'surabaya', 'lombok', 'bali', 'lampung', 'malaysia'),
        allowNull: false,
      },
      description: {
        type: Sequelize.CHAR,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};