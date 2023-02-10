// Init
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Schema = mongoose.Schema;

//
// lendo json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
// metodos

const bookRoutes = require("./routes/bookRoutes");

app.use("/books", bookRoutes);

const authorRoutes = require("./routes/authorRoutes.js");

app.use("/author", authorRoutes);

const authorsbooksRoutes = require("./routes/authors-books.js");

app.use("/authors-books", authorsbooksRoutes);

const booksauthorsRoutes = require("./routes/books-authors.js");

app.use("/books-authors", booksauthorsRoutes);

// endpoint
app.get("/", (req, res) => {
  res.json({ message: "Oi Express" });
});

// entregar portac
const USER_DB = process.env.USER_DB;
const PASSWORD_DB = encodeURIComponent(process.env.PASSWORD_DB);

mongoose
  .connect(
    `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.dzbwvzc.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
