'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FaxLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      telnyxfaxid: {
        type: Sequelize.STRING
      },
      atafaxid: {
        type: Sequelize.STRING
      },
      clientid: {
        type: Sequelize.INTEGER
      },
      deviceid: {
        type: Sequelize.INTEGER
      },
      numberfrom: {
        type: Sequelize.STRING
      },
      numberto: {
	type: Sequelize.STRING
      },
      direction: {
        type: Sequelize.STRING
      },
      attempts: {
        type: Sequelize.INTEGER
      },
      result: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('FaxLogs');
  }
};
