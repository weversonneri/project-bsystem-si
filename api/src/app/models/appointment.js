// eslint-disable-next-line
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*  static associate(models) {
        // define association here
      } */
  }
  Appointment.init({
    date: DataTypes.DATE,
    status: {
      allowNull: false,
      type: DataTypes.ENUM('A', 'I'),
      defaultValue: 'A',
    },
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'Appointments',
  });
  return Appointment;
};
