const apiUrl = 'http://localhost:3000';

// Função para cadastrar cliente (POST)
async function cadastrarCliente(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    const response = await fetch(`${apiUrl}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, idade })
    });

    const result = await response.json();
    document.getElementById('resultadoCadastro').textContent = JSON.stringify(result);
}

// Função para consultar cliente (GET)
async function consultarCliente(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    const id = document.getElementById('idConsulta').value; // Pegar o ID do cliente

    const response = await fetch(`${apiUrl}/clientes/${id}`); // Consultar o cliente pelo ID
    const cliente = await response.json(); // Extrair o JSON da resposta
    // Exibir os dados do cliente na página
    document.getElementById('dadosCliente').textContent = JSON.stringify(cliente);

    // Preencher os campos do formulário de atualização
    document.getElementById('nomeAtualizar').value = cliente.nome;
    document.getElementById('emailAtualizar').value = cliente.email;
    document.getElementById('idadeAtualizar').value = cliente.idade;
}

// Função para Atualizar cliente (PUT)
async function atualizarCliente(event) {
    event.preventDefault();
    const id = document.getElementById('idConsulta').value;
    const nome = document.getElementById('nomeAtualizar').value;
    const email = document.getElementById('emailAtualizar').value;
    const idade = document.getElementById('idadeAtualizar').value;

    const response = await fetch(`${apiUrl}/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, idade })
    });

    const result = await response.json();
    document.getElementById('dadosCliente').textContent = JSON.stringify(result);
}

// Função para deletar cliente (DELETE)
async function deletarCliente() {
    const id = document.getElementById('idConsulta').value;

    const response = await fetch(`${apiUrl}/clientes/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    document.getElementById('dadosCliente').textContent = result.mensagem;
}