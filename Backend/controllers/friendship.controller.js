const friendshipModel = require('../models/friendship.model');

function create(req, res) {
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
}

function suggestions(req, res) {
  friendshipModel.suggestions(req.query, (err, results) => {
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
}

function files(req, res) {
  friendshipModel.files(req.query, (err, results) => {
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
}

module.exports = { create, suggestions, files };
