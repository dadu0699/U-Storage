const mysqlConnection = require('../config/database');
const md5 = require('md5');

// require('dotenv').config();
// const CryptoJS = require('crypto-js');
// const key = CryptoJS.enc.Hex.parse(process.env.CRYPTO_KEY);
// const iv = CryptoJS.enc.Hex.parse(process.env.CRYPTO_IV);

const userModel = {
  executeQuery(query, params, callback) {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
  },

  signIn(params, callback) {
    const user = [
      params.nickname,
      md5(params.password),
      // CryptoJS.AES.encrypt(params.password, key, {
      //   iv: iv
      // }).toString(),
    ];

    const query = `
      SELECT userID, nickname, email, photo
      FROM User
      WHERE nickname = ? AND password = ?
    `;

    return this.executeQuery(query, user, callback);
  },

  signUp(params, callback) {
    const user = [
      params.nickname,
      params.email,
      md5(params.password),
      // CryptoJS.AES.encrypt(params.password, key, {
      //   iv: iv
      // }).toString(),
      params.photo.thumbnail
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

  uploadPhoto(params, callback) {
    const user = [params.thumbnail, params.userID];

    const query = `
      UPDATE User SET photo = ? WHERE userID = ?
    `;

    return this.executeQuery(query, user, callback);
  }
};

module.exports = userModel;
