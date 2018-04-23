var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'expressTwitterMongo';
var text = "";

/* GET users listing. */
router.get('/', function(req, res, next) {

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
  //   const contacts = db.collection('contacts');
  //   console.log(contacts.find());

  const findDocuments = function(db, callback) {
      // Get the documents collection
      const collection = db.collection('users');
      // Find some documents
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        //console.log(docs)
        callback(docs);
      });
    }
    findDocuments(db, function(docs) {
      console.log(docs.map((i)=>{
        text += "name: " + i.name + '\n'
        + "email: " + i.email + '\n'
        + "twitter account: " + i.twitterAccount + '\n' + '\n';
      }));
      if(text != ''){
        res.render('users', { text: text});
      }else{
        res.render('users', { text: "There are no another users yet."});
      }
      text = '';
      client.close();
    });
    client.close();
  });
});

module.exports = router;
