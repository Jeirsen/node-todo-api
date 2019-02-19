let express = require("express");
let bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

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

app.get("/todos/:id", (req, res) => {
  let id = req.params.id;

  if (ObjectID.isValid(id)) {
    Todo.findById(id).then(
      todo => {
        if (!todo) {
          return res.status(400).send({
            error: `todo with id ${id} not found`
          });
        }
        res.send({
          todo
        });
      },
      err => {
        res.status(400).send({
          error: `Error trying to get todo with id ${id}`
        });
      }
    );
  } else {
    res.status(400).send({
      error: `invalid format for parameter id: ${id} `
    });
  }
});

app.listen(3000, () => {
  console.log("Server up on port 3000");
});

module.exports = { app };
