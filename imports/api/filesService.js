import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: Meteor.settings.private.AWS.AWS_ACCESS_KEY_ID,
  secretAccessKey: Meteor.settings.private.AWS.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export function storeFile(fileName, stream) {
  return new Promise((resolve, reject) => {
    console.log('uploading to aws');
    const params = {
      Bucket: Meteor.settings.public.AWS.AWS_BUCKET,
      Body: stream,
      Key: fileName,
      ACL: 'public-read',
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (data) {
        console.log(data.Location);
        resolve(data.Location);
      }
    });
  })
}
