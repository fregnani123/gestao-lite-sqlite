const ramosDeAtividade = [
    { value: "Selecione:", text: "Selecione:" },
    { value: "Agropecuária", text: "Agropecuária" },
    { value: "Alimentício", text: "Alimentício" },
    { value: "Artesanato", text: "Artesanato" },
    { value: "Automotivo", text: "Automotivo" },
    { value: "Aviação e Aeronáutica", text: "Aviação e Aeronáutica" },
    { value: "Bebidas", text: "Bebidas" },
    { value: "Biotecnologia", text: "Biotecnologia" },
    { value: "Borracha e Plásticos", text: "Borracha e Plásticos" },
    { value: "Calçados", text: "Calçados" },
    { value: "Confecção Têxtil", text: "Confecção Têxtil" },
    { value: "Construção Civil", text: "Construção Civil" },
    { value: "Consultoria e Assessoria", text: "Consultoria e Assessoria" },
    { value: "Cosméticos e Perfumaria", text: "Cosméticos e Perfumaria" },
    { value: "Couro e Curtume", text: "Couro e Curtume" },
    { value: "Decoração e Design", text: "Decoração e Design" },
    { value: "Educação e Treinamento", text: "Educação e Treinamento" },
    { value: "Eletrodomésticos", text: "Eletrodomésticos" },
    { value: "Eletrônicos", text: "Eletrônicos" },
    { value: "Embalagens", text: "Embalagens" },
    { value: "Energia e Meio Ambiente", text: "Energia e Meio Ambiente" },
    { value: "Esporte e Lazer", text: "Esporte e Lazer" },
    { value: "Esquadrias e Vidros", text: "Esquadrias e Vidros" },
    { value: "Material de Escritório", text: "Material de Escritório" },
    { value: "Eventos e Festas", text: "Eventos e Festas" },
    { value: "Farmacêutico", text: "Farmacêutico" },
    { value: "Ferroviário e Transporte", text: "Ferroviário e Transporte" },
    { value: "Ferragens e Ferramentas", text: "Ferragens e Ferramentas" },
    { value: "Assessoria Fiscal e Contábil", text: "Assessoria Fiscal e Contábil" },
    { value: "Gráfica e Comunicação Visual", text: "Gráfica e Comunicação Visual" },
    { value: "Higiene e Limpeza", text: "Higiene e Limpeza" },
    { value: "Hotelaria e Turismo", text: "Hotelaria e Turismo" },
    { value: "Informática e Tecnologia", text: "Informática e Tecnologia" },
    { value: "Informática e Impressões", text: "Informática e Impressões" },
    { value: "Jardinagem e Paisagismo", text: "Jardinagem e Paisagismo" },
    { value: "Joalheria e Bijuterias", text: "Joalheria e Bijuterias" },
    { value: "Jurídico e Advocacia", text: "Jurídico e Advocacia" },
    { value: "Madeira e Móveis", text: "Madeira e Móveis" },
    { value: "Manutenção Industrial", text: "Manutenção Industrial" },
    { value: "Mecânica e Usinagem", text: "Mecânica e Usinagem" },
    { value: "Médico e Hospitalar", text: "Médico e Hospitalar" },
    { value: "Metalurgia e Siderurgia", text: "Metalurgia e Siderurgia" },
    { value: "Mineração", text: "Mineração" },
    { value: "Moda e Vestuário", text: "Moda e Vestuário" },
    { value: "Móveis e Decoração", text: "Móveis e Decoração" },
    { value: "Música e Instrumentos Musicais", text: "Música e Instrumentos Musicais" },
    { value: "Óptica e Oftalmologia", text: "Óptica e Oftalmologia" },
    { value: "Papelaria", text: "Papelaria" },
    { value: "Peças e Máquinas Industriais", text: "Peças e Máquinas Industriais" },
    { value: "Pet Shop e Veterinária", text: "Pet Shop e Veterinária" },
    { value: "Pesca e Náutica", text: "Pesca e Náutica" },
    { value: "Plásticos e Borrachas", text: "Plásticos e Borrachas" },
    { value: "Publicidade e Marketing", text: "Publicidade e Marketing" },
    { value: "Química e Petroquímica", text: "Química e Petroquímica" },
    { value: "Reciclagem e Sustentabilidade", text: "Reciclagem e Sustentabilidade" },
    { value: "Refrigeração e Climatização", text: "Refrigeração e Climatização" },
    { value: "Restaurantes e Gastronomia", text: "Restaurantes e Gastronomia" },
    { value: "Saúde e Bem-Estar", text: "Saúde e Bem-Estar" },
    { value: "Seguros e Planos de Saúde", text: "Seguros e Planos de Saúde" },
    { value: "Segurança e Vigilância", text: "Segurança e Vigilância" },
    { value: "Prestação de Serviços", text: "Prestação de Serviços" },
    { value: "Supermercado e Atacado", text: "Supermercado e Atacado" },
    { value: "Tatuagem e Body Art", text: "Tatuagem e Body Art" },
    { value: "Tintas e Vernizes", text: "Tintas e Vernizes" },
    { value: "Transportes e Logística", text: "Transportes e Logística" },
    { value: "Veterinária e Animais", text: "Veterinária e Animais" },
    { value: "Vidraçaria e Esquadrias", text: "Vidraçaria e Esquadrias" }
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