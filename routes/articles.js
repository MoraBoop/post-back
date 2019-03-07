const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'almacen';

/*methods*/
router.get('/articles', (req, res)=>{
    MongoClient.connect(url, (err, client)=> {
        assert.equal(null, err);
        const db = client.db(dbName);   
        findDocuments(db, (records)=> {
            res.send(records);
            client.close();
        });    
    });    
});
router.post('/articles', (req, res)=>{
    let objArticle = req.body;
    MongoClient.connect(url, (err, client)=> {
        assert.equal(null, err);
        const db = client.db(dbName);   
        db.collection('articulos').insertOne(objArticle, (err, r)=>{
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            res.send('Datos ingresados correctamente');
            client.close();
        });
    });    
});

//request db
const findDocuments = (db, callback)=> {
    let collection = db.collection('articulos');    
    collection
    .find({})
    .project({ '_id': 0 })
    .toArray((err, docs)=> {
        assert.equal(err, null);
        callback(docs);
    });
};

module.exports = router;