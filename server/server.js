let express = require("express");
let bodyParser = require("body-parser");

let { mongoose } = require("./db/mongoose.js");
let { Todo } = require("./models/todo.js");
let { User } = require("./models/user.js");

let app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send({
        error: "Error trying to create the todo"
      });
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({
        todos
      });
    },
    err => {
      res.status(400).send({
        error: "Error trying to get todos"
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server up on port 3000");
});

module.exports = { app };
