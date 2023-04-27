import express from "express";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  res.send("Hello from v1");
});

export { v1Router };
