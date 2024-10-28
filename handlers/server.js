const express = require('express');
const cors = require('cors'); // Importa o módulo cors

const app = express();

app.use(cors()); // Ativa o CORS para todas as rotas

// Middleware para permitir que o express entenda requisições com JSON no corpo
app.use(express.json()); 


// Rota inicial
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Array de clientes
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

// Endpoint para atualizar um cliente existente (PUT)


app.put('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const { nome, email, idade } = req.body;
  const clienteIndex = clientes.findIndex(c => c.id === clienteId);
  if (clienteIndex !== -1) {
      clientes[clienteIndex] = { id: clienteId, nome, email, idade };
      res.status(200).json(clientes[clienteIndex]);
  } else {
      res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
});

// End point para deletar um cliente (DELETE)

app.delete('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex(c => c.id === clienteId);
  if (clienteIndex !== -1) {
    const clienteRemovido = clientes.splice(clienteIndex, 1);
    res.status(200).json({ mensagem: 'Cliente removido com sucesso', cliente: clienteRemovido[0] });
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
});







app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});
// listen inicia um servidor, e colocamos ele para escutar a porta 3000.


