const btnEnviarMsg = document.getElementById("btnEnviarMsg");
const userID = document.getElementById('userID');      // campo hidden
const inputChat = document.getElementById('inputChat'); // campo de mensagem
const btnSuporte = document.querySelector('.menu-item-13');
const btnfecharSuporte = document.querySelector('.btn-fechar-chat');
const divSuporte = document.querySelector('.chat-suporte');

btnSuporte.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(divSuporte.style.display === 'none'){
        divSuporte.style.display='flex'
    }
    inputChat.focus();
    setTimeout(() => {
        mensagensData(userID.value);
        exibirMensagens();
    }, 100); 
    // Aqui é onde você garante o scroll após renderizar tudo
 const chatMessagesDiv = document.querySelector('.chat-messages');
 chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
});

async function enviarMsSuporte(mensagem) { 
    const urlEnviarMsg = 'http://localhost:3000/postmensagem';

    
    try {
        const response = await fetch(urlEnviarMsg, {
            method: 'POST',
            headers: {
                'x-api-key': 'segredo123',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensagem)
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar mensagem: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem para o suporte:', error);
    }
}

async function mensagensData(remetente) { 
    const chatMessagesDiv = document.querySelector('.chat-messages');
    
    // Inicia fade-out
    chatMessagesDiv.classList.add('oculto');

    const urlMsgDate = `http://localhost:3000/getLicenca/${remetente}`;
    try {
        const response = await fetch(urlMsgDate, {
            method: 'GET',
            headers: {
                'x-api-key': 'segredo123',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.log('Erro ao buscar as mensagens para o suporte');
            return;
        }

        const msgData = await response.json();

        // Aguarda a transição de fade-out antes de limpar e mostrar
        setTimeout(() => {
            chatMessagesDiv.innerHTML = ''; // limpar
            exibirMensagens(msgData);       // inserir novas

            // Finaliza com fade-in
            chatMessagesDiv.classList.remove('oculto');
        }, 200); // mesmo tempo da transição no CSS (0.2s)

    } catch (error) {
        console.error('Erro ao buscar as mensagens para o suporte:', error);
    }
}


btnEnviarMsg.addEventListener('click', (e) => {
    e.preventDefault();

    const remetente = userID.value.trim();
    const mensagem = inputChat.value.trim();

    if (!remetente || !mensagem) {
        return;
    }

    const msgEnviar = {
        remetente,
        mensagem
    };

    enviarMsSuporte(msgEnviar);
    
    setTimeout(() => {
        mensagensData(userID.value);
        exibirMensagens()
    }, 200); 
    
    // (opcional) limpar campo após envio:
    inputChat.value = '';
});

// Fechar chat
btnfecharSuporte.addEventListener('click', (e) => {
    e.preventDefault();
    if(divSuporte.style.display === 'flex'){
        divSuporte.style.display='none';
    }
});

function exibirMensagens(mensagens) {
    const chatMessagesDiv = document.querySelector('.chat-messages');
    
    mensagens.forEach(mensagemObj => {
        const mensagemDiv = document.createElement('div');
        mensagemDiv.classList.add('mensagem-suporte');

        // const remetente = document.createElement('div');
        // remetente.classList.add('remetente');
        // remetente.textContent = mensagemObj.remetente;

        const texto = document.createElement('div');
        texto.classList.add('texto-mensagem');
        texto.textContent = mensagemObj.mensagem;

        const data = document.createElement('div');
        data.classList.add('data-msg');
        const dataFormatada = new Date(mensagemObj.data_envio).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });
        data.textContent = dataFormatada;

        // Organiza na ordem desejada
        // mensagemDiv.appendChild(remetente);
        mensagemDiv.appendChild(texto);
        mensagemDiv.appendChild(data);

        chatMessagesDiv.appendChild(mensagemDiv);
    });

    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}



mensagensData(userID.value);