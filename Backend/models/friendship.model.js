const mysqlConnection = require('../config/database');

const friendshipModel = {
  executeQuery(query, params, callback) {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
  },

  create(params, callback) {
    const friendship = [params.userID, params.friendID];

    const query = `
      INSERT INTO Friendship(me, friend)
      VALUES (?, ?)
    `;

    return this.executeQuery(query, friendship, callback);
  },

  suggestions(params, callback) {
    const friendship = [params.userID, params.userID];

    const query = `
        SELECT User.userID, nickname, email,
        photo, IFNULL(COUNT(File.userID), 0) AS files
      FROM User
      LEFT JOIN File ON (File.shared = True AND User.userID = File.userID)
      WHERE User.userID != ?
        AND User.userID NOT IN (
          SELECT friend FROM Friendship
          WHERE me = ?
        )
      GROUP BY User.userID;
    `;

    return this.executeQuery(query, friendship, callback);
  },

  files(params, callback) {
    const user = [params.userID];

    const query = `
      SELECT File.*, User.nickname
      FROM File
      INNER JOIN Friendship ON File.userID = Friendship.friend
      INNER JOIN User ON User.userID = Friendship.friend
      WHERE shared = True AND Friendship.me = ?
    `;

    return this.executeQuery(query, user, callback);
  }

};

module.exports = friendshipModel;
