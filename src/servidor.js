const porta = 3003

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bancoDeDados = require('./bancoDeDados')

//padrão urlencoded
//o middleware badyParser vai ser disparado em todas requisições, pois não passou uma url
app.use(bodyParser.urlencoded({ extended: true })) //qualquer requisição que faça vai passar por esse corpo middleware
//urlencoded vai transformar em objeto

//função middleware
//mostrar
app.get('/produtos', (req, res, next) => {
    res.send(bancoDeDados.getProdutos()) //send vai converter para JSON
})

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProduto(req.params.id)) //req.params.id vai pegar o id que está passando e mostrar informações sobre ele
})

//enviar
app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) //Vai converter em um JSON pra ir pra web
})

//alterar
app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto) //Vai converter em um JSON pra ir pra web
})

//excluir
app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.excluirProduto(req.params.id)
    res.send(produto) //Vai converter em um JSON pra ir pra web
})

app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`)
})