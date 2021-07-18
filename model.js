const { MongoClient } = require('mongodb');
const config = require('./config/config.json');

const url = config.development.mongo_url;
const client = new MongoClient(url);

// Database Name
const dbName = config.development.dbname;

var _db;
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( url, function( err, client ) {
      _db = client.db(dbName);
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};