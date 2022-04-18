'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FaxLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     FaxLogs.belongsTo(models.Clients, {foriegnKey: 'clientid', onDelete: 'CASCADE'})
     FaxLogs.belongsTo(models.Devices, {foriegnKey: 'deviceid', onDelete: 'CASCADE'})
    }
  }
  FaxLogs.init({
    telnyxfaxid: DataTypes.STRING,
    atafaxid: DataTypes.STRING,
    clientid: DataTypes.INTEGER,
    deviceid: DataTypes.INTEGER,
    numberfrom: DataTypes.STRING,
    numberto: DataTypes.STRING,
    direction: DataTypes.STRING,
    attempts: DataTypes.INTEGER,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FaxLogs',
  });
  return FaxLogs;
};
