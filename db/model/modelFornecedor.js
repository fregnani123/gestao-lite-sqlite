
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

async function getFornecedor() {
    await ensureDBInitialized();
    try {
        const rows = db.prepare('SELECT * FROM fornecedor').all();
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados SQLite ou executar a consulta de fornecedor:', error);
        throw error;
    }
};

async function postNewFornecedor(fornecedor) {
    await ensureDBInitialized();
    try {
        const existingFornecedor = db.prepare('SELECT fornecedor_id FROM fornecedor WHERE cnpj = ?').get(fornecedor.cnpj);
        if (existingFornecedor) {
            throw new Error('Um fornecedor com o mesmo CNPJ já existe.');
        }

        const insertQuery = `
            INSERT INTO fornecedor (
                cnpj, inscricao_estadual, razao_social, nome_fantasia,
                cep, cidade, bairro, uf, endereco,
                telefone, email, observacoes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = db.prepare(insertQuery).run(
            fornecedor.cnpj, fornecedor.inscricao_estadual || null, fornecedor.razao_social || null,
            fornecedor.nome_fantasia || null, fornecedor.cep || null, fornecedor.cidade || null,
            fornecedor.bairro || null, fornecedor.uf || null, fornecedor.endereco || null,
            fornecedor.telefone || null, fornecedor.email || null, fornecedor.observacoes || null
        );

        return { insertId: result.lastInsertRowid };
    } catch (error) {
        console.error('Erro ao inserir fornecedor:', error.message);
        throw { status: 400, message: error.message };
    }
};

async function updateFornecedor(dadosFornecedor) {
    await ensureDBInitialized();

    try {
        const query = `
        UPDATE fornecedor
        SET inscricao_estadual = ?, 
            razao_social = ?, 
            nome_fantasia = ?, 
            cep = ?, 
            cidade = ?, 
            bairro = ?, 
            uf = ?, 
            endereco = ?, 
            telefone = ?, 
            email = ?, 
            observacoes = ?
        WHERE cnpj = ?
    `;
    
    const result = db.prepare(query).run(
        dadosFornecedor.inscricao_estadual,
        dadosFornecedor.razao_social,
        dadosFornecedor.nome_fantasia,
        dadosFornecedor.cep,
        dadosFornecedor.cidade,
        dadosFornecedor.bairro,
        dadosFornecedor.uf,
        dadosFornecedor.endereco,
        dadosFornecedor.telefone,
        dadosFornecedor.email,
        dadosFornecedor.observacoes,  // Adicionando observações corretamente
        dadosFornecedor.cnpj
    );
    
        console.log('Fornecedor atualizado com sucesso:', result.changes);
        return result.changes;

    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error.message);
        throw error;
    }
}


module.exports = {
    getFornecedor, 
    postNewFornecedor,
    updateFornecedor
};
