const router = require("express").Router();

const { Router } = require("express");
const Book = require("../models/Book");

//Create a object
router.post("/", async (req, res) => {
  const { name, id } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é Obrigatorio" });
    return;
  }

  const book = {
    name,
    id
  };
  try {
    await Book.create(book);
    res.status(201).json({ message: "Livro Inserido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read data

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
// Get by id
router.get("/:id", async (req, res) => {
  const idd = req.params.id;
  try {
    const book = await Book({ id: idd });

    if (!book) {
      res.status(422).json({ message: "Usuario nao encontrado" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: erro });
  }
});

router.patch("/:id", async (req, res) => {
  const idd = req.params.id;
  const { name, id } = req.body;
  const book = {
    name,
    id
  };
  try {
    const updateBook = await Book.updateOne({ id: idd }, book);

    if (updateBook.matchedCount === 0) {
      res.status(422).json({ message: "Livro nao encontrado" });
      return;
    }

    res.status(200).json(book);
  } catch (erro) {
    res.status(500).json({ error: error });
  }
});

// Delete data
router.delete("/:id", async (req, res) => {
  const idd = req.params.id;
  const book = await Book.findOne({ id: idd });

  if (!book) {
    res.status(422).json({ message: "Livro nao encontrado" });
    return;
  }
  try {
    await Book.deleteOne({id:idd});
    res.status(200).json({message: 'Deletado'})
  } catch (erro) {
    res.status(500).json({error:erro}) 
  }
});

module.exports = router;
