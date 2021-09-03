const mysqlConnection = require('../config/database');
const md5 = require('md5');

const userModel = {
  executeQuery(query, params, callback) {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
  },

  signIn(params, calback) {
    const user = [
      params.nickname,
      md5(params.password),
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
      md5(params.password),
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
