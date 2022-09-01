
const express = require ('express')
const app = express()
//const port = 3000

app.use(express.json()) //recomendado
app.use(express.urlencoded({ extended: true })) //recomendado

//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})

const listaProdutos = [
    {
        id: 1,
        nome: "PS4",
        preco: 4000
    },
    {
        id: 2,
        nome: "XBOX",
        preco: 2500
    }
]
let idGerador = 3; //próximo id da lista

//incrementar sempre
function geraId(){
    return idGerador ++
}

//Retorna a lista de produtos
app.get('/api/produtos', (req, res) => {
    res.json(listaProdutos)
})

//Retorna um produto da lista (especificado)
app.get('/api/produtos/:id', (req, res) => {
    const id = req.params.id;

    for (const produto of listaProdutos) {
        if(produto.id == id){
            res.json(produto);
        }
    }
    res.status(404).json("Produto nao encontrado")
})
//Cria um novo Produto

app.post('/api/produtos', (req, res) => {

    let produto = req.body

    produto.id = geraId()
    listaProdutos.push(produto);

// res.status(201).json("Produto adicionado com sucesso!") //Opção de resposta
//  res.status(201).json("Produto" + produto.nome + "adicionado com sucesso!") //Opção de resposta
res.status(201).json(`Produto ${produto.nome} adicionado com sucesso!`)
  res.send()
})

app.put('/api/produtos/:id', (req, res) => {
    const id = req.params.id;
    const produtoAtualizado = req.body;

    let produto = listaProdutos.find(
        function (produto) {
            return (produto.id == id);
        }
    );

    if(produto) {
        if (produtoAtualizado.nome)
            produto.nome = produtoAtualizado.nome;
        if (produtoAtualizado.preco)
            produto.preco = produtoAtualizado.preco;
        
        res.json(produto)
    }
    else {
        res.status(404).json("Produto nao encontrado")
    }



/*    let nome = req.body.nome;
    let preco = req.body.preco;

    for (const produto of listaProdutos) {
        if(produto.id == id){
            produto.nome = nome
            produto.preco = preco
    
            res.json(produto).send();            
        }
    }
    */ //Outra opção

  res.send()
})

app.delete('/api/produtos/:id', (req, res) => {
    const id = req.params.id;

    const indRemover = listaProdutos.findIndex(
        (produto) => produto.id == id
    )

    if(indRemover >= 0 ){
        res.json(listaProdutos.splice(indRemover, 1));
    }

    else{
        res.status(404).json("Produto nao encontrado")
    }
})

app.listen(8080, () => {
    console.log("Acessando o servidor...")
}) //node app.js //npm install

