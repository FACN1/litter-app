const Aws = require('aws-sdk');

module.exports = {
  method: 'GET',
  path: '/sign-s3',
  handler: (req, reply) => {
    // new aws.S3 automatically loads the AWS vars in config.env
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
