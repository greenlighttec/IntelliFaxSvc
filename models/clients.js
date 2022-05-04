'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Clients.hasMany(models.Users, {foriegnKey: 'clientid', onDelete: 'CASCADE})
     Clients.hasMany(models.Devices, {foriegnKey: 'clientid', onDelete: 'CASCADE})
     Clients.hasMany(models.PhoneNumbers, {foriegnKey: 'clientid', onDelete: 'CASCADE})
     Clients.hasMany(models.FaxLogs, {foriegnKey: 'clientid', onDelete: 'CASCADE'})
    }
  }
  Clients.init({
    clientname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clients',
  });
  return Clients;
};
