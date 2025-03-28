const path = require('path');
const {
    postNewUsuario,
    getUsuario
} = require(path.join(__dirname, '../../db/model/modelUsuario'));


const controllersUsuario = {

    getUsuario: async (req, res) => {
           try {
               const usuario = await getUsuario();
               res.json(usuario);
           } catch (error) {
               console.error('Erro ao buscar usuário:', error);
               res.status(500).json({ error: 'Erro ao buscar usuário:' });
           }
       },
 
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