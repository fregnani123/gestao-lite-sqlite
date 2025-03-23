const divCupon = document.querySelector('.cupom');
const imgLogo = document.querySelector('.imgLogo');

function formatarDataISO(dataISO) {
    const data = new Date(dataISO);
    const agora = new Date();
    data.setHours(agora.getHours(), agora.getMinutes());
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

function formatarValorReal(valor) {
    return parseFloat(valor).toFixed(2).replace('.', ',');
}

async function getUltimoPedidoImprimirFolha(numero_pedido_imprimir) {
    const ultimoPedidoImprimir = `http://localhost:3000/getVendaPorNumeroPedido/${numero_pedido_imprimir}`;
    
    if (divCupon.style.display === 'none' || divCupon.style.display === '') {
        divCupon.style.display = 'block'; // Show div
    }

    try {
        const response = await fetch(ultimoPedidoImprimir);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const nomeFantasia = 'NEW SUN SHINE SHOP SERVICE';
        const razaoSocial = 'Impressões - Informática';
        const endereco = 'R. Henrique Lage - 222, Centro - Içara/SC';
        const contato = 'Contato (48) 3432-5672';
        const cnpj = '07.833.865/0001-88';
        const cliente = data[0].cliente_nome;
        const dataVenda = formatarDataISO(data[0].data_venda);
        const numeroVenda = data[0].numero_pedido;
        const cuponDesconto = data[0].desconto_venda;
        const totalNota = formatarValorReal(data[0].total_liquido);
      
        const valorRecebido = data[0].tipo_pagamento.trim() === 'Crediário' ? '(Crediário Loja)' : formatarValorReal(data[0].valor_recebido);
        const troco = formatarValorReal(data[0].troco);
        const formaPgto = data[0].tipo_pagamento;

        // Set logo image source - desativado
        // const logoSrc = '../style/img/logo.jpeg';  
        // imgLogo.src = logoSrc;

        // Update other elements
        document.querySelector('.titulo-cupom').textContent = nomeFantasia;
        document.querySelector('#razaoSocial').textContent = razaoSocial;
        document.querySelector('#endereco').textContent = endereco;
        document.querySelector('#contato').textContent = contato;
        document.querySelector('#cnpj').textContent = `CNPJ: ${cnpj}`;
        document.querySelector('.dados #cliente').textContent = cliente;
        document.querySelector('.dados #dataVenda').textContent = dataVenda;
        document.querySelector('.dados #numeroVenda').textContent = numeroVenda;
       
        document.querySelector('.total #cuponDesconto').textContent =  `${cuponDesconto}%`;
        document.querySelector('.total #totalNota').textContent = totalNota;
        document.querySelector('.total #valorRecebidoCupom').textContent = valorRecebido;
        document.querySelector('.total #trocoCupom').textContent = troco;
        document.querySelector('.total #formaPgto').textContent = formaPgto;

        // Add items to the list
        const listaItens = document.querySelector('#listaItens');
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-venda');  
            itemDiv.innerHTML = `
                <span>${item.codigo_ean}</span>
                <span>${item.produto_nome}</span>  
                <span>${item.quantidade}${item.unidade_estoque_nome} ${formatarValorReal(item.preco)}</span>
            `;
            listaItens.appendChild(itemDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
