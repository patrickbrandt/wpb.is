'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const URLS_TABLE = 'Urls';

module.exports.redirect = (event, context, callback) => {
  const pathParams = event.pathParameters;
  const noRedirect = {
    statusCode: 200,
    headers: noCacheHeaders(),
    body: 'nothing to see here!'
  };

  if (!pathParams || !pathParams.id) {
    return callback(null, redirectResponse('https://wpb.is/PatrickBrandt'));
  }

  const id = pathParams.id.toLowerCase();
  // do something special for yours truly - serve home site
  if (id === 'patrickbrandt') {
    const params = {
      Bucket: process.env.wpbis_bucket,
      Key: 'index.html'
    };
    s3.getObject(params).promise()
      .then(data => {
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': 'text/html',
          },
          body: data.Body.toString(),
        };
        callback(null, response);
      })
      .catch(err => {
        console.log(err);
        callback(null, errorResponse());
      });
  } else {
    getUrl(id)
      .then(url => {
        if(!!url) {
          return callback(null, redirectResponse(url));
        }
        callback(null, noRedirect);
      })
      .catch(err => {
        console.log(err);
        callback(null, errorResponse());
      });
  }
};

function getUrl(id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: URLS_TABLE,
      Key: { Id: id },
    };
    docClient.get(params, (err, data) => {
      if (err) return reject(err);
      let url = data.Item ? data.Item.Url : undefined;
      resolve(url);
    });
  });
}

function errorResponse() {
  return  {
    statusCode: 500,
    body: 'something bad happened',
  }
}

function redirectResponse(url) {
  return {
    statusCode: 301,
    headers: Object.assign({ Location: url }, noCacheHeaders()),
  };
}

function noCacheHeaders() {
  return {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  }
}
