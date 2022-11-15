'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Books' }, key: 'id' }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Users' }, key: 'id' }
      },
      rentalDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      returnDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Rentals')
  }
};
