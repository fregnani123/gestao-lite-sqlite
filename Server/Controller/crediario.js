const path = require('path');
const {
    registrarCrediario,
    getCrediarioByCPF,
    updateCrediario,
    getCrediariosMesVigente,
    getCrediariosVencidos,
} = require(path.join(__dirname, '../../db/model/modelCrediario'));

const controllersCrediario = {

    postNewCrediario: async (req, res) => {
        try {
            const { venda_id, cliente_id, valorTotal, numParcelas, dataPrimeiroVencimento } = req.body;
    
            // Verificar se algum campo importante está vazio ou faltando
            if (!venda_id || !cliente_id || !valorTotal || !numParcelas || !dataPrimeiroVencimento) {
                console.log('Dados do crediário incompletos ou ausentes:', {
                    venda_id,
                    cliente_id,
                    valorTotal,
                    numParcelas,
                    dataPrimeiroVencimento
                });
                // Mesmo sem erro, continuar sem enviar a resposta, pois não há dados suficientes
                return res.status(200).json({
                    message: 'Crediário não inserido por dados incompletos, mas continuando o processo.'
                });
            }
    
            // Se todos os dados estiverem presentes, prosseguir com o registro
            const insertedRows = await registrarCrediario(
                venda_id,
                cliente_id,
                valorTotal,
                numParcelas,
                dataPrimeiroVencimento
            );
    
            if (insertedRows > 0) {
                res.json({
                    message: 'Crediário inserido com sucesso!',
                    parcelas_inseridas: insertedRows
                });
            } else {
                res.status(500).json({ error: 'Nenhum crediário foi inserido!' });
            }
        } catch (error) {
            console.error('Erro ao inserir o Crediário:', error);
    
            if (error.message) {
                return res.status(400).json({ error: error.message });
            }
    
            res.status(500).json({ error: 'Erro ao inserir o Crediário.' });
        }
    },
    
    getCrediario: async (req, res) => {
        const { cpf } = req.params;  // O CPF vem como parâmetro de URL
        
        if (!cpf) {
            return res.status(400).json({ error: 'CPF não informado.' });
        }
    
        try {
            // Passa o CPF para a função de consulta
            const crediario = await getCrediarioByCPF(cpf);  
            if (crediario.length === 0) {
                return res.status(404).json({ error: 'Nenhum crediário encontrado para este CPF.' });
            }
            res.json(crediario);
        } catch (error) {
            console.error('Erro ao buscar Crediário:', error);
            res.status(500).json({ error: 'Erro ao buscar Crediário' });
        }
    },
    
    getCrediariosMesVigente: async (req, res) => {
        try {
            const allCrediario = await  getCrediariosMesVigente();  
            res.json(allCrediario);
        } catch (error) {
            console.error('Erro ao buscar Crediários:', error);
            res.status(500).json({ error: 'Erro ao buscar Crediários' });
        }
    },
    getCrediariosVencidos: async (req, res) => {
        try {
            const allCrediario = await  getCrediariosVencidos();  
            res.json(allCrediario);
        } catch (error) {
            console.error('Erro ao buscar Crediários vencidos:', error);
            res.status(500).json({ error: 'Erro ao buscar Crediários vencidos' });
        }
    },

    updateCrediario : async (req, res) => {
        try {
            const baixaParcela = req.body;
            await updateCrediario(baixaParcela); 
            res.json({
                message: 'Parcela baixada do Crediario com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao alterar Parcela crediário:', error);
            res.status(500).json({ error: 'Erro ao alterar UpdateEstoque.' });
        }
    },
    
}

module.exports = controllersCrediario;