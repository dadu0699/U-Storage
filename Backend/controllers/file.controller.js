const s3 = require('../config/s3');
const { delay } = require('../utils/shared');
const fileModel = require('../models/file.model');
const userModel = require('../models/user.model');


async function create(req, res) {
  const status = await verifyUser(req, res);
  if (status['code'] === 404) return;

  try {
    const { key } = await s3.itemUpload(req.body['nickname'], req.body['file']);
    req.body['file']['thumbnail'] = key;

    fileModel.create(req.body['file'], async (err, results) => {
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

  } catch (error) {
    res.status(500).send({
      code: 500,
      data: error
    });
  }
}

function get(req, res) {
  if (!req.query['userID']) {
    res.status(400).send({
      code: 400,
      data: 'Unspecified parameters'
    });
    return;
  }

  fileModel.get(req.query, (err, results) => {
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

async function update(req, res) {
  const status = await verifyUser(req, res);
  if (status['code'] === 404) return;

  req.body['userID'] = status['data']['userID'];
  fileModel.update(req.body, (err, results) => {
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

async function remove(req, res) {
  if (!req.query['fileID']) {
    res.status(400).send({
      code: 400,
      data: 'Unspecified parameters'
    });
    return;
  }

  const status = await verifyUser(req, res);
  if (status['code'] === 404) return;

  const data = {
    fileID: req.query['fileID'],
    userID: status['data']['userID']
  };

  fileModel.delete(data, (err, results) => {
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

async function verifyUser(req, res) {
  const response = {};

  userModel.signIn(req.body, (_err, results) => {
    if (results.length === 1) {
      response['code'] = 200;
      response['data'] = results[0];
    } else {
      res.status(404).send({
        code: 404,
        data: 'The password confirmation does not match'
      });
      response['code'] = 404;
    }
  });

  await delay(500);
  return response;
}

module.exports = {
  create,
  get,
  update,
  remove,
};
