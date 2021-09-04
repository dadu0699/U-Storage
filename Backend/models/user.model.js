const mysqlConnection = require('../config/database');

require('dotenv').config();
const CryptoJS = require("crypto-js");
const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const userModel = {
  executeQuery(query, params, callback) {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
  },

  signIn(params, calback) {
    const user = [
      params.nickname,
      CryptoJS.AES.encrypt(params.password, key, {
        iv: iv
      }).toString(),
    ];

    const query = `
      SELECT userID, nickname, email, photo
      FROM User
      WHERE nickname = ? AND password = ?
    `;

    return this.executeQuery(query, user, calback);
  },

  signUp(params, callback) {
    const user = [
      params.nickname,
      params.email,
      CryptoJS.AES.encrypt(params.password, key, {
        iv: iv
      }).toString(),
      params.photo
    ];

    const query = `
      INSERT INTO User(nickname, email, password, photo)
      VALUES(?, ?, ?, ?)
    `;

    return this.executeQuery(query, user, callback);
  },

  get(params, callback) {
    let users = [params.userID];

    let query = `
      SELECT userID, nickname, email, photo
      FROM User
      WHERE userID != ?
    `;

    if (params.friendID) {
      users.push(params.friendID);
      query += ' AND userID = ?';
    }

    return this.executeQuery(query, users, callback);
  },
};

module.exports = userModel;
