// Init
const mongoose = require('mongoose');
const express = require('express')
const app = express()

//
// lendo json
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json()  )
// metodos
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


// endpoint
app.get('/', (req, res) => {

    res .json({message: 'Oi Express'})
})

// entregar portac
const USER_DB = 'leonardo-gomes03';
const PASSWORD_DB = encodeURIComponent('drika2003');

mongoose
.connect(
    `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.dzbwvzc.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    console.log("oi")
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
})