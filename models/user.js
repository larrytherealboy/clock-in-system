'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Record, { foreignKey: 'userId' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  });
  return User;
};