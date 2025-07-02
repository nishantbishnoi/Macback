const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb://localhost:27017/Domino', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      console.log('MongoDB Connected');
      _db = client.db(); // default: 'pizzadb'
      callback();
    })
    .catch((err) => {
      console.error('MongoDB Connection Failed:', err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
