// const fs = require("fs");
// const path = require("path");

// const { rootDir1, rootDir2 } = require("../utilities/path");

// const pathP = path.join(rootDir1, "data", "products.json");

// const Cart = require("./cart");

// const getProductFromFile = (cb) => {
//   fs.readFile(pathP, (err, fileContent) => {
//     if (err) {
//       console.log(err);
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, productName, imageUrl, price, description) {
//     this.id = id;
//     this.productName = productName;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//   }
//   save() {
//     getProductFromFile((productList) => {
//       if (this.id) {
//         const existingProductIndex = productList.findIndex(
//           (product) => product.id === this.id
//         );
//         productList[existingProductIndex] = this;
//         fs.writeFile(pathP, JSON.stringify(productList), (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(`Write success: ${this.productName}`);
//           }
//         });
//       } else {
//         this.id = (parseFloat(productList.at(-1).id) + 1).toString();
//         productList.push(this);
//         fs.writeFile(pathP, JSON.stringify(productList), (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(`Write success: ${this.productName}`);
//           }
//         });
//       }
//     });
//   }
//   // delete product
//   static deleteById(id, cb) {
//     getProductFromFile((productList) => {
//       const productIndex = productList.findIndex(
//         (product) => product.id === id
//       );
//       if (productIndex) {
//         const productPrice = productList[productIndex].price;
//         /* Xóa sản phẩm đồng nghĩa với việc các sản phẩm trong các giỏ hàng đều sẽ mất */
//         Cart.deleteProduct(id, productPrice);
//         productList.splice(productIndex, 1);
//         /*
//         Cách 2 ghi đè mảng bằng cách sử dụng 1 mảng mới với filter
//         const updatedProducts = productList.filter(
//           (product) => product.id !== id
//         );
//         Tiếp theo đẩy updatedProducts vào writeFile
//         */
//         fs.writeFile(pathP, JSON.stringify(productList), (err) => {
//           if (err) {
//             console.log(err);
//             cb();
//           } else {
//             console.log(`Write successful!`);
//             cb();
//           }
//         });
//         console.log(`Delete success!`);
//       } else {
//         cb();
//         console.log(`Product not found!`);
//       }
//     });
//   }
//   // getAllProduct
//   static fetchAll(cb) {
//     getProductFromFile(cb);
//   }
//   // return this.productList;
//   // Khóa tĩnh đảm bảo có thể gọi trực tiếp phương thức này trực tiếp trên chính lớp đó chứ không phải trên một đối tượng.
//   // getProductById
//   static findById(id, cb) {
//     getProductFromFile((productList) => {
//       const product = productList.find((element) => element.id === id);
//       cb(product);
//     });
//   }
// };

const db = require("../utilities/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, productName, price, description, imageUrl) {
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    return db.execute(
      "INSERT INTO products (productName, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.productName, this.price, this.description, this.imageUrl]
    );
  }
  // delete product
  static deleteById(id) {}
  // getAllProduct
  static fetchAll() {
    return db.execute("SELECT * FROM products").then().catch();
  }
  // return this.productList;
  // Khóa tĩnh đảm bảo có thể gọi trực tiếp phương thức này trực tiếp trên chính lớp đó chứ không phải trên một đối tượng.

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
