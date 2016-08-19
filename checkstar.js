const request = require('superagent');

const TOKEN = 'c4e93bfc708ee671ceb8ffaa90b6348f2c183239';
const TOKEN_PARAM = 'access_token';

function getAuthedRequest(url) {
  return request(url).query({ access_token: TOKEN });
}

module.exports = getAuthedRequest;



