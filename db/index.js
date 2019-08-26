const MongoClient = require('mongodb').MongoClient;
const url = 'MONGO_URL';
let db;
module.exports.connect =  function(callback){
  //  Connection already exists, return the same.
  if(db)
    return callback(null, db);
  //  Else create a new connection
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, async function(err, client){
    if(err)
      throw err;
    db = client.db();
    cacheCollections(db);  
    callback(null, db);
  });
}

module.exports.initCollections = async function(collections) {
  const createCollectionQuery = collections.map((c) => db.createCollection(c));
  await Promise.all(createCollectionQuery);
}


const cacheCollections = function(db){
  db.collections(function(err, collections){
    if(err)
      throw new err;

    collections.forEach((c) => {
      var table = c.collectionName;
      module.exports.collections[table] = c;
    });
  });
}


module.exports.collections = {}

