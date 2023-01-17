const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let dupe = repo => {
  let all = [];

}

let save = (repoArray, cb) => {
  for (let i = 0; i < repoArray.length; i++) {
    let curr = repoArray[i];

    let repo = new Repo({
      name: curr.name,
      url: curr.svn_url,
      forks: curr.forks
    });
    Repo.findOne({ 'url':curr.svn_url }, (err, result) => {
      // console.log('DUPE TEST', result);
      if (result) {
        console.log('DUPE');
      } else {
        repo.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Saved!');
          }
        });
      }
    })
  }
}

let read = (callback) => {
  Repo.find((err, repos) => {
    console.log('READING', repos);
    if (err) {
      callback(err, null);
    } else {
      callback(null, repos);
    }
  })
}

module.exports.save = save;
module.exports.read = read;