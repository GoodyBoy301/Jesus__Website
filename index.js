const express = require("express");
const path = require("path");
const preloadables = require("./preloadables");
const app = express();
const port = process.env.port || 3000;

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
  //Stylishly log hostname and port
  console.log(
    `\x1b[32m Server listening at\x1b[0m`,
    `\x1b[4mhttp://localhost:${port}\x1b[0m`
  );
});

module.exports = app;
