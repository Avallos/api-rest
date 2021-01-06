const mysql = require('mysql')

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
}

const conexao = mysql.createConnection(config)

module.exports = conexao
