const apiEndpointUsers = {
    postApiUser: 'http://localhost:3000/postNewUsuario',
    getApiUser: 'http://localhost:3000/getUsuario',
};


// Função para adicionar o usuário
async function postConfigUser(usuario) {
    const postUser = apiEndpointUsers.postApiUser;

    try {
        const response = await fetch(postUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        const data = await response.json();
        console.log('Usuário adicionado com sucesso:', data);
        alertMsg('Usuário adicionado com sucesso', 'success', 4000);
        limparFormulario();
        return data;
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error.message);
        alertMsg(error.message, 'error', 4000);
        throw error;
    }
}
// Função para inverter a string
function reverseString(str) {
    return str.split('').reverse().join('');
}
// Função para remover o número aleatório inserido no CNPJ/CPF
function removeRandomNumber(cnpjCpf) {
    // Encontra a posição do primeiro ponto e remove o número aleatório entre o ponto
    const parts = cnpjCpf.split('.');
    if (parts.length > 2) {
        parts.splice(1, 1); // Remove o número aleatório (posição 1)
    }
    return parts.join('.');
}

// Função para decodificar o CNPJ/CPF
function decodeCnpjCpf(encodedCnpjCpf) {
    // Decodifica o valor Base64
    const decodedValue = atob(encodedCnpjCpf);

    // Remove o prefixo 'fgl' e o sufixo '1969'
    const cleanedValue = decodedValue.slice(3, decodedValue.length - 4);

    // Inverte a string novamente para obter o CNPJ/CPF original
    const reversedValue = reverseString(cleanedValue);

    // Remove o número aleatório inserido após o primeiro ponto
    return removeRandomNumber(reversedValue);
}

let cnpjCpfDecoded = '';
let contatoUser = '';
let nomeFantasiaUser = '';
let ramoAtuacaoUser = '';
let enderecoUser = '';
let numeroUser = '';
let bairroUser = '';
let cidadeUser = '';
let ufUser = '';
let sloganUser = '';
let redeSocialUser = '';

async function getUser() {
    const getUserApi = apiEndpointUsers.getApiUser;

    try {
        const response = await fetch(getUserApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            console.log('Nenhum usuário encontrado');
            return [];
        }

        // Verifique se 'data[0]' existe antes de tentar acessar suas propriedades
        cnpjCpfDecoded = data[0] && data[0].cnpj_cpf ? decodeCnpjCpf(data[0].cnpj_cpf) : null;
        contatoUser = data[0].contato;
        nomeFantasiaUser = data[0].nome_fantasia;
        ramoAtuacaoUser = data[0].atividade;
        enderecoUser =  data[0].endereco;
        numeroUser = data[0].numero;
        bairroUser = data[0].bairro;
        cidadeUser = data[0].cidade;
        ufUser = data[0].estado;
        sloganUser = data[0].slogan;
        redeSocialUser = data[0].path_img;

        console.log('Usuário obtido com sucesso:', data);

        // Retorne o usuário com o CNPJ/CPF decodificado, se disponível
        return { ...data, cnpj_cpf: cnpjCpfDecoded };
    } catch (error) {
        console.error('Erro ao obter usuário:', error.message);
        alertMsg(error.message, 'error', 4000);
        return [];  // Return an empty array in case of error
    }
}

getUser();

