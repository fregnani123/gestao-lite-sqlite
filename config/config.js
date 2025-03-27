const nomeFantasia = document.getElementById('nome_fantasia');
const razaoSocial = document.getElementById('razao_social');
const cep = document.getElementById('cep'); // Corrigido o ID do input de CEP
const endereco = document.getElementById('endereco');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const contato = document.getElementById('contato');
const cnpjCpf = document.getElementById('cnpjCpf');
const ie = document.getElementById('inscricao_estadual');
const email = document.getElementById('email');
const site = document.getElementById('site');
const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const tipoUsuario = document.getElementById('tipoPessoa');
const slogan = document.getElementById('slogan');
const pathImg = document.getElementById('qr_code_img');
const ativo = document.getElementById('ativo');
const btnUser = document.getElementById('btn-user');
const labelCnpjCPF = document.getElementById('label_cnpj_cpf');
const labelRazao = document.getElementById('label_razao');
const contribuinte = document.getElementById('inscricaoEstadual');

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

        labelCnpjCPF.innerHTML = 'CNPJ';
        labelRazao.innerHTML = 'Razão Social';
        cnpjCpf.focus();
    } else if (tipoUsuario.value === "fisica") {
        cnpjCpf.removeAttribute('readonly');
        razaoSocial.removeAttribute('readonly');
        nomeFantasia.setAttribute('readonly', true);

        if (contribuinte) {
            contribuinte.value = 'isento';
        }

        formatarEVerificarCPF(cnpjCpf);
        inputMaxCaracteres(cnpjCpf, 14);

        labelCnpjCPF.innerHTML = 'CPF';
        labelRazao.innerHTML = 'Nome';

        razaoSocial.addEventListener('input', () => {
            if (tipoUsuario.value === "fisica") {
                nomeFantasia.value = razaoSocial.value;
            }
        });

        cnpjCpf.focus();
    } else if (tipoUsuario.value === "") {  // Se a pessoa apagar o valor do select
        // Bloqueia e reseta os campos
        cnpjCpf.setAttribute('readonly', 'true');
        razaoSocial.setAttribute('readonly', 'true');
        nomeFantasia.setAttribute('readonly', 'true');

        if (contribuinte) {
            contribuinte.setAttribute('disabled', 'true');
            contribuinte.value = ''; // Reseta para vazio
        }

        // Reseta valores dos campos
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

    if (!nomeFantasia.value || !razaoSocial.value || !cep.value || !endereco.value ||
        !numero.value || !bairro.value || !cidade.value || !estado.value ||
        !contato.value || !cnpjCpf.value || !ie.value || !email.value ||
        !site.value || !usuarioInput.value || !senhaInput.value ||
        !tipoUsuario.value || !slogan.value || !pathImg.value) {
        alertMsg('Todos os campos são obrigatórios.', 'orange', 4000);
        return;
    }

    const usuario = {
        nome_fantasia: nomeFantasia.value,
        razao_social: razaoSocial.value,
        cep: cep.value,
        endereco: endereco.value,
        numero: numero.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        contato: contato.value,
        cnpj_cpf: cnpjCpf.value,
        inscricao_estadual: ie.value,
        email: email.value,
        site: site.value,
        usuario: usuarioInput.value,
        senha: senhaInput.value,
        tipo_usuario: tipoUsuario.value,
        slogan: slogan.value,
        path_img: pathImg.value,
        ativo: ativo.value
    };

    postConfigUser(usuario);
});
