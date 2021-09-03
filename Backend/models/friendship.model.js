const mysqlConnection = require('../config/database');

const friendshipModel = {
  executeQuery(query, params, callback) {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
  },

  create(params, callback) {
    const friendship = [params.userID, params.friendID];

    const query = `
      INSERT INTO Friendship(me, friend)
      VALUER (?, ?)
    `;

    return this.executeQuery(query, friendship, callback);
  },

  get(params, callback) {
    const friendship = [params.userID];

    const query = `
      SELECT nickname, email, photo
      FROM User
      INNER JOIN Friendship ON User.userID = Friendship.friend
      WHERE Friendship.me = ?
    `;

    return this.executeQuery(query, friendship, callback);
  },
};

module.exports = friendshipModel;
