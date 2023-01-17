const express = require('express');
const git = require('../helpers/github.js')
const db = require('../database');
let app = express();
app.use(express.json());
app.use(express.static('client/dist'));


// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('recieved post to repos', req.body.user);

  let callback = (err) => {
    console.log('CB EXEC')
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  }

  git.getReposByUsername(req.body.user, (err) => {
    console.log('CB EXEC')
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })

});

app.get('/repos', function (req, res) {
  db.read((err, repos) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(repos);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

