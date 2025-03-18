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


async function getAllProdutos() {
    await ensureDBInitialized();

    try {
        // Adiciona uma cláusula WHERE para filtrar produtos ativos
        const rows = db.prepare('SELECT * FROM produto WHERE produto_ativado = 1').all();
        return rows;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados SQLite ou executar a consulta:', error);
        throw error;
    }
}


async function findProductByBarcode(barcode) {
    await ensureDBInitialized();
    try {
        const rows = db.prepare('SELECT * FROM produto WHERE codigo_ean = ?').all(barcode);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}

async function postNewProduct(produto) {
    await ensureDBInitialized();
    try {
        const existingEAN = db.prepare('SELECT produto_id FROM produto WHERE codigo_ean = ?').get(produto.codigo_ean);
        if (existingEAN) {
            throw new Error('Um produto com o mesmo código EAN já existe.');
        }

        const existingImage = db.prepare('SELECT produto_id FROM produto WHERE caminho_img_produto = ?').get(produto.caminho_img_produto);
        if (existingImage) {
            throw new Error('Já existe um produto com o mesmo caminho de imagem.');
        }

        const insertQuery = `
            INSERT INTO produto (
                codigo_ean, nome_produto, grupo_id, sub_grupo_id, tamanho_letras_id, tamanho_num_id,
                unidade_massa_qtd, unidade_massa_id, medida_volume_qtd, medida_volume_id,
                unidade_comprimento_qtd, unidade_comprimento_id, cor_produto_id, quantidade_estoque,
                quantidade_vendido, observacoes, preco_compra, markup, preco_venda, unidade_estoque_id,
                fornecedor_id, caminho_img_produto
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = db.prepare(insertQuery).run(
            produto.codigo_ean, produto.nome_produto, produto.grupo_id || null, produto.sub_grupo_id || null,
            produto.tamanho_letras_id || null, produto.tamanho_num_id || null, produto.unidade_massa_qtd || 0,
            produto.unidade_massa_id || null, produto.medida_volume_qtd || 0, produto.medida_volume_id || null,
            produto.unidade_comprimento_qtd || 0, produto.unidade_comprimento_id || null, produto.cor_produto_id || null,
            produto.quantidade_estoque || 0, produto.quantidade_vendido || 0, produto.observacoes || '',
            produto.preco_compra || 0, produto.markup || 0, produto.preco_venda || 0,
            produto.unidade_estoque_id || null, produto.fornecedor_id || null, produto.caminho_img_produto || ''
        );

        return { insertId: result.lastInsertRowid };
    } catch (error) {
        console.error('Erro ao inserir o produto:', error.message);
        throw error;
    }
}


async function UpdateProduto(produto) {
    await ensureDBInitialized();
    try {
        const query = `
            UPDATE produto
            SET 
                grupo_id = ?,
                sub_grupo_id = ?,
                nome_produto = ?,
                tamanho_letras_id = ?,
                tamanho_num_id = ?,
                unidade_massa_id = ?,
                medida_volume_id = ?,
                unidade_comprimento_id = ?,
                quantidade_estoque = ?,
                quantidade_vendido = ?,
                preco_compra = ?,
                markup = ?,
                preco_venda = ?,
                unidade_estoque_id = ?,
                unidade_massa_qtd = ?,
                medida_volume_qtd = ?,
                unidade_comprimento_qtd = ?,
                fornecedor_id = ?,
                cor_produto_id = ?,
                observacoes = ?,
                caminho_img_produto = ?
            WHERE codigo_ean = ?
        `;

        // Substituir valores vazios por NULL
        const parametros = [
            produto.grupo_id || null,
            produto.sub_grupo_id || null,
            produto.nome_produto || null,
            produto.tamanho_letras_id || null,
            produto.tamanho_num_id || null,
            produto.unidade_massa_id || null,
            produto.medida_volume_id || null,
            produto.unidade_comprimento_id || null,
            produto.quantidade_estoque || 0,
            produto.quantidade_vendido || 0,
            produto.preco_compra || 0,
            produto.markup || 0,
            produto.preco_venda || 0,
            produto.unidade_estoque_id || null,
            produto.unidade_massa_qtd || 0,
            produto.medida_volume_qtd || 0,
            produto.unidade_comprimento_qtd || 0,
            produto.fornecedor_id || null,
            produto.cor_produto_id || null,
            produto.observacoes || null,
            (typeof produto.caminho_img_produto === 'string' && produto.caminho_img_produto) ? produto.caminho_img_produto : null,
            produto.codigo_ean || null
        ];

        // Adicionando logs para cada parâmetro
        console.log('Produto:', produto);
        
        parametros.forEach((param, index) => {
            console.log(`Parâmetro ${index + 1}:`, param);
        });

        // Executando a consulta e definindo a variável result
        const result = db.prepare(query).run(...parametros);

        console.log('Resultado da atualização:', result);
    } catch (error) {
        console.error('Erro ao atualizar MySQL:', error.message);
        throw error;
    }
}

module.exports = {
    findProductByBarcode,
    postNewProduct,
    UpdateProduto,
    getAllProdutos
};
