const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/checkstar';
const assert = require('assert');

function queryMainRepo(cb) {
  MongoClient.connect(dbUrl, function(err, db) {
    assert.equal(null, err);
    console.log("Connected succesfully to server");

    db.collection('gitstar').find().sort({'time': -1}).nextObject(function(err, doc) {
      assert.equal(null, err);
      var items = doc.data.items;
      items.forEach(function(item, index) {
        console.log(`${index + 1}:${item.name} ${item.description} ${item.html_url}`);
      })
      if (cb) {
        cb();
      }
      db.close();
    });
  });
}

module.exports.queryMainRepo = queryMainRepo;
