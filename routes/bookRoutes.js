const router = require("express").Router();
const fs = require("fs");

//Create a object
router.post("/", async (req, res) => {
  const { id, title, authorId } = req.body;
  const book = {
    id,
    title,
    authorId
  };
  const pathFile = "books.json";
  try {
    const atualBD = JSON.parse(fs.readFileSync(pathFile));
    atualBD.push(book);
    fs.writeFileSync(pathFile, JSON.stringify(atualBD));
    res.status(201).json({ message: "Livro Inserido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Read data

router.get("/", async (req, res) => {
  try {
    const pathFile = "books.json";
    const showDB = JSON.parse(fs.readFileSync(pathFile));
    res.status(200).json(showDB);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const pathFile = "books.json";
    const showDB = JSON.parse(fs.readFileSync(pathFile));
    const id = req.params.id;
    const index = showDB.findIndex(item => item.id == id);
    showDB[index] = { ...showDB[index], ...req.body };
    fs.writeFileSync(pathFile, JSON.stringify(showDB));
    res.status(200).json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
router.delete("/:id", async (req, res) => {
    try {
      const pathFile = "books.json";
      const showDB = JSON.parse(fs.readFileSync(pathFile));
      const id = req.params.id;
      const index = showDB.findIndex(item => item.id == id);
      if (index == -1) {
        throw { message: "Registro não encontrado" };
      }
      showDB.splice(index, 1);
      fs.writeFileSync(pathFile, JSON.stringify(showDB));
      res.status(200).json({ message: "Registro deletado com sucesso" });
    } catch (error) {
      res.status(error.message === "Registro não encontrado" ? 404 : 500).json({ erro: error.message });
    }
  });
  

module.exports = router;
