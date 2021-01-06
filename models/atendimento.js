const { default: Axios } = require('axios')
const moment = require('moment')
const conexao = require('../infra/database/conexao')
const repositorio = require('../repositorios/atendimento')


class Atendimento {

    constructor(){
        
        this.dataEhValida = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (cliente) => {
            if(cliente.tamanho >= 5){
                return true
            }else{
                return false
            }
        }

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser igual ou maior que a data atual',
                
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        this.valida = parametros => 
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })
        
        

    }

    adiciona(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros){
            return new Promise((resolve, reject) => {
                reject(erros)
            })
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            
            return repositorio.adiciona(atendimentoDatado)
                .then((results) => {
                    const id = results.insertId
                    return {...atendimento, id}
                })
        }

        
    }

    lista() {
        return repositorio.lista()
    }

    getById(id) {
        return repositorio.getById(id)
            .then(async (results) => {
                let atendimento = results[0]
                const cpf = atendimento.cliente
                const {data} = await Axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                return atendimento
        })
    }

    update(id, values, res){
        

        
            const dataAtual = moment().format('YYYY-MM-DD HH:MM:SS')
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
            let data = values.data
        
        const parametros = {
            data: {data, dataCriacao: dataAtual},
            cliente: {tamanho: values.cliente.length}
        }
        const erros = this.valida(parametros)
        const existemErros = erros.length
        
        if(existemErros){
            return new Promise((resolve, reject) => {
                reject(erros)
            })
        }else{

            return repositorio.update(values, id)
                .then(() => {
                    return {id, ...values}
                })

        }

        
    }

    delete(id){
        return repositorio.delete(id)
        
    }


}

module.exports = new Atendimento