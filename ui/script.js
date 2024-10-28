// Função para criar um novo cliente
document.getElementById('formCliente').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;

    try {
        const response = await fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, idade })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(`Cliente criado: ${data.nome}`);
            document.getElementById('formCliente').reset(); // Limpa o formulário
        } else {
            alert(`Erro: ${data.mensagem}`);
        }
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
    }
});

// Função para consultar um cliente
document.getElementById('formConsulta').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const id = document.getElementById('idConsulta').value;

    try {
        const response = await fetch(`http://localhost:3000/clientes/${id}`);

        if (response.ok) {
            const cliente = await response.json();
            document.getElementById('dadosCliente').innerHTML = `
                <div>
                    <strong>ID:</strong> ${cliente.id}<br>
                    <strong>Nome:</strong> ${cliente.nome}<br>
                    <strong>Email:</strong> ${cliente.email}<br>
                    <strong>Idade:</strong> ${cliente.idade}
                </div>
            `;
        } else {
            const errorData = await response.json();
            document.getElementById('dadosCliente').innerHTML = `<p>${errorData.mensagem}</p>`;
        }
    } catch (error) {
        console.error('Erro ao consultar cliente:', error);
    }


});

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            document.getElementById('api-response').innerText = data.message;
        })
        .catch(error => console.error('Error:', error));
});
