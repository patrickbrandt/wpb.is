'use strict';

module.exports.redirect = (event, context, callback) => {
  let params = event.pathParameters;
  if (!!params && !!params.id) {
    let id = params.id;
    callback(null, {
      statusCode: 301,
      headers: { //TODO: pull location url from DynamoDB using id
        'Location': 'http://banditbrandit.com/'
      }
    });
  } else {
    callback(null, {
      statusCode: 200,
      body: 'nothing to see here!'
    });
  }
};
