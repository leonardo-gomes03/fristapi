const router = require("express").Router();

const { Router } = require("express");
const Person = require("../models/Person");

//Create a object
router.post("/", async (req, res) => {
  const { name, id } = req.body;

  if (!name || !id) {
    res.status(422).json({ error: "É obrigatório ter um nome e id" });
    return;
  }

  const person = {
    name,
    id,
  };
  try {
    await Person.create(person);
    res.status(201).json({ message: "Livro Inserido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read data

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
// Get by id
router.get("/:id", async (req, res) => {
  const idd = req.params.id;
  try {
    const person = await Person.findOne({ id: idd });

    if (!person) {
      res.status(422).json({ message: "Usuario nao encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: erro });
  }
});

router.patch("/:id", async (req, res) => {
  const idd = req.params.id;
  const { name, id } = req.body;
  const person = {
    name,
    id,
  };
  try {
    const updatePerson = await Person.updateOne({ id: idd }, person);

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "Usuario nao encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (erro) {
    res.status(500).json({ error: error });
  }
});

// Delete data
router.delete("/:id", async (req, res) => {
  const idd = req.params.id;
  const person = await Person.findOne({ id: idd });

  if (!person) {
    res.status(422).json({ message: "Usuario nao encontrado" });
    return;
  }
  try {
    await Person.deleteOne({id:idd});
    res.status(200).json({message: 'Deletado'})
  } catch (erro) {
    res.status(500).json({error:erro}) 
  }
});

module.exports = router;
