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
const btnAtualizar = document.getElementById('btn-cad-fornecedor');

function estilizarLinkAtivo(linkID) {
    linkID.style.background = '#ffcc00'; // Cor de fundo
    linkID.style.textShadow = 'none'; // Sem sombra de texto
    linkID.style.color = 'black'; // Cor do texto
    linkID.style.borderBottom = '2px solid black'; // Borda inferior
}
estilizarLinkAtivo(linkID_8)

document.addEventListener('DOMContentLoaded', () => {
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

cnpj.addEventListener('input', () => {
    if (cnpj.value.length === 18) {
        getFornecedores();
    } else if (cnpj.value.length < 18) {
        limparCamposFornecedor();
    }
});

function getFornecedores() {
    const getFornecedor = 'http://localhost:3000/fornecedor';

    fetch(getFornecedor)
        .then(response => response.json())
        .then(data => {
            const fornecedorEncontrado = data.find(fornecedor => fornecedor.cnpj === cnpj.value);

            if (fornecedorEncontrado) {
                razaoSocial.value = fornecedorEncontrado.razao_social || '';
                nomeFantasia.value = fornecedorEncontrado.nome_fantasia || '';
                ie.value = fornecedorEncontrado.inscricao_estadual || '';
                telefone.value = fornecedorEncontrado.telefone || '';
                cep.value = fornecedorEncontrado.cep || '';
                email.value = fornecedorEncontrado.email || '';
                endereco.value = fornecedorEncontrado.endereco || '';
                bairro.value = fornecedorEncontrado.bairro || '';
                uf.value = fornecedorEncontrado.uf || '';
                observacoes.value = fornecedorEncontrado.observacoes || '';


                // Define o valor do estado
                uf.value = fornecedorEncontrado.uf || 'Selecione';

                // Dispara o evento change para carregar as cidades
                const eventoChange = new Event('change');
                uf.dispatchEvent(eventoChange); // Dispara o evento change

                // Agora, vamos marcar a cidade correta
                // Verifica todas as opções do select e marca a cidade correspondente
                for (let option of cidade.options) {
                    if (option.text === fornecedorEncontrado.cidade) {
                        option.selected = true;
                        break;  // Sai do loop assim que encontrar a cidade
                    }
                }
            } else {
                limparCamposFornecedor();
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
};


async function UpdateFornecedor(fornecedorId) {
    const UpdateFornecedorUrl = 'http://localhost:3000/UpdateFornecedor';

    try {
        const patchResponse = await fetch(UpdateFornecedorUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fornecedorId),
        });

        if (!patchResponse.ok) {
            alertMsg('Erro ao atualizar fornecedor', 'info', 3000);
        } else {
            alertMsg('Fornecedor atualizado com sucesso', 'success', 3000);
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    } catch (error) {
        alertMsg('Erro durante a atualização do fornecedor:','error',2000);
        consol.log('Erro durante a atualização do fornecedor:', error);
    }
}

btnAtualizar.addEventListener('click', (e) => {
    e.preventDefault();

    const fornecedorId = {
        inscricao_estadual: ie.value,
        razao_social: razaoSocial.value,
        nome_fantasia: nomeFantasia.value,
        cep: cep.value,
        cidade: cidade.value,
        bairro: bairro.value,
        uf: uf.value,
        endereco: endereco.value,
        telefone: telefone.value,
        email: email.value,
        observacoes: '',
        cnpj: cnpj.value
    };

    UpdateFornecedor(fornecedorId);
});

function limparCamposFornecedor() {
    razaoSocial.value = '';
    nomeFantasia.value = '';
    ie.value = '';
    telefone.value = '';
    cep.value = '';
    email.value = '';
    endereco.value = '';
    bairro.value = '';
    cidade.value = '';
    uf.value = '';
    observacoes.value = '';
}

const limparButtonFilter = document.getElementById('limparButton');

limparButtonFilter.addEventListener('click',()=>{
    location.reload();
});