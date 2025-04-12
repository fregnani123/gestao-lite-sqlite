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

        const agendamentos = await response.json();

        const msgAgenda = document.getElementById('msgAgenda');
        if (msgAgenda) {
            msgAgenda.innerHTML = '';
        }

        renderizarAgendamentos(agendamentos); 

    } catch (error) {
        console.error('Erro ao enviar mensagem para o suporte:', error);
    }
}

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

    
});

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

