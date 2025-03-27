const apiEndpoints = {
    postApiUser: 'http://localhost:3000/postNewUsuario',
};

async function postConfigUser(usuario) {
    const postUser = apiEndpoints.postApiUser;

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
