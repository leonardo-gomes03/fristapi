const router = require("express").Router();
const fs = require("fs");


router.get("/", async (req, res) => {
  try {
    const pathBooks = "books.json";
    const books = JSON.parse(fs.readFileSync(pathBooks));
    const pathAuthors = "authors.json";
    const authors = JSON.parse(fs.readFileSync(pathAuthors));
    books.forEach(book => {
        const author = authors.find(author => author.id === book.authorId);
        author.books.push(book);
        });
    res.status(201).json(authors);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

module.exports = router;
