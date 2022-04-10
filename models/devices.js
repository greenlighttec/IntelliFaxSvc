'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Devices.init({
    deviceid: DataTypes.NUMBER,
    clientid: DataTypes.NUMBER,
    name: DataTypes.STRING,
    macaddr: DataTypes.STRING,
    line1: DataTypes.STRING,
    line2: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Devices',
  });
  return Devices;
};