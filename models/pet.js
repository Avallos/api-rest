const conexao = require('../infra/database/conexao')
const uploadDeArquivos = require('../infra/arquivos/uploadDeArquivos')
class Pet {

    addPet(pet, res){
        const sql = 'INSERT INTO pets SET ?'
        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {

            if(erro){
                
                res.status(400).json({erro})

            }else {
                const novoPet = {
                    nome: pet.nome,
                    imagem: novoCaminho
                }
                conexao.query(sql, novoPet, (err) => {
                    if(err){
                        res.status(400).json(err)
                    }else {
                        res.status(200).json(novoPet)
                    }
                })
            }
            

        })
        
        
    }
}

module.exports = new Pet