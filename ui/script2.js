const apiUrl = 'http://localhost:3000';

// Função para cadastrar cliente
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

// Função para consultar cliente
async function consultarCliente(event) {
    event.preventDefault();
    const id = document.getElementById('idConsulta').value;

    const response = await fetch(`${apiUrl}/clientes/${id}`);
    const cliente = await response.json();

    document.getElementById('dadosCliente').textContent = JSON.stringify(cliente);

    // Preencher os campos do formulário de atualização
    document.getElementById('nomeAtualizar').value = cliente.nome;
    document.getElementById('emailAtualizar').value = cliente.email;
    document.getElementById('idadeAtualizar').value = cliente.idade;
}

// Função para atualizar cliente
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

// Função para deletar cliente
async function deletarCliente() {
    const id = document.getElementById('idConsulta').value;

    const response = await fetch(`${apiUrl}/clientes/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    document.getElementById('dadosCliente').textContent = result.mensagem;
}