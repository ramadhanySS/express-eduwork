const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("konesi ke mongo berhasil");
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db("eduwork-native");

module.exports = db;
