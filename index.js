const customExpress = require('./config/customExpress')
const conexao = require('./infra/database/conexao')
const Tabelas = require('./infra/database/tabelas')
conexao.connect((erro) => {

    if(erro){
        console.log(erro)
    }else{
        console.log('conectado ao mySql')
        Tabelas.init(conexao)
        
        const app = customExpress()

        app.listen(3000, () => {
            console.log('server rodando na porta 3000')
        })
    }

})


