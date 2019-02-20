let env = process.env.NODE_ENV || "development";
const url = "mongodb://localhost:27017/TodoApp";
const test_url = "mongodb://localhost:27017/TodoAppTest";
//console.log(env);

if (env === "development") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = url;
} else if (env === "test") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = test_url;
}
