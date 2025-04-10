// Seletores de elementos
const dataVenda = document.querySelector('#data-venda');
const codigoEan = document.querySelector('#codigo');
const descricao = document.querySelector('#input-descricao');
const precoVenda = document.querySelector('#valor-unitario');
const inputQtd = document.querySelector('#input-qtd');
const selectCliente = document.querySelector('#nome-cliente');
const alterCliente = document.querySelector('#alterClienteCPF');
const nomeClienteAlter = document.getElementById("nomeClienteAlter");

const clienteId = document.querySelector("#id-cliente");
const creditoUtilizado = document.querySelector("#creditoUtilizado");
const creditoLimite = document.querySelector("#creditoLimite");

const ulDescricaoProduto = document.querySelector('.ul-descricao-produto');
const numeroPedido = document.querySelector('#numero-pedido');

const inputTotalLiquido = document.querySelector('#total-liquido');
const inputTotalPago = document.querySelector('#total-pago');

const unidadeEstoqueRender = document.querySelector('#medidaEstoque');
const divSelecionarQtd = document.querySelector('.div-qtd');
const textSelecionarQtd = document.querySelector('.qtd-selecionada');
const alertLimparVenda = document.querySelector('.confirmation-clear');
const alertExit = document.querySelector('.exit-venda');
const alertRemoverItem = document.querySelector('.remove-item');
const formaPagamento = document.querySelector('.square-2-2-2-4');
const inputExitVenda = document.querySelector('#exit-key');
const inputlimparTelakey = document.querySelector('#limpar-tela-key');
const inputExcluiItem = document.querySelector('#numero-Item');
const mensagemDiv = document.querySelector('#mensagem');
const mostrarDesconto = document.getElementById("mostrarDesconto");

const inputTroco = document.querySelector('#troco');
const valorDinheiro = document.getElementById('valorDinheiro');
const PIX = document.getElementById('PIX');
const CartaoDebito = document.getElementById('Cartao-Debito');
const CartaoCredito = document.getElementById('Cartao-Credito');

const Crediario = document.getElementById('Crediario');
const CrediarioParcela = document.getElementById('Crediario-parcela');
const CrediarioCliente = document.getElementById('Crediario-cliente');

const info_container = document.querySelector('.info-container');
const imgProduto = document.querySelector('.img-produto');
const impressaoCupom = document.getElementById('impressaoCupom');
const div_qtd = document.querySelector('.product-quantity')
const inputdescontoPorcentagem = document.getElementById('desconto');
const divValorDinheiro = document.getElementById('div-valorDinheiro');
const divPIX = document.getElementById('div-PIX');
const divCartaoDebito = document.getElementById('div-Cartao-Debito');
const divCrediario = document.getElementById('div-Crediario');
const divCartaoCredito = document.getElementById('div-Cartao-Credito');
const divDesconto = document.querySelector('.desconto-venda');
const divPagamento = document.querySelector('.payment-form-section');
const divAlterarCliente = document.querySelector('.alterarCliente')
const nomeProduto = document.querySelector('.nomeProduto');
const infoPag = document.getElementById('info-pag');
const infoPagCred = document.getElementById('info-cred');
const inputMaxParcelas = document.getElementById('numeroParcela');
const spanMaxParcelas= document.getElementById('spanMaxParcelas');

// Estado do carrinho
let carrinho = [];

// Define foco inicial
codigoEan.focus();

document.addEventListener('DOMContentLoaded', () => {
    inputMaxCaracteres(CrediarioParcela,2)
    const numeroPedido = document.querySelector('#numero-pedido');
    getVenda(numeroPedido);
    const codigoEan = document.querySelector('#codigo');
    const inputQtd = document.querySelector('#input-qtd');
    const alertLimparVenda = document.querySelector('.confirmation-clear');
    const alertExit = document.querySelector('.exit-venda');
    const alertRemoverItem = document.querySelector('.remove-item');
    const divSelecionarQtd = document.querySelector('.div-qtd');
    const divPagamento = document.querySelector('.payment-form-section');
    const divDesconto = document.querySelector('.desconto-venda');


    function limparInputsPagamento() {
        inputTroco.value = '0,00';
        inputTotalPago.value = '0,00'
        valorDinheiro.value = '';
        PIX.value = '';
        CartaoDebito.value = '';
        CartaoCredito.value = '';
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            limparInputsPagamento();
        }
    });

    document.addEventListener('keydown', (event) => {
        // Selecionar as divs principais
        const visibleDivs = [alertRemoverItem, divPagamento, alertLimparVenda, divSelecionarQtd, alertExit, divDesconto, divAlterarCliente].filter(div => div.style.display === 'block');
        const visibleDivsPag = [divValorDinheiro, divPIX, divCartaoDebito, divCartaoCredito, divCrediario];

        // Função para gerenciar visibilidade de formas de pagamento
        function showOnlyThisDiv(targetDiv) {
            // Verifica se o Shift foi pressionado
            if (!(event.shiftKey)) {
                // Ocultar todas as divs, caso Shift não seja pressionado
                visibleDivsPag.forEach(div => div.style.display = 'none');
            }
            targetDiv.style.display = 'block'; // Exibir a div alvo
        }
        switch (event.key) {
            case 'F1': // Forma pagamento Dinheiro
                if (inputTotalLiquido.value === '0,00') {
                    alertMsg('Não é possível adicionar forma de pagamento com o subtotal da venda igual a R$ 0,00.', 'info', 6000);
                } else if (event.shiftKey || visibleDivs.length === 0) {
                    divPagamento.style.display = 'block';
                    showOnlyThisDiv(divValorDinheiro);
                    valorDinheiro.focus();
                    infoPag.style.display = 'flex';
                    infoPagCred.style.display = 'none'
                }
                break;

            case 'F2': // Forma pagamento PIX
                if (inputTotalLiquido.value === '0,00') {
                    alertMsg('Não é possível adicionar forma de pagamento com o subtotal da venda igual a R$ 0,00.', 'info', 6000);
                } else if (event.shiftKey || visibleDivs.length === 0) {
                    divPagamento.style.display = 'block';
                    showOnlyThisDiv(divPIX);
                    PIX.value = inputTotalLiquido.value;
                    PIX.focus();
                    infoPag.style.display = 'flex';
                    infoPagCred.style.display = 'none'
                }
                break;

            case 'F3': // Forma pagamento Cartão Crédito
                if (inputTotalLiquido.value === '0,00') {
                    alertMsg('Não é possível adicionar forma de pagamento com o subtotal da venda igual a R$ 0,00.', 'info', 6000);
                } else if (event.shiftKey || visibleDivs.length === 0) {
                    divPagamento.style.display = 'block';
                    showOnlyThisDiv(divCartaoCredito);
                    CartaoCredito.value = inputTotalLiquido.value
                    CartaoCredito.focus();
                    infoPag.style.display = 'flex';
                    infoPagCred.style.display = 'none'
                }
                break;

            case 'F4': // Forma pagamento Cartão Débito
                if (inputTotalLiquido.value === '0,00') {
                    alertMsg('Não é possível adicionar forma de pagamento com o subtotal da venda igual a R$ 0,00.', 'info', 6000);
                } else if (event.shiftKey || visibleDivs.length === 0) {
                    divPagamento.style.display = 'block';
                    showOnlyThisDiv(divCartaoDebito);
                    CartaoDebito.value = inputTotalLiquido.value
                    CartaoDebito.focus();
                    infoPag.style.display = 'flex';
                    infoPagCred.style.display = 'none'
                }
                break;

            case 'F8':
                if (event.shiftKey || visibleDivs.length === 0) {
                    divAlterarCliente.style.display = 'block';
                }
                alterCliente.focus()
                break;

            case 'F7': // Forma pagamento 
                if (inputTotalLiquido.value === '0,00') {
                    alertMsg('Não é possível adicionar forma de pagamento com o subtotal da venda igual a R$ 0,00.', 'info', 6000);
                } else if (event.shiftKey || visibleDivs.length === 0) {
                    divPagamento.style.display = 'block';
                    showOnlyThisDiv(divCrediario);
                    Crediario.value = inputTotalLiquido.value;

                    // Criar um objeto Date e adicionar 30 dias
                    const Vencimentos = new Date();
                    Vencimentos.setDate(Vencimentos.getDate() + 30);

                    // Formatar para input[type="date"] (YYYY-MM-DD)
                    const ano = Vencimentos.getFullYear();
                    const mes = (Vencimentos.getMonth() + 1).toString().padStart(2, '0');
                    const dia = Vencimentos.getDate().toString().padStart(2, '0');

                    // Definir no input (tem que ser YYYY-MM-DD)
                    vencimentosCrediario.value = `${ano}-${mes}-${dia}`;

                    CrediarioCliente.focus();
                    informacaoCred.innerHTML = '⚠️ Informe o CPF do cliente já cadastrado no sistema.';
                    informacaoCred.style.backgroundColor = 'rgba(255, 255, 0, 0.196)';
                    informacaoCred.style.color = 'black';
                    infoPag.style.display = 'none';
                    infoPagCred.style.display = 'flex'
                }
                break;

            case 'F6': // Remover item
                if (visibleDivs.length === 0) {
                    alertRemoverItem.style.display = 'block';
                    inputExcluiItem.focus();
                }
                inputExcluiItem.focus();
                break;
            case 'F9': // Alterar quantidade de produtos
                if (visibleDivs.length === 0) {
                    divSelecionarQtd.style.display = 'block';
                    inputQtd.focus();
                }
                break;

            case 'F10': // Aplicar desconto na venda
                if (inputTotalLiquido.value === '0,00') {
                    alertMsg('Não é possível adicionar desconto com o subtotal da venda igual a R$ 0,00.', 'info', 5000);
                } else if (visibleDivs.length === 0) {
                    divDesconto.style.display = 'block';
                    inputdescontoPorcentagem.focus();
                }
                break;

            case 'F12': // Limpar venda
                if (visibleDivs.length === 0) {
                    alertLimparVenda.style.display = 'block';
                }
                inputlimparTelakey.focus();
                break;

            case 'Delete': // Remover item do carrinho
                if (alertRemoverItem.style.display === 'block') {
                    const index = parseInt(inputExcluiItem.value, 10) - 1;
                    if (!isNaN(index) && index >= 0 && index < carrinho.length) {
                        carrinho.splice(index, 1);
                        calCarrinho(carrinho, converteMoeda, inputTotalLiquido, textSelecionarQtd, inputdescontoPorcentagem);
                        rendererCarrinho(carrinho, ulDescricaoProduto, createSpan);

                        // Verifica se o carrinho está vazio antes de alterar a imagem
                        if (carrinho.length === 0) {
                            imgProduto.src = "../style/img/carrinho-de-compras.png"; // Volta para o ícone padrão
                        } else {
                            // Se ainda houver itens, atualiza para o último item do carrinho
                            imgProduto.src = carrinho[carrinho.length - 1].imgSrc || "../style/img/carrinho-de-compras.png";
                        }

                        alertMsg(`Item ${index + 1} removido do carrinho.`, 'warning', 3000);
                    }
                    nomeProduto.innerHTML = ''
                    alertRemoverItem.style.display = 'none';
                    inputExcluiItem.value = '';
                    codigoEan.focus();
                }
                break;


            case 'Escape': // Fechar janelas
                inputExcluiItem.value = '';
                inputExitVenda.value = '';
                if (visibleDivs.length === 0) {
                    alertExit.style.display = alertExit.style.display === 'block' ? 'none' : 'block';
                    if (alertExit.style.display === 'block') {
                        inputExitVenda.focus();
                    }
                } else {
                    visibleDivs.forEach(div => div.style.display = 'none');
                    codigoEan.focus();
                }
                break;

            case 'Enter': // Confirmar quantidade ou exclusão
                if (alertRemoverItem.style.display === 'block') {
                    inputExcluiItem.focus();
                } else if (divSelecionarQtd.style.display === 'block') {
                    divSelecionarQtd.style.display = 'none';
                    codigoEan.focus();
                }
                break;
        }
    });
});
// Valida entrada do código EAN
codigoEan.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 13);
    if (e.target.value.length === 13) {
        if (!descricao.value && !inputQtd.value) inputQtd.value = '1';
        getProduto(descricao, e.target.value, precoVenda, unidadeEstoqueRender);
        setTimeout(() => {
            pushProdutoCarrinho({
                carrinho, produtoIdGlobal, codigoEan, descricao, precoVenda, inputQtd, unidadeEstoqueRender, rendererCarrinho, ulDescricaoProduto, createSpan, resetInputs, calCarrinho, converteMoeda, inputTotalLiquido, textSelecionarQtd, getVenda, numeroPedido, alertLimparVenda
            });
            calCarrinho(
                carrinho,
                converteMoeda,
                inputTotalLiquido,
                textSelecionarQtd
            );
            div_qtd.style.backgroundColor = '';
        }, 100);
    } else if (e.target.value.length === 0) resetInputs();
    getVenda(numeroPedido.value);
});
inputQtd.addEventListener('input', function (e) {
    let value = e.target.value;
    if (parseInt(inputQtd.value) === 0) {
        alertMsg('Não é permitido adicionar 0, minimo 1', 'orange', 3000);
        inputQtd.value = '1'
        div_qtd.style.backgroundColor = ''
        divSelecionarQtd.style.display = 'none';
        return;
    }
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, '');

    // Limita o número de caracteres a 13
    if (value.length > 9) {
        value = value.substring(0, 9);
    }
    // Atualiza o valor do input com o valor formatado
    e.target.value = value;
    textSelecionarQtd.innerHTML = e.target.value;
    div_qtd.style.backgroundColor = 'yellow';
});

const handleInputExit = (e) => {
    if (e.key === 'Enter') {
        // Define a senha padrão caso senhaVendaUser esteja vazia
        const senhaCorreta = senhaVendaUser.trim() === '' ? 'adm' : senhaVendaUser;

        if (inputExitVenda.value === senhaCorreta) {
            window.location.href = '../public/menu.html';
        } else {
            alertMsg('Senha incorreta, tente novamente.', 'error', 3000);
            inputExitVenda.value = '';

            setTimeout(() => {
                inputExitVenda.focus();
            }, 4000);
        }
    }
};

const limparTelakey = (e) => {
    if (e.key === 'Enter') {
        if (inputlimparTelakey.value === 'adm') {
            alertMsg('Todos os campos serão limpos e a venda será reiniciada.', 'warning', 6000);
            limparCampos();
        } else {
            alertMsg('Senha incorreta, tente novamente.', 'error', 3000);
            inputlimparTelakey.value = '';
            setTimeout(() => {
                inputlimparTelakey.focus();
            }, 4000);
        }
    }
};

// Adiciona o evento keydown ao campo de entrada
inputExitVenda.addEventListener('keydown', handleInputExit);
inputlimparTelakey.addEventListener('keydown', limparTelakey);





