const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars"); // express-handlebars
const { rootRouter } = require("./routes/index");
const { rootDir1, rootDir2 } = require("./utilities/path");
const { get404Page } = require("./controllers/error");

const sequelize = require("./utilities/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const port = 3000;
const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    partials: {
      head: fs
        .readFileSync(path.join(__dirname, "views", "includes", "head.hbs"))
        .toString(),
    },
  })
);
// app.set("view engine", "hbs");
app.set("view engine", "pug");
// app.set("view engine", "ejs");
app.set("views", "views");

// http://localhost:3000/images/users/use-avatar/gai.jpg
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(rootDir1, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", rootRouter);
app.use(get404Page);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({force: true})
  .sync({ alter: true })
  // .sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        firstName: "Quách",
        lastName: "Hưng",
        age: 25,
        address:
          "Số 10 tổ 18 phường Trần Lãm thành phố Thái Bình tỉnh Thái Bình",
        email: "quachhung389@gmail.com",
      });
    } else {
      return user;
    }
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// const server = http.createServer(app);
// server.listen(3000);

// db.end(); // lệnh này sử dụng để kết thúc
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
