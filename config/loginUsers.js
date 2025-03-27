function focus() {
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
        usernameInput.focus();
    }
}

document.getElementById('username').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita o envio do formulário
        document.getElementById('password').focus(); // Move o foco para o próximo input
    }
});

document.getElementById('password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita o envio do formulário
        document.getElementById('formLogin').focus(); // Move o foco para o botão de login
    }
});

document.getElementById('formLogin').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log(`Username: ${username}, Password: ${password}`);

    if (username === 'adm' && password === 'adm') {
        window.location.href = '../public/menu.html';
        console.log('Login bem-sucedido');
    } else {
        console.log('Usuário ou senha inválidos');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('termos');
    const botaoAtivar = document.getElementById('ativar-btn');
    
    checkbox.addEventListener('change', () => {
        botaoAtivar.disabled = !checkbox.checked;
    });
});


const botaoAtivar = document.getElementById('ativar-btn');

botaoAtivar.addEventListener('click', (e) => {
    e.preventDefault();

    const inputClient = document.getElementById('cliente').value
    const inputSerial = document.getElementById('serial-key').value

    if (!inputClient || !inputSerial) {
        alert('inputs vazios');
        return;
    }
    verificaDadosSerial(inputClient, inputSerial);
});


verificaValidadeDate();
verificaAtivacaoMysql();


