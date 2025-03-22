const path = require('path');
const Database = require('better-sqlite3'); 
const { app } = require('electron');

const { ensureDBInitialized } = require(path.join(__dirname, './ensureDBInitialized'));

// Obtém o caminho dinâmico para o diretório %APPDATA% e cria uma subpasta para o aplicativo
const appDataPath = app.getPath('appData');
const appDBPath = path.join(appDataPath, 'electronmysql','db'); // Subpasta do aplicativo

// Caminho completo para o banco de dados
const dbPath = path.join(appDBPath, 'gestaolite.db');

// Inicializa o banco de dados
const db = new Database(dbPath, { verbose: console.log });

// Habilitar as chaves estrangeiras
db.pragma('foreign_keys = ON');
console.log('Chaves estrangeiras ativadas.');


async function postNewUsuario(usuario) {
    await ensureDBInitialized();
    try {
        const insertQuery = 
        `INSERT INTO usuario (
            nome_fantasia, razao_social, cep, endereco, numero, bairro, cidade, estado, contato, 
            cnpj_cpf, inscricao_estadual, email, site, usuario, senha, tipo_usuario, slogan, 
            path_img, ativo, data_cadastro
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;
    
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
        usuario.cnpj_cpf || null,
        usuario.inscricao_estadual || null,
        usuario.email,
        usuario.site || null,
        usuario.usuario,
        usuario.senha,
        usuario.tipo_usuario,
        usuario.slogan || null,
        usuario.path_img || null,
        usuario.ativo ?? 1
    );

        return { insertId: result.lastInsertRowid };
    } catch (err) {
        console.error('Erro ao inserir usuario:', err);
        throw err;
    }
}

module.exports = {
    postNewUsuario,
};
