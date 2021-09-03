const userModel = require('../models/user.model');

const userController = {
  signUp: (req, res) => {
    userModel.signUp(req.body, (err, results) => {
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

  signIn: (req, res) => {
    userModel.signIn(req.body, (err, results) => {
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
    userModel.get(req.query, (err, results) => {
      if (err) {
        res.status(500).send({
          code: 500,
          data: err
        });
        return;
      }

      if (req.query.friendID) {
        if (results.length === 1) {
          res.status(200).send({
            code: 200,
            data: results[0]
          });
        } else {
          res.status(500).send({
            code: 404,
            data: 'Not Found'
          });
        }
      } else {
        res.status(200).send({
          code: 200,
          data: results
        });
      }
    });
  },

};

module.exports = userController;
