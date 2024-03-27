// const Product = require("../models/product");

// const getAddProduct = async (req, res) => {
//   // res.sendFile(path.join(__dirname, "../views", "add-product.html"));
//   // res.sendFile(path.join(rootDir1, "views", "add-product.html"));
//   // __dirname là một biến toàn cục mà nó đơn thuần giữ đường dẫn tuyệt đối ở hệ điều hành

//   res.render("./admin/add-product", {
//     pageTitle: "Add Product",
//     path: "/admin/add-product",
//     activeClass: "add-product",
//     activeFormCss: true,
//     activeProductsCss: true,
//   });
//   /* Ở đây chúng ta không cần đường dẫn và không cần định dạng file vì ở server.js || app.js chúng ta đã cài đặt pug là công cụ tạo mẫu mặc định. Và đường dẫn đã trỏ thẳng vào thư mục views */
// };

// const getListProduct = async (req, res) => {
//   Product.fetchAll((productList) => {
//     res.status(200).render("./admin/product-list", {
//       prods: productList,
//       pageTitle: "Admin Products",
//       hasProducts: productList.length > 0,
//       path: "/admin/product-list",
//       activeClass: "product-list",
//       activeProductsCss: true,
//     });
//   });
// };

// const postAddProduct = async (req, res) => {
//   const { productName, imageUrl, price, description } = req.body;
//   const product = new Product(null, productName, imageUrl, price, description);
//   product.save();
//   // productList = [...productList, product]; // bạn đang tạo ra một mảng mới (một tham chiếu mới) và gán nó lại vào productList.
//   res.status(302).redirect("../shop/products");
// };

// const getUpdateProduct = async (req, res) => {
//   const updateMode = req.query.updateMode;
//   const id = req.params.id;
//   Product.findById(id, (product) => {
//     if (product) {
//       res.status(200).render("admin/update-product", {
//         pageTitle: "Update Product",
//         path: "/admin/update-product",
//         activeClass: "update-product",
//         activeProductsCss: true,
//         activeFormCss: true,
//         updating: updateMode,
//         product,
//       });
//     } else {
//       res.status(404).send(
//         `
//         <html>
//           <head>
//             <title>Load trang Admin</title>
//           </head>
//           <body>
//             <h1>Admin!</h1>
//           </body>
// 			  </html>
//         `
//       );
//     }
//   });
// };

// const updateProduct = async (req, res) => {
//   const id = req.params.id;
//   const { productName, imageUrl, price, description } = req.body;
//   const updateProduct = new Product(
//     id,
//     productName,
//     imageUrl,
//     price,
//     description
//   );
//   updateProduct.save();
//   // productList = [...productList, product]; // bạn đang tạo ra một mảng mới (một tham chiếu mới) và gán nó lại vào productList.
//   res.status(302).redirect("/api/v1/admin/product-list");
// };

// const postDeleteProduct = async (req, res) => {
//   const productId = req.body.productId;
//   Product.deleteById(productId, () => {
//     res.status(204).redirect("/api/v1/admin/product-list");
//   });
// };

// module.exports = {
//   getAddProduct,
//   postAddProduct,
//   getListProduct,
//   getUpdateProduct,
//   updateProduct,
//   postDeleteProduct,
// };

const Product = require("../models/product");

const getAddProduct = async (req, res) => {
  // res.sendFile(path.join(__dirname, "../views", "add-product.html"));
  // res.sendFile(path.join(rootDir1, "views", "add-product.html"));
  // __dirname là một biến toàn cục mà nó đơn thuần giữ đường dẫn tuyệt đối ở hệ điều hành

  res.render("./admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeClass: "add-product",
    activeFormCss: true,
    activeProductsCss: true,
  });
  /* Ở đây chúng ta không cần đường dẫn và không cần định dạng file vì ở server.js || app.js chúng ta đã cài đặt pug là công cụ tạo mẫu mặc định. Và đường dẫn đã trỏ thẳng vào thư mục views */
};

const getListProduct = async (req, res) => {
  Product.fetchAll((productList) => {
    res.status(200).render("./admin/product-list", {
      prods: productList,
      pageTitle: "Admin Products",
      hasProducts: productList.length > 0,
      path: "/admin/product-list",
      activeClass: "product-list",
      activeProductsCss: true,
    });
  });
};

const postAddProduct = async (req, res) => {
  const { productName, imageUrl, price, description } = req.body;
  const product = new Product(null, productName, price, description, imageUrl);
  product
    .save()
    .then(() => {
      res.status(302).redirect("../shop/products");
    })
    .catch((err) => console.log(err));
  // productList = [...productList, product]; // bạn đang tạo ra một mảng mới (một tham chiếu mới) và gán nó lại vào productList.
};

const getUpdateProduct = async (req, res) => {
  const updateMode = req.query.updateMode;
  const id = req.params.id;
  Product.findById(id, (product) => {
    if (product) {
      res.status(200).render("admin/update-product", {
        pageTitle: "Update Product",
        path: "/admin/update-product",
        activeClass: "update-product",
        activeProductsCss: true,
        activeFormCss: true,
        updating: updateMode,
        product,
      });
    } else {
      res.status(404).send(
        `
        <html>
          <head>
            <title>Load trang Admin</title>
          </head>
          <body>
            <h1>Admin!</h1>
          </body>
			  </html>
        `
      );
    }
  });
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { productName, imageUrl, price, description } = req.body;
  const updateProduct = new Product(
    id,
    productName,
    imageUrl,
    price,
    description
  );
  updateProduct.save();
  // productList = [...productList, product]; // bạn đang tạo ra một mảng mới (một tham chiếu mới) và gán nó lại vào productList.
  res.status(302).redirect("/api/v1/admin/product-list");
};

const postDeleteProduct = async (req, res) => {
  const productId = req.body.productId;
  Product.deleteById(productId, () => {
    res.status(204).redirect("/api/v1/admin/product-list");
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getListProduct,
  getUpdateProduct,
  updateProduct,
  postDeleteProduct,
};
