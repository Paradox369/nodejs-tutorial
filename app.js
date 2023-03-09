const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const BlogModel = require("./models/blog");

const app = express();

// connection to db
const dbURI = "mongodb://localhost:27017/node-tuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose sandbox
app.get("/add-blog", (req, res) => {
  const blog = new BlogModel({
    title: "new blog",
    snippet: "about new blog",
    body: "more about new blog",
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
app.get("/all-blog", (req, res) => {
  BlogModel.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// routes
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "paradox finds knowledge",
      snippet: "lorem ipsumm dolor has a fat arse",
    },
    {
      title: "benjamin finds knowledge",
      snippet: "lorem ipsumm dolor has a fat arse",
    },
    {
      title: "ego finds knowledge",
      snippet: "lorem ipsumm dolor has a fat arse",
    },
  ];
  res.render("index", { title: "home", blogs });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "about us" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create a blog" });
});

app.use((req, res) => {
  res.status(400).render("404", { title: "error page" });
});
