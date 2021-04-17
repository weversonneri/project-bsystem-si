/* eslint-disable global-require */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
// eslint-disable-next-line
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const config = require('../../config/database');

const db = {};

// Inicia conexao
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
