'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const URLS_TABLE = 'Urls';

module.exports.redirect = (event, context, callback) => {
  const pathParams = event.pathParameters;
  const noCache = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0
  };
  const noRedirect = {
    statusCode: 200,
    headers: noCache,
    body: 'nothing to see here!'
  };

  if (!!pathParams && !!pathParams.id) {
    getUrl(pathParams.id)
      .then(url => {
        if(!!url) {
          return callback(null, {
            statusCode: 301,
            headers: {
              'Cache-Control': noCache['Cache-Control'],
              Pragma: noCache.Pragma,
              Expires: noCache.Expires,
              Location: url
            }
          });
        }

        callback(null, noRedirect);
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          statusCode: 500,
          body: 'something bad happened'
        });
      });
  } else {
    callback(null, noRedirect);
  }
};

function getUrl(id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: URLS_TABLE,
      Key: { Id: id }
    };

    docClient.get(params, (err, data) => {
      if (err) return reject(err);
      let url = data.Item ? data.Item.Url : undefined;
      resolve(url);
    });
  });
}

