const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json') // запись в переменную notesPath пути до нужного файла

async function addNote(title) {
    const notes = await getNotes()

    const note = { // добавление заметки
        title,
        id: Date.now().toString()
    }
        notes.push(note)

        await fs.writeFile(notesPath, JSON.stringify(notes)) // чтение данных из файла в конвертированном строковом формате
    console.log(chalk.green('Note was added'))
}

 async function getNotes() { // получение записей из файла db.json
     const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
     return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [] // проверка
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgRed('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.bgBlue( note.id, note.title))
    })
}

async function removeNote(id) {
    const notesArr = await getNotes()
    const notes = notesArr.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.red(`Was removed note with id: ${id}`))
}

module.exports = {
    addNote, printNotes,removeNote
}