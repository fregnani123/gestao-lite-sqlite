const MensagemSchema = new mongoose.Schema({
    remetente: {
      type: String, // Ex: "cliente" ou "suporte"
      required: true
    },
    mensagem: {
      type: String,
      required: true
    },
    data_envio: {
      type: Date,
      default: Date.now
    }
  });

  