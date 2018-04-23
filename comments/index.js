const { MongoClient } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
//   const contacts = db.collection('contacts');
//   console.log(contacts.find());

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('contacts');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }
  findDocuments(db, function(docs) {
    console.log(docs.map((i)=>i.name));
    client.close();
  });

  client.close();
});

//client.close();
