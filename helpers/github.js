const axios = require('axios');
const config = require('../config.js');
const db = require('../database');

let getReposByUsername = (user, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios({
    url: options.url,
    headers: options.headers
  })
    .then(res => {
      db.save(res.data);
    })
    .then(() => {
      cb(null);
    })
    .catch(err => {
      cb(err);
    })

}

module.exports.getReposByUsername = getReposByUsername