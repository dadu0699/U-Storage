const S3 = require('aws-sdk/clients/s3');

const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const client = new S3({
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});


async function itemUpload(nickname, item) {
  const buffer = Buffer.from(item.base64, 'base64');
  const key = `${nickname}/${item.type}/${uuidv4()}.${item.mimetype}`;

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: buffer,
    ACL: 'public-read',
  };

  // console.log(`Successfully created ${key} and uploaded it to ${params.Bucket}/${key}`);
  return await client.upload(params).promise();
}

module.exports = { itemUpload };
