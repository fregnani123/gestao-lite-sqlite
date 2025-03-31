const path = require('path');
const Database = require('better-sqlite3');
const { app } = require('electron');

const { ensureDBInitialized } = require(path.join(__dirname, './ensureDBInitialized'));

// Obtém o caminho dinâmico para o diretório %APPDATA% e cria uma subpasta para o aplicativo
const appDataPath = app.getPath('appData');
const appDBPath = path.join(appDataPath, 'electronmysql', 'db'); // Subpasta do aplicativo

// Caminho completo para o banco de dados
const dbPath = path.join(appDBPath, 'gestaolite.db');

// Inicializa o banco de dados
const db = new Database(dbPath, { verbose: console.log });

// Habilitar as chaves estrangeiras
db.pragma('foreign_keys = ON');
console.log('Chaves estrangeiras ativadas.');


async function getUsuario() {
    await ensureDBInitialized();

    try {
        // Adiciona uma cláusula WHERE para filtrar produtos ativos
        const rows = db.prepare('SELECT * FROM usuario').all();
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados SQLite ou executar a consultar usuarios:', error);
        throw error;
    }
}

// Função para gerar um número aleatório de 3 dígitos
function generateRandomNumber() {
    return Math.floor(Math.random() * 900) + 100; // Gera um número aleatório entre 100 e 999
}

// Função para inverter a string
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Função para codificar o CNPJ/CPF antes de salvar
function encode(cod) {
    const randomNumber = generateRandomNumber(); // Gerar número aleatório de 3 dígitos
    const codRandom = cod.replace('.', `.${randomNumber}.`); // Inserir número aleatório
    const valorComPrefixo = "fgl" + reverseString(codRandom || "") + "1969"; // Inverter string e adicionar prefixo
    return Buffer.from(valorComPrefixo).toString('base64'); // Codificar em base64
}


async function postNewUsuario(usuario) {
    await ensureDBInitialized();
    try {
        // Verifica se já existe um usuário cadastrado
        const existingUser = db.prepare("SELECT COUNT(*) as total FROM usuario").get();

        if (existingUser.total > 0) {
            throw new Error("Já existe um usuário cadastrado. Apenas um usuário é permitido.");
        }

        const insertQuery = `
            INSERT INTO usuario (
                nome_fantasia, razao_social, cep, endereco, numero, bairro, cidade, estado, contato, 
                cnpj_cpf, inscricao_estadual, email, site, usuario, senha, tipo_usuario, slogan, 
                path_img, ativo, data_cadastro, contribuinte , atividade
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ? , ? )`;

        const stmt = db.prepare(insertQuery);

        const result = stmt.run(
            usuario.nome_fantasia,
            usuario.razao_social,
            usuario.cep,
            usuario.endereco,
            usuario.numero,
            usuario.bairro,
            usuario.cidade,
            usuario.estado,
            usuario.contato,
            encode(usuario.cnpj_cpf), // Codifica o CNPJ/CPF antes de salvar
            usuario.inscricao_estadual || null,
            usuario.email,
            usuario.site || null,
            encode(usuario.usuario),
            usuario.senha,
            usuario.tipo_usuario,
            usuario.slogan || null,
            usuario.path_img || null,
            usuario.ativo ?? 1,
            usuario.contribuinte,
            usuario.atividade
        );

        return { insertId: result.lastInsertRowid };
    } catch (err) {
        console.error('Erro ao inserir usuário:', err.message);
        throw err;
    }
};


async function updateUsuario(dadosUser) {
    await ensureDBInitialized();

    try {
        const query = `
        UPDATE usuario
        SET 
            nome_fantasia = ?, 
            razao_social = ?, 
            cep = ?, 
            endereco = ?, 
            numero = ?, 
            bairro = ?, 
            cidade = ?, 
            estado = ?, 
            contato = ?, 
            cnpj_cpf = ?, 
            inscricao_estadual = ?, 
            email = ?, 
            site = ?, 
            usuario = ?, 
            senha = ?, 
            tipo_usuario = ?, 
            slogan = ?, 
            path_img = ?, 
            ativo = ?, 
            contribuinte = ?, 
            atividade = ?
        WHERE id = ?
        `;

        const result = db.prepare(query).run(
            dadosUser.nome_fantasia,
            dadosUser.razao_social,
            dadosUser.cep,
            dadosUser.endereco,
            dadosUser.numero,
            dadosUser.bairro,
            dadosUser.cidade,
            dadosUser.estado,
            dadosUser.contato,
            encode(dadosUser.cnpj_cpf), // Codifica o CNPJ/CPF antes de salvar
            dadosUser.inscricao_estadual || null,
            dadosUser.email,
            dadosUser.site || null,
            dadosUser.usuario,
            encode(dadosUser.senha),
            dadosUser.tipo_usuario,
            dadosUser.slogan || null,
            dadosUser.path_img || null,
            dadosUser.ativo ?? 1,
            dadosUser.contribuinte,
            dadosUser.atividade,
            dadosUser.id // O ID precisa estar no final para corresponder ao WHERE id = ?
        );

        console.log('Usuário atualizado com sucesso:', result.changes);
        return result.changes;

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        throw error;
    }
};

module.exports = {
    postNewUsuario,
    getUsuario,
    updateUsuario // Agora exporta corretamente a função updateUsuario
};
