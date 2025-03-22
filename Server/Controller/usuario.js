const path = require('path');
const {
    postNewUsuario
} = require(path.join(__dirname, '../../db/model/modelUsuario'));


const controllersUsuario = {

    //    getCorProduto: async (req, res) => {
    //        try {
    //            const corProduto = await getCorProduto();
    //            res.json(corProduto);
    //        } catch (error) {
    //            console.error('Erro ao buscar Cor do Produto:', error);
    //            res.status(500).json({ error: 'Erro ao buscar Cor do Produto' });
    //        }
    //    },
 
    postNewUsuario: async (req, res) => {
         try {
             const usuario = req.body;
             const newUsuario = await postNewUsuario(usuario);
 
             res.json({
                 message: 'usúario inserido com sucesso!',
                 id: newUsuario
             });
         } catch (error) {
             console.error('Erro ao inserir novo usúario:', error);
             res.status(500).json({ error: 'Erro ao inserir novo usúario.' });
         }
     },
 
 }
 
  
 
 module.exports = controllersUsuario;