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
    static associate(models) {
      Appointment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      Appointment.belongsTo(models.User, {
        foreignKey: 'provider_id',
        as: 'provider',
      });

      Appointment.belongsTo(models.Service, {
        foreignKey: 'service_id',
        as: 'service',
      });
    }
  }
  Appointment.init({
    date: DataTypes.DATE,
    status: {
      allowNull: false,
      type: DataTypes.ENUM('A', 'I', 'C'),
      defaultValue: 'A',
    },
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'Appointments',
  });
  return Appointment;
};
