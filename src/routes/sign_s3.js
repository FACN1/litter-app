const Aws = require('aws-sdk');

module.exports = {
  method: 'GET',
  path: '/sign-s3',
  handler: (req, reply) => {
    // set up new s3 with parameters (this automatically loads in env vars)
    const s3 = new Aws.S3({
      signatureVersion: 'v4',
      region: 'eu-west-2'
    });
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];

    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    // get signed url from s3 and return it to the front end
    s3.getSignedUrl('putObject', s3Params, (err, signedUrl) => {
      if (err) return reply(err);

      const returnData = {
        signedRequest: signedUrl,
        url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };

      return reply(JSON.stringify(returnData));
    });
  }
};
