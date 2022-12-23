require("dotenv").config();

const express = require("express");
const path = require("path");
const preloadables = require("./preloadables");
const app = express();
const port = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home", {
    preloadables,
  });
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

// const Twitter = require("twitter");
// const client = new Twitter({
//   consumer_key: process.env.TWITTER_API_KEY,
//   consumer_secret: process.env.TWITTER_SECRET,
//   bearer_token: process.env.TWITTER_TOKEN,
// });
// client.get(
//   "search/tweets", { q: "Goddid" },
//   (error, tweets, response) => {
//     console.log({ error, tweets, response });
//   }
// );
