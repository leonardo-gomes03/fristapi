const router = require('express').Router();

const { Router } = require('express');
const Person = require('../models/Person')

//create
router.post('/', async (req, res) => {

    const {name, id} = req.body;

    if(!name) {
        res.status(422).json({error: 'O nome é Obrigatorio'})
        return
    }

    const person = {
        name,
        id,
    }
    try{

        await Person.create(person);
        res.status(201).json({message: 'Livro Inserido'})

    }catch(error){
        res.status(500).json({error: error})
    }
})
//read

router.get('/', async (req,res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({erro: error})
    }
})

router.get('/:id', async(req,res) => {
    const id = req.params.id
    try {
        const person = await Person.findOne({_id : id})

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: erro})
    }
})


router.patch('/:id', async (req,res) => {
    const idd = req.params.id
    const {name, id} = req.body;
    const person = {
        name,
        id,
    }
    try {
        const updatePerson = await Person.updateOne({_id: id}, person)
        res.status(200).json(person)
    } catch(erro){
        res.status(500).json({error: error})
    }
})

module.exports = router