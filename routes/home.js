const path = require("path");

const express = require("express");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  
});

module.exports = { homeRouter };
