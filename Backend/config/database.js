const mysql = require('mysql');

require('dotenv').config();

const params = {
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  host: process.env.HOST_DB,
  multipleStatements: true,
};

module.exports = mysql.createPool(params);
