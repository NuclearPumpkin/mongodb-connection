const Router = require('express').Router();
const collection = require('./db').collections;
Router.get('/get', async function(req, res, next){
  let u =  await collection.users.find().toArray();
  return res.status(200).json({data:
    u});
});
module.exports = Router;