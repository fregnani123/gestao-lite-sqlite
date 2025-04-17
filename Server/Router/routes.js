const express = require('express');
const Router = express.Router();
const controllersProduto = require('../Controller/produtos');
const controllersAtivacao = require('../Controller/ativacaoProduto');
const controllersGruposProduto = require('../Controller/grupo_subGrupo');
const controllersFornecedor = require('../Controller/fornecedor');
const controllersEstoque = require('../Controller/estoque');
const controllersUnidadeMedida = require('../Controller/unidade_medida');
const controllersVenda = require('../Controller/venda');
const controllersAlterValores= require('../Controller/AlterarValorProduto');
const controllersCliente = require('../Controller/cliente');
const controllersDesativar = require('../Controller/desativarProdutoSistema');
const controllersCrediario = require('../Controller/crediario');
const controllersAgenda = require('../Controller/agendamento');
const dbMongo = require('../../db/mongoDB');
const controllersUsuario = require('../Controller/usuario');

// Definições de rotas
Router.get('/getUsuario', controllersUsuario.getUsuario);
Router.get('/produtos', controllersProduto.getAllProducts);
Router.get('/grupos', controllersGruposProduto.getGrupo);
Router.get('/subGrupos', controllersGruposProduto.getSubGrupo);
Router.get('/fornecedor', controllersFornecedor.getFornecedor);
Router.get('/tamanhoLetras', controllersUnidadeMedida.getTamanhoLetras);
Router.get('/tamanhoNumeros', controllersUnidadeMedida.getTamanhoNumeros);
Router.get('/unidadeMassa', controllersUnidadeMedida.getUnidadeMassa);
Router.get('/medidaVolume', controllersUnidadeMedida.getMedidaVolume);
Router.get('/unidadeComprimento', controllersUnidadeMedida.getUnidadeComprimento);
Router.get('/unidadeEstoque', controllersEstoque.getUnidadeEstoque);
Router.get('/corProduto', controllersUnidadeMedida.getCorProduto);
Router.get('/produto/:codigoDeBarras', controllersProduto.findOneProduct);
Router.get('/getVenda', controllersVenda.getVenda);
Router.get('/getAgenda', controllersAgenda.getAgendamento);
Router.get('/getAtivacaoMysql', controllersAtivacao.getAtivacaoMysql);
Router.get('/getCliente/:cpf', controllersCliente.getCliente);
Router.get('/getHistoricoVendas', controllersVenda.getHistoricoDeVenda);
Router.get('/getCrediario/:cpf', controllersCrediario.getCrediario);
Router.get('/getCrediarioVenda/:venda_id', controllersCrediario.getCrediarioNumeroPedido);
Router.get('/getCrediariosMesVigente', controllersCrediario.getCrediariosMesVigente);
Router.get('/getCrediariosVencidos', controllersCrediario.getCrediariosVencidos);
Router.get('/getTaxas', controllersCrediario.getTaxas);
Router.get('/getVendaPorNumeroPedido/:numero_pedido', controllersVenda.getVendasPorNumeroVenda);

Router.post('/postNewProduto', controllersProduto.postNewProductWithImage);
Router.post('/newGrupo', controllersGruposProduto.postNewProductGrupo);
Router.post('/newSubGrupo', controllersGruposProduto.postNewProductSubGrupo);
Router.post('/newFornecedor', controllersFornecedor.postNewFornecedor);
Router.post('/postControleEstoque', controllersEstoque.postNewControleEstoque);
Router.post('/postVenda', controllersVenda.postNewVenda);
Router.post('/postNewCor', controllersUnidadeMedida.postNewProductCor);
Router.post('/postNewCrediario', controllersCrediario.postNewCrediario);
Router.post('/postNewAgendamento', controllersAgenda.postNewAgendamento);
Router.post('/upload-imagem', controllersProduto.UploadImagem);
Router.post('/postNewCliente', controllersCliente.postNewCliente);
Router.post('/insertAtivacao', controllersAtivacao.postAtivacao);
Router.post('/postNewUsuario', controllersUsuario.postNewUsuario);

Router.patch('/UpdateAtivacao', controllersAtivacao.UpdateAtivacao);
Router.patch('/UpdateEstoque', controllersEstoque.UpdateEstoque);
Router.patch('/UpdateValores', controllersAlterValores.UpdateValores);
Router.patch('/UpdateProduto', controllersProduto.UpdateProdutoAlterar);
Router.patch('/UpdateDesativar', controllersDesativar.desativarProdutoSistema);
Router.patch('/UpdateAgendamento', controllersAgenda.updateAgendamento);
Router.patch('/UpdateFornecedor', controllersFornecedor.UpdateFornecedor);
Router.patch('/updateCrediario', controllersCrediario.updateCrediario);
Router.patch('/updateCliente', controllersCliente.updateCliente);
Router.patch('/updateCredito', controllersCliente.updateCreditoCliente);
Router.patch('/UpdateUsuario', controllersUsuario.updateUsuario);
Router.patch('/updateTaxas', controllersCrediario.updateTaxas);

// Rota para obter licença
Router.get('/getLicenca/:userID/:serialKey', dbMongo.getLicenca);
Router.get('/getLicenca/:remetente', dbMongo.getMensagensPorRemetente);
Router.post('/postmensagem', dbMongo.postMensagem);
Router.post('/postmensagemChat', dbMongo.postMensagemChat);

module.exports = Router;
