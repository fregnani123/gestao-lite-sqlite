const ramosDeAtividade = [
    { value: "", text: "Selecione:" },
    { value: "agropecuaria", text: "Agropecuária" },
    { value: "alimenticio", text: "Alimentício" },
    { value: "artesanato", text: "Artesanato" },
    { value: "automotivo", text: "Automotivo" },
    { value: "aviacao", text: "Aviação e Aeronáutica" },
    { value: "bebidas", text: "Bebidas" },
    { value: "biotecnologia", text: "Biotecnologia" },
    { value: "borracha", text: "Borracha e Plásticos" },
    { value: "calçados", text: "Calçados" },
    { value: "confeccao", text: "Confecção Têxtil" },
    { value: "construcao", text: "Construção Civil" },
    { value: "consultoria", text: "Consultoria e Assessoria" },
    { value: "cosmeticos", text: "Cosméticos e Perfumaria" },
    { value: "couro", text: "Couro e Curtume" },
    { value: "decoracao", text: "Decoração e Design" },
    { value: "educacao", text: "Educação e Treinamento" },
    { value: "eletrodomesticos", text: "Eletrodomésticos" },
    { value: "eletronicos", text: "Eletrônicos" },
    { value: "embalagens", text: "Embalagens" },
    { value: "energia", text: "Energia e Meio Ambiente" },
    { value: "esporte", text: "Esporte e Lazer" },
    { value: "esquadrias", text: "Esquadrias e Vidros" },
    { value: "escritorio", text: "Material de Escritório" },
    { value: "eventos", text: "Eventos e Festas" },
    { value: "farmaceutico", text: "Farmacêutico" },
    { value: "ferroviario", text: "Ferroviário e Transporte" },
    { value: "ferragens", text: "Ferragens e Ferramentas" },
    { value: "fiscal", text: "Assessoria Fiscal e Contábil" },
    { value: "grafica", text: "Gráfica e Comunicação Visual" },
    { value: "higiene", text: "Higiene e Limpeza" },
    { value: "hotelaria", text: "Hotelaria e Turismo" },
    { value: "informatica", text: "Informática e Tecnologia" },
    { value: "jardinagem", text: "Jardinagem e Paisagismo" },
    { value: "joalheria", text: "Joalheria e Bijuterias" },
    { value: "juridico", text: "Jurídico e Advocacia" },
    { value: "madeira", text: "Madeira e Móveis" },
    { value: "manutencao", text: "Manutenção Industrial" },
    { value: "mecanica", text: "Mecânica e Usinagem" },
    { value: "medico", text: "Médico e Hospitalar" },
    { value: "metalurgia", text: "Metalurgia e Siderurgia" },
    { value: "mineração", text: "Mineração" },
    { value: "moda", text: "Moda e Vestuário" },
    { value: "moveis", text: "Móveis e Decoração" },
    { value: "musica", text: "Música e Instrumentos Musicais" },
    { value: "optica", text: "Óptica e Oftalmologia" },
    { value: "papelaria", text: "Papelaria" },
    { value: "pecas_maquinas", text: "Peças e Máquinas Industriais" },
    { value: "petshop", text: "Pet Shop e Veterinária" },
    { value: "pesca", text: "Pesca e Náutica" },
    { value: "plastico", text: "Plásticos e Borrachas" },
    { value: "publicidade", text: "Publicidade e Marketing" },
    { value: "quimica", text: "Química e Petroquímica" },
    { value: "reciclagem", text: "Reciclagem e Sustentabilidade" },
    { value: "refrigeracao", text: "Refrigeração e Climatização" },
    { value: "restaurantes", text: "Restaurantes e Gastronomia" },
    { value: "saude", text: "Saúde e Bem-Estar" },
    { value: "seguros", text: "Seguros e Planos de Saúde" },
    { value: "seguranca", text: "Segurança e Vigilância" },
    { value: "servicos", text: "Prestação de Serviços" },
    { value: "siderurgia", text: "Siderurgia e Metalurgia" },
    { value: "supermercado", text: "Supermercado e Atacado" },
    { value: "tatuagem", text: "Tatuagem e Body Art" },
    { value: "tintas", text: "Tintas e Vernizes" },
    { value: "transportes", text: "Transportes e Logística" },
    { value: "veterinaria", text: "Veterinária e Animais" },
    { value: "vidracaria", text: "Vidraçaria e Esquadrias" },
];

function preencherSelect(idSelect) {
    const select = document.getElementById(idSelect);
    if (!select) return;

    ramosDeAtividade.forEach(ocupacao => {
        const option = document.createElement("option");
        option.value = ocupacao.value;
        option.textContent = ocupacao.text;
        select.appendChild(option);
    });
}

preencherSelect('atividade')