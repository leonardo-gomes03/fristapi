const router = require("express").Router();
const { response } = require("express");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    const pathBooks = "books.json";
    const books = JSON.parse(fs.readFileSync(pathBooks));
    const pathAuthors = "authors.json";
    const authors = JSON.parse(fs.readFileSync(pathAuthors));

    const bookAuthors = books.map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return {
        'Nome do Livro': book.title,
        'Autor do Livro': author.name,
      };
    });
    res.status(201).json(bookAuthors);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = router;
