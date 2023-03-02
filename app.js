const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.listen(3000);

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
