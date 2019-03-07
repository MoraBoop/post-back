const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'almacen';

// Use connect method to connect to the Server
MongoClient.connect(url, (err, client)=> {
    assert.equal(null, err);
    console.log("Connected successfully to server");      
    client.close();
});

/*methods*/
router.get('/articles', (req, res)=>{
    MongoClient.connect(url, (err, client)=> {
        assert.equal(null, err);
        let db = client.db(dbName);   
        findDocuments(db, (records)=> {
            res.send(records);
            client.close();
        });    
    });    
});

router.post('/articles', (req, res)=>{
    let myJSON = req.body;
    MongoClient.connect(url,{ useNewUrlParser: true }, (err, client)=> {
        assert.equal(null, err);
        const db = client.db(dbName);   
        insertDocuments(db, myJSON, (r)=>{
            res.send('Datos registrados');
            client.close();
        });
    });    
});

//request db
const findDocuments = (db, callback)=> {
    let collection = db.collection('articulos');    
    collection.find({}).project({ '_id': 0 }).toArray((err, docs)=> {
        assert.equal(err, null);
        callback(docs);
    });
};
const insertDocuments = (db, data, callback)=>{
    let collection = db.collection('articulos');
    collection.insertOne(data, (err, r)=>{
        assert.equal(err, null);
        callback(r);
    });
};



module.exports = router;