'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Events",
          key: "id",
        },
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      transactionDate: {
        type: Sequelize.DATE
      },
      paymentMethodId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PaymentMethods",
          key: "id",
        },
      },
      referralId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Referrals",
          key: "id",
        },
      },
      couponId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Coupons",
          key: "id",
        },
      },
      quantityGold: {
        type: Sequelize.INTEGER
      },
      quantityPlatinum: {
        type: Sequelize.INTEGER
      },
      quantityDiamond: {
        type: Sequelize.INTEGER
      },
      quantityTotal: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};