const mysqlConnection = require('../config/database');

const fileModel = {
  executeQuery(query, params, callback) {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
  },

  create(params, callback) {
    const file = [
      params.name,
      params.type,
      params.shared,
      params.mimetype,
      params.thumbnail,
      params.filesize,
      params.userID
    ];

    const query = `
      INSERT INTO File(name, type, shared, mimetype,
        thumbnail, filesize, userID)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    return this.executeQuery(query, file, callback);
  },

  uploadPhoto(params, callback) {
    const file = [params.thumbnail, params.fileID];

    const query = `
      UPDATE File SET thumbnail = ? WHERE fileID = ?
    `;

    return this.executeQuery(query, file, callback);
  },

  get(params, callback) {
    const user = [params.userID];

    const query = `
      SELECT *
      FROM File
      WHERE userID = ?
    `;

    return this.executeQuery(query, user, callback);
  },

  update(params, callback) {
    const file = [
      params.name,
      params.shared,
      params.fileID,
      params.userID,
    ];
    const query = `
      UPDATE File SET name = ?, shared = ?
      WHERE fileID = ? AND userID = ?
    `;

    return this.executeQuery(query, file, callback);
  },

  delete(params, callback) {
    const file = [params.fileID, params.userID];

    const query = `
      DELETE FROM File
      WHERE fileID = ? AND userID = ?
    `;

    return this.executeQuery(query, file, callback);
  }
};

module.exports = fileModel;
