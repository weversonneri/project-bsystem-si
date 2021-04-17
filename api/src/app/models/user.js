// eslint-disable-next-line
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Scope, {
        foreignKey: 'scope_id',
      });
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
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
  User.addHook('beforeSave', async (user) => {
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });
  return User;
};
