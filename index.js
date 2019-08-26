const express = require('express');
const database = require('./db');
const app = express();
const router = require('./routes');
app.use(router)

database.connect( async function(err, db){
  console.log("connected");
  database.initCollections(['apples']);
  await db.collection('apples').createIndex({name:1},{sparse: true});
  app.listen(9005, console.log('server started at port 9005'));
});

