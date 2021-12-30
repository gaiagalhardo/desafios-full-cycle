const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000

const faker = require('faker')
const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'peoplesdb'
}

const connection = mysql.createConnection(config)


async function insertPeople(name) {
    const insert = `INSERT INTO people (nome) VALUES ('${name}')`
    await connection.query(insert)
}

app.get('/', async (req, res) => {

    const name = faker.name.findName()
    insertPeople(name)

    await connection.query(`SELECT nome FROM people`, (error, results, fields) => {
        res.send(`
        <h1>Full Cycle Rocks!</h1>
          <ol>
            ${  results.map(r => `<li>${r.nome}</li>`).join('') }
          </ol>
        `)
    })
})

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`)
})