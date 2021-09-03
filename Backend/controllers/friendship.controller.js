const friendshipModel = require('../models/friendship.model');

const friendshipController = {
  create: (req, res) => {
    friendshipModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send({
          code: 500,
          data: err
        });
        return;
      }

      res.status(200).send({
        code: 200,
        data: results
      });
    });
  },

  get: (req, res) => {
    friendshipModel.get(req.query, (err, results) => {
      if (err) {
        res.status(500).send({
          code: 500,
          data: err
        });
        return;
      }

      res.status(200).send({
        code: 200,
        data: results
      });
    });
  },
};

module.exports = friendshipController;
