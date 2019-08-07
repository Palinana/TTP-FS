const Sequelize = require('sequelize');
const dbname = 'ttp-fs';
const db = new Sequelize(`postgres://localhost:5432/${dbname}`, {logging: false});

module.exports = db;