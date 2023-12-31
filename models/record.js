'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {
      // define association here
      Record.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Record.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    clockin: DataTypes.DATE,
    clockout: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING,
    isAttendance: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true
  });
  return Record;
};