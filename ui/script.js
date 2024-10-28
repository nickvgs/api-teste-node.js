// script.js

// Função para consultar o cliente pelo ID
async function consultarCliente(event) {
    event.preventDefault(); // Previne o recarregamento da página ao enviar o formulário

    const idCliente = document.getElementById('idConsulta').value; // Pega o valor do ID do input

    try {
        const response = await fetch(`http://localhost:3000/clientes/${idCliente}`); // Faz a requisição para o backend

        if (response.ok) {
            const cliente = await response.json(); // Converte a resposta para JSON
            mostrarDadosCliente(cliente); // Exibe os dados do cliente
        } else {
            mostrarDadosCliente({ mensagem: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar cliente:', error);
        mostrarDadosCliente({ mensagem: 'Erro ao consultar cliente' });
    }
}

// Função para exibir os dados do cliente na página
function mostrarDadosCliente(dados) {
    const dadosClienteDiv = document.getElementById('dadosCliente');
    dadosClienteDiv.innerHTML = '';

    if (dados.mensagem) {
        dadosClienteDiv.innerHTML = `<p>${dados.mensagem}</p>`;
    } else {
        dadosClienteDiv.innerHTML = `
            <p>ID: ${dados.id}</p>
            <p>Nome: ${dados.nome}</p>
            <p>Email: ${dados.email}</p>
            <p>Idade: ${dados.idade}</p>
        `;
    }
}

// Função para cadastrar um novo cliente (POST)
async function cadastrarCliente(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const idade = document.getElementById('idade').value;

  try {
      const response = await fetch('http://localhost:3000/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, idade: parseInt(idade) })
      });

      const resultado = await response.json();

      if (response.ok) {
          mostrarResultadoCadastro(`Cliente cadastrado com sucesso! ID: ${resultado.id}`);
      } else {
          mostrarResultadoCadastro(resultado.mensagem || 'Erro ao cadastrar cliente');
      }
  } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      mostrarResultadoCadastro('Erro ao cadastrar cliente');
  }
}

// Função para exibir o resultado do cadastro
function mostrarResultadoCadastro(mensagem) {
  const resultadoCadastroDiv = document.getElementById('resultadoCadastro');
  resultadoCadastroDiv.innerHTML = `<p>${mensagem}</p>`;
}
