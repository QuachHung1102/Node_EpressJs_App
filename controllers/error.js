const get404Page = async (req, res) => {
  res
    .status(404)
    .render("404", {
      pageTitle: "Page Not Found",
      activeClass: "",
    });
};

module.exports = { get404Page };
