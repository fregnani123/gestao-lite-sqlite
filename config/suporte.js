const btnEnviarMsg = document.getElementById("btnEnviarMsg");
const userID = document.getElementById('userID'); // campo hidden
const inputChat = document.getElementById('inputChat'); // campo de mensagem
const btnSuporte = document.querySelector('.menu-item-13');
const btnfecharSuporte = document.querySelector('.btn-fechar-chat');
const divSuporte = document.querySelector('.chat-suporte');
const chatMessagesDiv = document.querySelector('.chat-messages');

// Abrir chat
btnSuporte.addEventListener('click', (e) => {
    e.preventDefault();

    if (divSuporte.style.display === 'none' || divSuporte.style.display === '') {
        divSuporte.style.display = 'flex';
    }

    inputChat.focus();

    setTimeout(() => {
        mensagensData(userID.value);
    }, 100);
});

// Enviar mensagem
btnEnviarMsg.addEventListener('click', async (e) => {
    e.preventDefault();

    const remetente = userID.value.trim();
    const mensagem = inputChat.value.trim();

    if (!remetente || !mensagem) return;

    const msgEnviar = { remetente, mensagem };

    await enviarMsSuporte(msgEnviar);

    inputChat.value = '';

    setTimeout(() => {
        mensagensData(userID.value);
    }, 200);
});

// Fechar chat
btnfecharSuporte.addEventListener('click', (e) => {
    e.preventDefault();
    divSuporte.style.display = 'none';
});

// Função para enviar mensagem
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

// Buscar e exibir mensagens
// Buscar e exibir mensagens
async function mensagensData(remetente) {
    chatMessagesDiv.classList.add('oculto'); // Isso adiciona a opacidade 0 durante a atualização

    const urlMsgUsuario = `http://localhost:3000/getLicenca/${remetente}`;
    const urlMsgSuporte = `http://localhost:3000/getSuporte/${remetente}`;

    try {
        const [resUsuario, resSuporte] = await Promise.all([
            fetch(urlMsgUsuario, {
                method: 'GET',
                headers: {
                    'x-api-key': 'segredo123',
                    'Content-Type': 'application/json'
                }
            }),
            fetch(urlMsgSuporte, {
                method: 'GET',
                headers: {
                    'x-api-key': 'segredo123',
                    'Content-Type': 'application/json'
                }
            })
        ]);

        const mensagensUsuario = resUsuario.ok ? await resUsuario.json() : [];
        const mensagensSuporte = resSuporte.ok ? await resSuporte.json() : [];

        const todasMensagens = [...mensagensUsuario, ...mensagensSuporte].sort((a, b) => {
            return new Date(a.data_envio) - new Date(b.data_envio);
        });

        chatMessagesDiv.innerHTML = '';  // Limpa as mensagens atuais

        // Agora apenas atualiza as mensagens sem fazer a animação de opacidade
        exibirMensagens(todasMensagens);

        chatMessagesDiv.classList.remove('oculto');  // Remover a opacidade para exibir as mensagens

        // Manter o scroll no final após a atualização, sem resetar
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
    }
}

// Função para exibir mensagens no chat sem piscar
function exibirMensagens(mensagens) {
    mensagens.forEach(mensagemObj => {
        const mensagemDiv = document.createElement('div');
        const ehSuporte = mensagemObj.remetente.toLowerCase() === 'suporte';

        mensagemDiv.classList.add(ehSuporte ? 'mensagem-suporte' : 'mensagem-usuario');

        if (ehSuporte) {
            const remetente = document.createElement('div');
            remetente.classList.add('remetente');
            remetente.textContent = mensagemObj.remetente;
            mensagemDiv.appendChild(remetente);
        }

        const texto = document.createElement('div');
        texto.classList.add('texto-mensagem');
        texto.textContent = mensagemObj.mensagem;

        const data = document.createElement('div');
        data.classList.add('data-msg');
        data.textContent = new Date(mensagemObj.data_envio).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });

        mensagemDiv.appendChild(texto);
        mensagemDiv.appendChild(data);
        chatMessagesDiv.appendChild(mensagemDiv);
    });
}


// Carregar mensagens ao iniciar
mensagensData(userID.value);

// Atualização automática para quando suporte envia nova mensagem
setInterval(() => {
    mensagensData(userID.value);
}, 5000);  // Atualiza as mensagens a cada 5 segundos
