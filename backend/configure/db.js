const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error("MongoDB connection string is missing. Check your environment variables.");
}

const client = new MongoClient(uri);

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err) {
        console.error("Error connecting to MongoDB:", err);
        return callback(err);
      }

      // Verify we got a good "db" object
      if (db) {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB.");
      }

      return callback(null);
    });
  },

  getDb: function () {
    if (!_db) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return _db;
  },
};
