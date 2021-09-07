const userModel = require('../models/user.model');
const s3 = require('../config/s3');

function signUp(req, res) {
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send({
      code: 400,
      data: 'The password confirmation does not match'
    });
    return;
  }
  console.log(req.body);
  userModel.signUp(req.body, async (err, results) => {
    if (err) {
      res.status(500).send({
        code: 500,
        data: err
      });
      return;
    }

    try {
      const { key } = await s3.itemUpload(req.body.nickname, req.body.photo);
      uploadPhoto({ userID: results.insertId, thumbnail: key }, res);

    } catch (error) {
      res.status(500).send({
        code: 500,
        data: error
      });
    }
  });
}

function signIn(req, res) {
  userModel.signIn(req.body, (err, results) => {
    if (err) {
      res.status(500).send({
        code: 500,
        data: err
      });
      return;
    }

    if (results.length === 1) {
      res.status(200).send({
        code: 200,
        data: results[0]
      });
    } else {
      res.status(404).send({
        code: 404,
        data: 'Not Found'
      });
    }
  });
}

function get(req, res) {
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
        res.status(404).send({
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
}

function uploadPhoto(req, res) {
  userModel.uploadPhoto(req, (err, results) => {
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

module.exports = { signUp, signIn, get };
