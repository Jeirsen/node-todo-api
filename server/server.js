require("./config/config");
let express = require("express");
let bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

let { mongoose } = require("./db/mongoose.js");
let { Todo } = require("./models/todo.js");
let { User } = require("./models/user.js");

let app = express();
const port = process.env.PORT || 3000;

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

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      error: `invalid format for parameter id: ${id} `
    });
  }
  Todo.findById(id)
    .then(
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
    )
    .catch(e => {
      res.status(400).send({
        error: `Error trying to get todo with id ${id}`
      });
    });
});

app.delete("/todos/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      error: `invalid format for parameter id: ${id} `
    });
  }

  Todo.findByIdAndRemove(id)
    .then(
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
          error: `Error trying to delete todo with id ${id}`
        });
      }
    )
    .catch(e => {
      res.status(400).send({
        error: `Error trying to delete todo with id ${id}`
      });
    });
});

app.patch("/todos/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      error: `invalid format for parameter id: ${id} `
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(400).send({
          error: `Todo with id: ${id}, not found`
        });
      }
      res.send({
        todo
      });
    })
    .catch(e => {
      res.status(400).send({
        error: `Error trying to update todo with id ${id}`
      });
    });
});

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});

module.exports = { app };
