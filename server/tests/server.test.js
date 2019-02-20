const expect = require("expect");
const request = require("supertest");
const { app } = require("../server");
const { Todo } = require("../models/todo");
const { ObjectID } = require("mongodb");

const todos = [
  { _id: new ObjectID(), text: "React.js" },
  { _id: new ObjectID(), text: "Angular" },
  { _id: new ObjectID(), text: "Node.js" }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    let text = "Todo Test";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });

  it("should not create todo with invalid data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(3);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return single todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 for todo not found", done => {
    id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(400)
      .end(done);
  });

  it("should return 404 for ivalid id format", done => {
    let invalirId = "5c6b8669bf92b642ea0223a0111";
    request(app)
      .get(`/todos/${invalirId}`)
      .expect(400)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove single todo", done => {
    let id = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(todos[1]._id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });

  it("should return 404 if todo not found", done => {
    id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(400)
      .end(done);
  });

  it("should return 404 for ivalid id format", done => {
    let invalirId = "5c6b8669bf92b642ea0223a0111";
    request(app)
      .delete(`/todos/${invalirId}`)
      .expect(400)
      .end(done);
  });
});
