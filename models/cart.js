const fs = require("fs");
const path = require("path");

const { rootDir1, rootDir2 } = require("../utilities/path");

const pathP = path.join(rootDir1, "data", "cart.json");

const Cart = class {
  /*
  Vấn đề ở đây là cart không phải là một đối tượng được tạo lại liên tục.
  Sẽ không có giỏ hàng mới mỗi khi thêm sản phẩm vào giỏ mà thay vào đó sẽ luôn có một giỏ hàng cố định
  Và sẽ chỉ quản lý các sản phẩm trong đó.
  Vì thế ta không thêm hàm tạo đơn thuần mà sử dụng một phương thức static(tĩnh) addProduct.
   */

  static getCart(cb) {
    fs.readFile(pathP, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(pathP, (err, fileContent) => {
      let cart = { productList: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      console.log(cart);
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.productList.findIndex(
        (product) => product.id === id
      );
      // Add new product / increase quantity
      let updatedProduct;
      if (existingProductIndex != -1) {
        updatedProduct = cart.productList[existingProductIndex];
        updatedProduct.quantity = updatedProduct.quantity + 1;
        // cart.productList = [...cart.productList];
        cart.productList[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        updatedProduct.quantity = 1;
        cart.productList = [...cart.productList, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(pathP, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated Cart!`);
        }
      });
    });
  }

  // Delete product from cart
  static deleteProduct = (productId, productPrice) => {
    fs.readFile(pathP, (err, fileContent) => {
      if (err) {
        console.log(err);
      } else {
        const updatedCart = { ...JSON.parse(fileContent) };
        const product = updatedCart.productList.find(
          (product) => product.id === productId
        );
        if (!product) {
          return;
        } else {
          const productQty = product.quantity;
          updatedCart.productList = updatedCart.productList.filter(
            (product) => product.id !== productId
          );
          updatedCart.totalPrice =
            updatedCart.totalPrice - productPrice * productQty;
          fs.writeFile(pathP, JSON.stringify(updatedCart), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Delete product form cart successfully!`);
            }
          });
        }
      }
    });
  };
};

module.exports = Cart;
