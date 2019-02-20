const { ObjectID } = require("mongodb");
const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");

Todo.remove({}).then(result => {
  console.log(result);
});

Todo.findOneAndRemove({ _id: "5c6c6f95fd514246be451db4" }).then(todo => {
  console.log(todo);
});

Todo.findByIdAndRemove("5c6c6f95fd514246be451db4").then(todo => {
  console.log(todo);
});
