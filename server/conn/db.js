// MongoClient
const { MongoClient } = require("mongodb");
// Mongo DB Atlas URL
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db);
var _db;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
	  console.log("Connected successfully to server");
      _db = client.db("kms");
    } catch (err) {
      return callback(err);
    }
  },
  getDb: function () {
    return _db;
  }
};
