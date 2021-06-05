const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_token.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  User_token.init({
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    password_reset_token: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    modelName: 'User_token',
  });
  return User_token;
};
