require("dotenv").config();
import express from "express";
import uuid from "uuid/v4";
import session from "express-session";
import sessionFileStore from "session-file-store";
import bodyParser from "body-parser";
const FileStore = sessionFileStore(session);

const app = express();
const port = process.env.PORT || 8081;

//Add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    genid: req => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: process.env.SESSION || "keyboardcat",
    resave: false,
    saveUninitialized: true,
  })
);

// create the homepage route at '/'
app.get("/", (req, res) => {
  console.log("Inside the homepage callback function");
  console.log(req.sessionID);
  res.send(`You got home page!\n`);
});

// create the login get and post routes
app.get("/login", (req, res) => {
  console.log("Inside GET /login callback function");
  console.log(req.sessionID);
  res.send(`You got the login page!\n`);
});

app.post("/login", (req, res) => {
  console.log("Inside POST /login callback function");
  console.log(req.body);
  res.send(`You posted to the login page!\n`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
