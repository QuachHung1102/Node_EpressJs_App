const express = require("express");
const { adminRouter } = require("./admin");
const { homeRouter } = require("./home");
const { shopRouter } = require("./shop");

const rootRouter = express.Router();

// rootRouter.use("/home", homeRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/shop", shopRouter);

module.exports = { rootRouter };
