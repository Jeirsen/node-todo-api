const { MongoClient, ObjectID } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log("Unable to connect with mongo db.");
  }
  console.log("Connected successfully to mongo db.");
  const db = client.db(dbName);

  db.collection("Todos")
    .findOneAndUpdate(
      { _id: new ObjectID("5c66ff4816678533420472e2") },
      { $set: { completed: true } },
      { returnOriginal: false }
    )
    .then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  client.close();
});
