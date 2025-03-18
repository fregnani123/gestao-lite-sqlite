//consverte Moeda valor fixo, sem interação usuário.
function converteMoeda(value) {

    // Converte para string com duas casas decimais
    value = value.toFixed(2);

    // Converte para formato brasileiro: substitui o ponto decimal por vírgula e adiciona pontos de milhares
    value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return value; // Retorna o valor formatado
}

// Formata valor com separador de milhar
function formatCurrency(value) {
    return value
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


function formatarNumero(valor) {
    // Remove todas as vírgulas (milhares) e troca a vírgula decimal por ponto
    let valorFormatado = valor.replace(/\./g, '');  // Remove os pontos de milhares
    valorFormatado = valorFormatado.replace(',', '.');  // Substitui a vírgula por ponto
    return parseFloat(valorFormatado);  // Converte para float
}
