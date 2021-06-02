// eslint-disable-next-line
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsToMany(models.User, { foreignKey: 'service_id', through: 'Provider_services', as: 'providers' });

      Service.hasMany(models.Appointment, { foreignKey: 'service_id', as: 'appointments' });
    }
  }
  Service.init({
    title: DataTypes.STRING,
    duration: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
  });
  return Service;
};
