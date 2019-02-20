const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/TodoApp";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI || url, { useNewUrlParser: true });

module.exports = {
  mongoose
};
