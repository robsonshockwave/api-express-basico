const porta = 3003

const express = require('express')
const app = express()
const bancoDeDados = require('./bancoDeDados')

//função middleware
app.get('/produtos', (req, res, next) => {
    res.send(bancoDeDados.getProdutos()) //send vai converter para JSON
})

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProduto(req.params.id)) //req.params.id vai pegar o id que está passando e mostrar informações sobre ele
})

app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.name,
        preco: req.body.preco
    })
    res.send(produto) //Vai converter em um JSON pra ir pra web
})

app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`)
})