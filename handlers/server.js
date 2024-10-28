const express = require('express');
const cors = require('cors'); // Importa o módulo cors

const app = express();

app.use(cors()); // Ativa o CORS para todas as rotas


//aqui declaramos uma variável que contem o módulo express, 
// que estamos pegando na pasta node_modules


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/produtos', function (req, res) {
    res.send('Hello World produtos!');
});

// Faz a leitura de um arquivo json chamado dados.json
// o arquivo esta uma pastan acima, por isso usamos ../
// dentro da pasta database com o nome dados.json

// const fs = require('fs');
// const dados = fs.readFileSync('../database/dados.json', 'utf8');


let clientes = [
    { id: 1, nome: 'João Silva', email: 'joao@example.com', idade: 30 },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@example.com', idade: 25 },
    { id: 3, nome: 'Pedro Souza', email: 'pedro@example.com', idade: 40 },
  ];


// Endpoint para buscar cliente por ID (GET)
app.get('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === clienteId);

  if (cliente) {
    res.status(200).json(cliente);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
});


// Middleware para permitir que o express entenda requisições com JSON no corpo
app.use(express.json());

// Endpoint para criar um novo cliente (POST)
app.post('/clientes', (req, res) => {
    const { nome, email, idade } = req.body;
  
    // Validação simples para verificar se os dados necessários foram enviados
    if (!nome || !email || !idade) {
        return res.status(400).json({ mensagem: 'Por favor, forneça nome, email e idade do cliente.' });
      }
    
      // Gerar um novo ID único (incrementando o ID baseado no último cliente)
      const novoClienteId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    
      // Criar o novo cliente
      const novoCliente = {
        id: novoClienteId,
        nome,
        email,
        idade
      };
    
      // Adicionar o novo cliente à lista
      clientes.push(novoCliente);
    
      // Retornar o novo cliente criado
      res.status(201).json(novoCliente);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
// listen inicia um servidor, e colocamos ele para escutar a porta 3000.
// Ele responde com "Hello World!"