const express = require('express');
const path = require('path');
const Routes = require(path.join(__dirname, '../Server/Router/routes'));
const { conectarMongoDB } = require(path.join(__dirname, '../db/mongoDB'));
const cors = require('cors');
const { getAllProdutos } = require(path.join(__dirname, '../db/model/modelProduto'));
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });


const serverApp = express();
const PORT = process.env.PORT || 3000;

serverApp.use(express.json());
serverApp.use(cors());
serverApp.use(Routes);

const startServer = async () => {
    try {
        // Inicializa o MongoDB
        await conectarMongoDB();

        // Verifica a conexão com o MySQL
        await getAllProdutos();
        console.log('Servidor Sqlite-Better conectado com sucesso!');

        // Inicia o servidor Express
        serverApp.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao conectar ao sqlite-better ou MongoDB:', error);
    }
};


module.exports = startServer;
