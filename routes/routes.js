exports.index = (req, res) => {
  res.render("index");
};

exports.about = (req, res) => {
  res.sendfile("./public/about.html");
};