const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'almacen';

/*methods*/
router.get('/list-articles', (req, res)=>{
    MongoClient.connect(url, (err, client)=> {
        assert.equal(null, err);
        const db = client.db(dbName);   
        findDocuments(db, (records)=> {
            res.send(records);
            client.close();
        });    
    });    
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('articulos');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

module.exports = router;