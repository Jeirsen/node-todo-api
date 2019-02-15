const { MongoClient, ObjectID } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log("Unable to connect with mongo db.");
  }
  console.log("Connected successfully to mongo db.");
  const db = client.db(dbName);

  // delete Many
  // db.collection("Todos")
  //   .deleteMany({ text: "Get lunch" })
  //   .then(result => {
  //     console.log(result);
  //   });

  // delete one
  // db.collection("Todos")
  //   .deleteOne({ text: "Get lunch" })
  //   .then(result => {
  //     console.log(result);
  //   });

  // find one and delete
  db.collection("Todos")
    .findOneAndDelete({ completed: true })
    .then(result => {
      console.log(result);
    });

  client.close();
});
