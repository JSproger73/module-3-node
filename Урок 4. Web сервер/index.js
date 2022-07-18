const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {addNote, getNotes, removeNote, updateNote} = require('./notes.controller')

const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))// подключение файла со статическим клиентским JS

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', async (req, res) => {
   res.render('index', {
       title: 'Express app',
       notes: await getNotes(),
       created: false
   })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: true

    })
})

app.delete('/:id', async (req, res) => {
    // console.log('id', req.params.id, typeof req.params.id)
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false

    })
})

app.put('/:id', async (req, res) => {
    await updateNote(req.params.id, req.body.title)
    res.render('index', {
        title: 'Express app',
        notes: await getNotes(),
        created: false

    })
})

app.listen(port, () => { // команда отслеживания (прослушивания) порта
    console.log(chalk.green(`Server has been started on port ${port}...`))

})