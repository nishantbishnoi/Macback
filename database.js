const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
  'mongodb+srv://nishantbishnoi1200:Bishnoi%401200@cluster0.8mh1gzg.mongodb.net/Domino?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

    .then((client) => {
      console.log('MongoDB Connected 🚀');
      _db = client.db(); // Use specific DB name if needed
      callback();
    })
    .catch((err) => {
      console.error('MongoDB Connection Failed ❌:', err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
