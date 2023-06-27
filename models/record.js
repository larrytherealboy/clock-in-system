'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    static associate(models) {
      // define association here
    }
  };
  Record.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    clockin: DataTypes.DATE,
    clockout: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attendance_record: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Record',
    tableName: 'Records',
    underscored: true
  });
  return Record;
};