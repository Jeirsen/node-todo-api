const { MongoClient, ObjectID } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log("Unable to connect with mongo db.");
  }
  console.log("Connected successfully to mongo db.");
  const db = client.db(dbName);
  // db.collection("Todos")
  //   .find({ _id: new ObjectID("5c66f24b05391d356f8d46e9") })
  //   .toArray()
  //   .then(
  //     docs => {
  //       console.log("Todos");
  //       console.log(JSON.stringify(docs, undefined, 2));
  //     },
  //     error => {
  //       console.log("Unable to get todos");
  //     }
  //   );

  db.collection("Todos")
    .find()
    .count()
    .then(
      count => {
        console.log("Todos");
        console.log(`Todos count ${count}`);
      },
      error => {
        console.log("Unable to count todos");
      }
    );

  client.close();
});
