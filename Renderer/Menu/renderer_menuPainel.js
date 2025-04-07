const menuPainel1 = [
    { id: '1', texto: 'Painel de controle', src: '../style/img/painel-de-controle (1).png', to: '' },
    { id: '9', texto: 'Agenda', src: '../style/img/agenda.png', to: '../public/agenda.html' },
    { id: '12', texto: 'Backup GL', src: '../style/img/pendrive.png', to: '' },
    { id: '7', texto: 'Cliente', src: '../style/img/cadastroCliente.png', to: '../public/registrar_cliente.html' },
    { id: '11', texto: 'Configurações Gerais', src: '../style/img/configuracoes.png', to: '../public/config.html' },
];
const menuPainel2 = [
    /* Menu id:6 oculto, disponível para futuras novas do painel opções */
    { id: '6', texto: '', src: '', to: '' },
    { id: '10', texto: 'Crediário',  src: '../style/img/crediario.png', to: '../public/crediario.html' },
    { id: '3', texto: 'Detalhes de venda', src: '../style/img/detalhes vendas.png', to: '../public/detalhe_vendas.html' },
    { id: '8', texto: 'Estoque ', src: '../style/img/caixa-de-entrada.png', to: '../public/controle_estoque.html' },
    { id: '5', texto: 'Fornecedor', src: '../style/img/fornecedor.png', to: '../public/fornecedor.html' },  
];

const menuPainel3 = [
    /* Menu id:6 oculto, disponível para futuras novas do painel opções */
    { id: '6', texto: '', src: '', to: '' },
    { id: '4', texto: 'Produto', src: '../style/img/codigo-de-barras.png', to: '../public/registrar_produto.html' },
    { id: '2', texto: 'Realizar venda', src: '../style/img/carrinho-de-compras-icon.png', to: '../public/tela_vendas.html' },
    { id: '13', texto: 'Suporte', src: '../style/img/suporte.png', to: '' },
    { id: '14', texto: 'Sair', src: '../style/img/sair.png', to: '../public/index.html' },
];

function criaLi(texto, id, src, to) {
    const li = document.createElement('li');

    if (id === '1') {
        const span = document.createElement('span');
        span.textContent = texto;
        li.appendChild(span);
    } else {
        const a = document.createElement('a');
        a.textContent = texto;
        a.href = to;

        if (to.startsWith('http')) {
            a.target = '_blank';
        }

        li.appendChild(a);
    }

    if (src && typeof src === 'string' && src.trim() !== '') {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('img-'+ id)
        li.appendChild(img);
    }

    li.classList.add('menu-item-' + id);
    return li;
}

const listPainel1 = document.querySelector('#menu-painel1');
const listPainel2 = document.querySelector('#menu-painel2');
const listPainel3 = document.querySelector('#menu-painel3');

menuPainel1.map(itemPainel => {
    const li = criaLi(itemPainel.texto, itemPainel.id, itemPainel.src, itemPainel.to);
    listPainel1.appendChild(li);
});

menuPainel2.map(itemPainel => {
    const li = criaLi(itemPainel.texto, itemPainel.id, itemPainel.src, itemPainel.to);
    listPainel2.appendChild(li);
});

menuPainel3.map(itemPainel => {
    const li = criaLi(itemPainel.texto, itemPainel.id, itemPainel.src, itemPainel.to);
    listPainel3.appendChild(li);
});

const btnSuporte = document.querySelector('.menu-item-13');

btnSuporte.addEventListener('click', (e) => {
    e.preventDefault();

    if (document.querySelector('.chat-suporte')) return; // evita múltiplas janelas

    const divSuporte = document.createElement('div');
    divSuporte.classList.add('chat-suporte');

    divSuporte.innerHTML = `
        <div class="chat-header">
            <span>Suporte</span>
            <button class="btn-fechar-chat">&times;</button>
        </div>
        <div class="chat-messages">
            <div class="mensagem-suporte">Olá! Como posso ajudar?</div>
        </div>
        <div class="chat-input">
            <input id='inputChat' type="text" placeholder="Digite sua mensagem..." />
            <button>Enviar</button>
        </div>
    `;

    document.body.appendChild(divSuporte);
    const inputChat = document.getElementById('inputChat');
    inputChat.focus();

    // Fechar chat
    divSuporte.querySelector('.btn-fechar-chat').addEventListener('click', () => {
        divSuporte.remove();
    });
});
