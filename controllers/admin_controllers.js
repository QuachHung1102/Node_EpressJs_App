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
  req.user.getProducts()
    // Product.findAll()
    .then((products) => {
      res.status(200).render("./admin/product-list", {
        prods: products,
        pageTitle: "Admin Products",
        hasProducts: products.length > 0,
        path: "/admin/product-list",
        activeClass: "product-list",
        activeProductsCss: true,
      });
    })
    .catch((err) => console.log(err));
};

const postAddProduct = async (req, res) => {
  const { productName, imageUrl, price, description } = req.body;

  // Cách 2
  req.user
    .createProduct({
      productName,
      price,
      description,
      imageUrl,
    })
    .then((result) => {
      console.log(result);
      res.status(302).redirect("../shop/products");
    })
    .catch((err) => console.log(err));

  // Cách 1
  // Product.create({
  //   productName,
  //   price,
  //   description,
  //   imageUrl,
  //   userId: req.user.id,
  // })
  //   .then((result) => {
  //     console.log(result);
  //     res.status(302).redirect("../shop/products");
  //   })
  //   .catch((err) => console.log(err));
};

const getUpdateProduct = async (req, res) => {
  const updateMode = req.query.updateMode;
  const id = req.params.id;
  req.user
    .getProducts({ whre: { id: id } })
    // Product.findAll({ where: { id: id } })
    .then((products) => {
      if (products.at(0)) {
        res.status(200).render("admin/update-product", {
          pageTitle: `Update ${products.at(0).productName}`,
          path: "/admin/update-product",
          activeClass: "update-product",
          activeProductsCss: true,
          activeFormCss: true,
          updating: updateMode,
          product: products.at(0),
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { productName, imageUrl, price, description } = req.body;
  Product.findByPk(id)
    .then((product) => {
      product.productName = productName;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log(`Updated product: ${result.productName}`);
      res.status(302).redirect("/api/v1/admin/product-list");
    })
    .catch((error) => {
      console.log(error);
    });
};

const postDeleteProduct = async (req, res) => {
  const productId = req.body.productId;
  Product.destroy({ where: { id: productId } }) // findByPK rồi xóa cũng đc đéo sao cả
    .then((result) => {
      console.log(`Deleted!`);
      res.status(204).redirect("/api/v1/admin/product-list");
    })
    .catch((err) => {
      console.log(err);
      res
        .status(204)
        .send(`<script>window.alert("Xóa không thành công")</script>`);
    });

  // Product.findByPk(productId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log(`Xóa thành công`);
  //     res.status(204).redirect("/api/v1/admin/product-list");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(204).send(`Xóa không thành công`);
  //   });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getListProduct,
  getUpdateProduct,
  updateProduct,
  postDeleteProduct,
};
