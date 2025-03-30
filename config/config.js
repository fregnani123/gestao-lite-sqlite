
const nomeFantasia = document.getElementById('nome_fantasia');
const razaoSocial = document.getElementById('razao_social');
const cep = document.getElementById('cep');
const endereco = document.getElementById('endereco');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('uf');
const contato = document.getElementById('contato');
const cnpjCpf = document.getElementById('cnpjCpf');
const ie = document.getElementById('inscricao_estadual');
const email = document.getElementById('email');
const site = document.getElementById('site');
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const tipoUsuario = document.getElementById('tipoPessoa');
const atividade = document.getElementById('atividade');
const slogan = document.getElementById('slogan');
const pathImg = document.getElementById('qr_code_img');
const ativo = document.getElementById('ativo');
const btnUser = document.getElementById('btn-user');
const labelCnpjCPF = document.getElementById('label_cnpj_cpf');
const labelNomeFantasia = document.getElementById('labelNomeFantasia');
const labelRazao = document.getElementById('label_razao');
const contribuinte = document.getElementById('inscricaoEstadual');
const limparButtonFilter = document.getElementById('limparButton');


document.addEventListener('DOMContentLoaded', () => {

    formatarTelefone(contato);
    inputMaxCaracteres(contato, 15);

    inputMaxCaracteres(cnpjCpf, 18);

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
    inputMaxCaracteres(estado, 2);
    inputMaxCaracteres(slogan, 48);
    inputMaxCaracteres(pathImg, 30);
    getUserAtualizar();
})

// Ocultar elementos do menu secundário se existirem
const menuItems = document.querySelectorAll('li.menu-item-2, li.menu-item-3, li.menu-item-4, li.menu-item-5, li.menu-item-6, li.menu-item-7, li.menu-item-8, li.menu-item-9, li.menu-item-10');
if (menuItems.length > 0) {
    menuItems.forEach(element => element.style.display = 'none');
}

const linkID_11 = document.querySelector('.list-a11');
if (linkID_11) {
    estilizarLinkAtivo(linkID_11);
}

tipoUsuario.addEventListener('change', () => {
    if (!cnpjCpf || !labelCnpjCPF || !labelRazao) return;

    cnpjCpf.value = '';
    // Criando a imagem do ícone de impressão

    if (tipoUsuario.value === "juridica") {
        cnpjCpf.removeAttribute('readonly');
        razaoSocial.removeAttribute('readonly');
        nomeFantasia.removeAttribute('readonly');

        if (contribuinte) {
            contribuinte.removeAttribute('disabled');
            contribuinte.value = 'isento';
        }

        formatarCNPJ(cnpjCpf);
        inputMaxCaracteres(cnpjCpf, 18);
        labelCnpjCPF.innerHTML = '';
        labelCnpjCPF.append('CNPJ');
        labelRazao.innerHTML = 'Razão Social';
        labelNomeFantasia.innerHTML = '';
        labelNomeFantasia.append('Nome Fantasia');
        cnpjCpf.focus();

    } else if (tipoUsuario.value === "fisica") {
        labelNomeFantasia.innerHTML = '';
        labelNomeFantasia.append('Título do Cupom (Substitui o nome fantasia');
        cnpjCpf.removeAttribute('readonly');
        razaoSocial.removeAttribute('readonly');
        nomeFantasia.removeAttribute('readonly');
        if (contribuinte) {
            contribuinte.value = 'isento';
        }

        formatarEVerificarCPF(cnpjCpf);
        inputMaxCaracteres(cnpjCpf, 14);

        labelCnpjCPF.innerHTML = 'CPF';
        labelRazao.innerHTML = 'Nome';
        cnpjCpf.focus();

    } else if (tipoUsuario.value === "") {  // Se a pessoa apagar o valor do select
        cnpjCpf.setAttribute('readonly', 'true');
        razaoSocial.setAttribute('readonly', 'true');
        nomeFantasia.setAttribute('readonly', 'true');

        if (contribuinte) {
            contribuinte.setAttribute('disabled', 'true');
            contribuinte.value = ''; // Reseta para vazio
        }

        cnpjCpf.value = '';
        razaoSocial.value = '';
        nomeFantasia.value = '';

        labelCnpjCPF.innerHTML = 'CNPJ / CPF';
        labelRazao.innerHTML = 'Razão Social / Nome';
    }
});

contribuinte.addEventListener('change', () => {
    if (contribuinte.value === 'contribuinte') {
        ie.removeAttribute('readonly');
    } else {
        ie.value = '';
        ie.setAttribute('readonly', true);
    }
});

function estilizarLinkAtivo(linkID) {
    linkID.style.background = '#ffcc00';
    linkID.style.textShadow = 'none';
    linkID.style.color = 'black';
    linkID.style.borderBottom = '2px solid black';
}

btnUser.addEventListener('click', (e) => {
    e.preventDefault();

    let missingFields = [];

    if (!nomeFantasia.value) missingFields.push('Nome Fantasia');
    if (!razaoSocial.value) missingFields.push('Razão Social');
    if (!cep.value) missingFields.push('CEP');
    if (!endereco.value) missingFields.push('Endereço');
    if (!bairro.value) missingFields.push('Bairro');
    if (!cidade.value) missingFields.push('Cidade');
    if (!estado.value) missingFields.push('Estado');
    if (!contato.value) missingFields.push('Contato');
    if (!cnpjCpf.value) missingFields.push('CNPJ/CPF');
    if (!email.value) missingFields.push('E-mail');
    if (!tipoUsuario.value) missingFields.push('Tipo de Usuário');
    if (!slogan.value) missingFields.push('Slogan');

    if (missingFields.length > 0) {
        alertMsg(`Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`, 'info', 4000);
        return;
    }

    const usuario = {
        nome_fantasia: nomeFantasia.value.toUpperCase(),
        razao_social: razaoSocial.value,
        cep: cep.value,
        endereco: endereco.value,
        numero: numero.value || null,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        contato: contato.value,
        cnpj_cpf: cnpjCpf.value,
        inscricao_estadual: ie.value,
        email: email.value,
        site: site.value || null,
        usuario: usuarioInput.value || 'adm',
        senha: senhaInput.value || 'adm',
        tipo_usuario: tipoUsuario.value,
        slogan: slogan.value,
        path_img: pathImg.value,
        ativo: ativo.value,
        contribuinte: contribuinte.value,
        atividade: atividade.value,
    };

    postConfigUser(usuario);
});

limparButtonFilter.addEventListener('click', () => {
    location.reload();
});

function limparFormulario() {
    nomeFantasia.value = '';
    razaoSocial.value = '';
    cep.value = '';
    endereco.value = '';
    numero.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
    contato.value = '';
    cnpjCpf.value = '';
    ie.value = '';
    email.value = '';
    site.value = '';
    usuarioInput.value = 'adm';
    senhaInput.value = 'adm';
    tipoUsuario.value = '';
    slogan.value = '';
    pathImg.value = '';
    ativo.value = '';
    contribuinte.value = '';
    atividade.value = '';
};

function atualizarUsuario(){

    nomeFantasia.value = nomeFantasiaUser || '';
    razaoSocial.value = razaoSocialUser || '';
    // cep =
    // endereco = 
    // numero = 
    // bairro = 
    // cidade =
    // estado =
    // contato = 
    // cnpjCpf =
    // ie =
    // email = 
    // site = 
    // usuarioInput = 
    // senhaInput = 
    // tipoUsuario = 
    // atividade =
    // slogan =
    // pathImg = 
    // ativo =
    // contribuinte = 
    }
