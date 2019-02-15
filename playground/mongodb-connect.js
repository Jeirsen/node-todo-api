const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log("Unable to connect with mongo db.");
  }
  console.log("Connected successfully to mongo db.");
  const db = client.db(dbName);
  //   db.collection("Todos").insertOne(
  //     {
  //       text: "Task One",
  //       completed: false
  //     },
  //     (err, result) => {
  //       if (err) {
  //         return console.log("Unable to insert Todo", err);
  //       }
  //       console.log(JSON.stringify(result.ops, undefined, 2));
  //     }
  //   );

  db.collection("Users").insertOne(
    {
      name: "Jeirsen",
      age: 31,
      location: "Medellin"
    },
    (err, result) => {
      if (err) {
        return console.log("Unable to insert User", err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );

  client.close();
});
