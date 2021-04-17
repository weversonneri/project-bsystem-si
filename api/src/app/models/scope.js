// eslint-disable-next-line
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Scope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Scope.hasMany(models.User, {
        foreignKey: 'scope_id',
      });
    }
  }
  Scope.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Scope',
    tableName: 'Scopes',
  });
  return Scope;
};
