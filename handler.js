
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.redirect = async (event, context, callback) => {
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
  try {
    // do something special for yours truly - serve home site
    if (id === 'patrickbrandt') {
      callback(null, contentResponse(await getFileContent('index.html'), 'text/html')); 
    } else if (id === 'robots.txt') {
      callback(null, contentResponse(await getFileContent(id), 'text/plain'));
    } else {
      const url = await getUrl(id);
      if(url) {
        return callback(null, redirectResponse(url));
      }
      callback(null, noRedirect);    
    }
  } catch(err) {
    console.log(err);
    callback(null, errorResponse());
  }  
};

function contentResponse(content, contentType) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': contentType,
    },
    body: content,
  };
}

async function getFileContent(fileName) {
  const params = {
    Bucket: process.env.wpbis_bucket,
    Key: fileName,
  };
  const data = await s3.getObject(params).promise();
  return data.Body.toString();
}

function getUrl(id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.urls_table,
      Key: { Id: id },
    };
    docClient.get(params, (err, data) => {
      if (err) return reject(err);
      const url = data.Item ? data.Item.Url : undefined;
      resolve(url);
    });
  });
}

function errorResponse() {
  return  {
    statusCode: 500,
    body: 'something bad happened',
  };
}

function redirectResponse(url) {
  return {
    statusCode: 301,
    headers: { Location: url, ...noCacheHeaders()},
  };
}

function noCacheHeaders() {
  return {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  };
}
