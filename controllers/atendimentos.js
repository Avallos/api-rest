const Atendimento = require('../models/atendimento')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
        .then(results => {res.json(results)})
        .catch((err) => {res.status(500).json(err)})
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.getById(id)
            .then((results) => {res.json(results)})
            .catch((err) => res.status(400).json(err))
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then((atendimentoCadastrado) => {
                res.status(201).json(atendimentoCadastrado)
            })
            .catch((erros) => {
                res.status(400).json(erros)
            })
        
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Atendimento.update(id, values)
            .then((results) => {
                res.status(200).json(results)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.delete(id)
            .then(() => {
                res.status(200).json({id})
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    })

}