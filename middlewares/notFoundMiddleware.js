const { StatusCodes } = require("http-status-codes");
const express = require("express");
const app = express();

const notFoundMiddleware = app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});

module.exports = notFoundMiddleware;
