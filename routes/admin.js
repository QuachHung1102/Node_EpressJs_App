const express = require("express");

const {
  getAddProduct,
  postAddProduct,
  getListProduct,
  getUpdateProduct,
  updateProduct,
	postDeleteProduct,
} = require("../controllers/admin_controllers");
const adminRouter = express.Router();
const { rootDir1, rootDir2 } = require("../utilities/path");

let productList = [];

adminRouter.get("/", (req, res) => {
  res.send(`
			<html>
				<head>
					<title>Load trang Admin</title>
				</head>
				<body>
					<h1>Admin!</h1>
				</body>
			</html>
	`);
});

// /api/v1/admin/add-product => GET
adminRouter.get("/add-product", getAddProduct);
adminRouter.get("/product-list", getListProduct);
adminRouter.get("/update-product/:id", getUpdateProduct);
adminRouter.post("/add-product", postAddProduct);
adminRouter.post("/update-product/:id", updateProduct);
adminRouter.post("/delete-product", postDeleteProduct);

// exports.adminRouter = adminRouter;
// exports.productList = productList;

module.exports = { adminRouter, productList };
