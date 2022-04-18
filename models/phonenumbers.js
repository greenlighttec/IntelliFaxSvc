'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     PhoneNumbers.belongsTo(models.Clients, {foriegnKey: 'clientid', onDelete: 'CASCADE'})
     PhoneNumbers.belongsTo(models.Devices, {foriegnKey: 'deviceid'})

    }
  }
  PhoneNumbers.init({
    clientid: DataTypes.INTEGER,
    deviceid: DataTypes.INTEGER,
    phonenumber: DataTypes.STRING,
    line: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhoneNumbers',
  });
  return PhoneNumbers;
};
