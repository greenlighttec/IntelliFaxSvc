'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      deviceid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientid: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      macaddr: {
        type: Sequelize.STRING
      },
      line1: {
        type: Sequelize.STRING
      },
      line2: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
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
    await queryInterface.dropTable('Devices');
  }
};
