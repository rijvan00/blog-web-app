const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;

// express app
const app = express();

//connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

//Register View Engine
app.set("view engine", "ejs");

//Middleware & Static
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//Blog routes
app.use("/blogs", require("./routes/blogRoutes"));

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

//listen for requests
//app.listen(3000);
