const request = require('./checkstar');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/checkstar';
const assert = require('assert');

function saveGitRepo(data) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected succesfully to server");

    // github star information
    var collection = db.collection('gitstar');
    var saveData = {
      time: new Date(),
      data: data
    }

    // Insert data
    collection.insert(saveData, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "gitstar" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
  });
}

function fetchData() {
  request('https://api.github.com/search/repositories')
    .query({ q: 'language:javascript' })
    .query({ sort: 'stars' })
    .query({ order: 'desc' })
    .query({ per_page: 100 })
    .end((err, res) => {
      if (err === null) {
        saveGitRepo(res.body);
      } else {
        console.log('err github api: ' + err);
      }
    });
}

module.exports = fetchData;


