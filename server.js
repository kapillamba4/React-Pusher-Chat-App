// host this file on glitch

const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
  instanceLocator: process.env.instanceLocator,
  key: process.env.key
});

const express = require("express");
const app = express();
const Pusher = require("pusher");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", (req, res) => {
  chatkit
    .getUsers()
    .then(res => {
      res.json(res);
    })
    .catch(err => {
      res.send(err);
    });
});

app.get("/rooms/joinable", (req, res) => {
  chatkit
    .getUserJoinableRooms({
      userId: req.body.id || "kapil4"
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/create/user", (req, res) => {
  chatkit
    .createUser({
      id: req.body.id,
      name: req.body.name
    })
    .then(() => {
      res.send("User created successfully");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/delete/user", (req, res) => {
  chatkit
    .deleteUser({ userId: req.body.id })
    .then(() => {
      console.log("User deleted successfully");
      res.send("User deleted successfully");
    })
    .catch(err => {
      res.send(err);
    });
});

app.post("/create/room", (req, res) => {
  chatkit
    .createRoom({
      creatorId: req.body.id,
      name: req.body.name
    })
    .then(() => {
      res.send("Room created successfully");
    })
    .catch(err => {
      res.send(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`app listening on port ${port}!`);
});
