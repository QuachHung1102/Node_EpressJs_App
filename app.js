const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");
const sequelize = require("./utilities/database");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars"); // express-handlebars
const { rootRouter } = require("./routes/index");
const { rootDir1, rootDir2 } = require("./utilities/path");
const { get404Page } = require("./controllers/error");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", rootRouter);
app.use(get404Page);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
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
