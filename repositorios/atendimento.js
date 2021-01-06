const query = require('../infra/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?'
        return query(sql, atendimento)
    }

    lista(){
        const sql = 'SELECT * FROM atendimentos'
        return query(sql)
    }

    getById(id){
        const sql = 'SELECT * FROM atendimentos WHERE id = ?'
        return query(sql, id)
    }

    update(values, id){
        const sql = 'UPDATE atendimentos SET ? WHERE id =?'
        return query(sql, [values, id])
    }

    delete(id){
        const sql = 'DELETE FROM atendimentos WHERE id = ?'
        return query(sql, id)
    }
}



module.exports = new Atendimento