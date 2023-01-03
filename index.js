require("dotenv").config();

const express = require("express");
const path = require("path");
const preloadables = require("./preloadables");
const Twitter = require("twitter");
const app = express();
const port = process.env.port || 5000;
let updates = [];

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

client.get(
  "search/tweets",
  { q: "#miraclenodeytirejesus" },
  (error, tweets) => {
    updates = tweets;
  }
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  client.get(
    "search/tweets",
    { q: "#miraclenodeytirejesus" },
    (error, tweets) => {
      updates = tweets;
      res.render("pages/home", {
        preloadables,
        updates,
        client,
      });
    }
  );
});

app.get("/tweers", (req, res) => {
  res.send(updates);
});

app.get("/:invalid", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  //stylishly log hostname and port
  console.log(
    `\x1b[32m Server listening at\x1b[0m`,
    `\x1b[4mhttp://localhost:${port}\x1b[0m`
  );
});

module.exports = app;
