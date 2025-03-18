// Declarando as variáveis para os campos do formulário
const telefone = document.getElementById('telefone');
const cnpj = document.getElementById('cnpj');
const ie = document.getElementById('ie');
const cep = document.getElementById('cep');
const email = document.getElementById('email');
const razaoSocial = document.getElementById('razaoSocial');
const nomeFantasia = document.getElementById('nomeFantasia');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');
const observacoes = document.getElementById('observacoes');
const linkID_8 = document.querySelector('.list-a8');

function estilizarLinkAtivo(linkID) {
    linkID.style.background = '#ffcc00'; // Cor de fundo
    linkID.style.textShadow = 'none'; // Sem sombra de texto
    linkID.style.color = 'black'; // Cor do texto
    linkID.style.borderBottom = '2px solid black'; // Borda inferior
  }
  estilizarLinkAtivo(linkID_8)

document.addEventListener('DOMContentLoaded',()=>{
    cnpj.focus();
})


// APLICANDO A FORMATAÇÃO NOS CAMPOS

// Formatando o campo telefone
formatarTelefone(telefone);
inputMaxCaracteres(telefone, 15);

// Formatando o campo CNPJ
formatarCNPJ(cnpj);
inputMaxCaracteres(cnpj, 18);

// Formatando o campo IE
formatarIE(ie);
inputMaxCaracteres(ie, 14);

// Formatando o campo CEP
formatarCEP(cep);
inputMaxCaracteres(cep, 9);

// Verificando o campo email
verificarEmail(email);
inputMaxCaracteres(email, 150);

// Limitando o número de caracteres para outros campos
inputMaxCaracteres(razaoSocial, 200);
inputMaxCaracteres(nomeFantasia, 200);
inputMaxCaracteres(endereco, 255);
inputMaxCaracteres(bairro, 150);
inputMaxCaracteres(cidade, 150);
inputMaxCaracteres(uf, 2);

// Enviar dados do formulário
async function sendNewFornecedor() {
    const newFornecedor = {
        cnpj: cnpj.value.trim() || null,
        inscricao_estadual: ie.value.trim() || null,
        razao_social: razaoSocial.value.trim(),
        nome_fantasia: nomeFantasia.value.trim() || null,
        cep: cep.value.trim() || null,
        endereco: endereco.value.trim() || null,
        bairro: bairro.value.trim() || null,
        uf: uf.value.trim().toUpperCase() !== "SELECIONE" ? uf.value.toUpperCase() : null,
        cidade: cidade.value.trim() !== "selecione" ? cidade.value : null,
        telefone: telefone.value.trim() || null,
        email: email.value.trim() || null,
        observacoes: observacoes.value.trim() || null
    };

// Verificar quais campos obrigatórios não foram preenchidos
let camposFaltando = [];

if (!cnpj.value.trim()) camposFaltando.push("CNPJ");
// if (!ie.value.trim()) camposFaltando.push("Inscrição Estadual");
if (!razaoSocial.value.trim()) camposFaltando.push("Razão Social");
if (!nomeFantasia.value.trim()) camposFaltando.push("Nome Fantasia");
if (!cep.value.trim()) camposFaltando.push("CEP");
if (!endereco.value.trim()) camposFaltando.push("Endereço");
if (!bairro.value.trim()) camposFaltando.push("Bairro");
if (!cidade.value.trim() || cidade.value.trim().toLowerCase() === "selecione") camposFaltando.push("Cidade");
if (!uf.value.trim() || uf.value.trim().toUpperCase() === "SELECIONE") camposFaltando.push("UF");
if (!telefone.value.trim()) camposFaltando.push("Telefone");
if (!email.value.trim()) camposFaltando.push("E-mail");

// Se algum campo obrigatório estiver faltando
if (camposFaltando.length > 0) {
    alertMsg(`Todos os campos obrigatórios devem ser preenchidos. Faltando: ${camposFaltando.join(", ")}`, 'info', 5000);
    return;
}

     postNewFornecedor(newFornecedor); // Chama a função para enviar os dados 
}


// Função para limpar os campos
function limparFormulario() {
    telefone.value = '';
    cnpj.value = '';
    ie.value = '';
    cep.value = '';
    email.value = '';
    razaoSocial.value = '';
    nomeFantasia.value = '';
    endereco.value = '';
    bairro.value = '';
    cidade.value = '';
    uf.value = '';
    observacoes.value = '';
}

// Adicionando evento ao botão de envio
document.getElementById("btn-cad-fornecedor").addEventListener("click", (e) => {
    e.preventDefault();
    sendNewFornecedor();
});

const limparButtonFilter = document.getElementById('limparButton');

limparButtonFilter.addEventListener('click',()=>{
    location.reload();
});