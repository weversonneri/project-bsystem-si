// eslint-disable-next-line
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { url } = require('../../config/config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Scope, { foreignKey: 'scope_id', as: 'scope' });

      User.hasMany(models.Appointment, { foreignKey: 'user_id', as: 'appointments' });

      User.hasOne(models.User_token, { foreignKey: 'user_id', as: 'user_token' });

      User.belongsToMany(models.Service, { foreignKey: 'provider_id', through: 'provider_services', as: 'services' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Esse campo não pode ser vazio',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'Email já cadastrado',
      },
      validate: {
        notEmpty: {
          msg: 'Esse campo não pode ser vazio',
        },
        isEmail: {
          msg: 'Email inválido!',
        },
      },
    },
    scope_id: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    password_hash: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [6],
          msg: 'Tamanho mínimo de senha de seis caracteres',
        },
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${url}/images/${this.getDataValue('avatar')}`;
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });
  return User;
};
