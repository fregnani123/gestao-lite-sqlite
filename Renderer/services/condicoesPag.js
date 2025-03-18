const condicoesPgto = [
    { value: "Selecione", text: "Selecione:" },
    { value: "avista", text: "À Vista" },
    { value: "30dias", text: "30 Dias" },
    { value: "60dias", text: "60 Dias" },
    { value: "90dias", text: "90 Dias" },
    { value: "120dias", text: "120 Dias" },
    { value: "30_60", text: "30/60 Dias" },
    { value: "30_60_90", text: "30/60/90 Dias" },
    { value: "parcelado", text: "Parcelado" },
    { value: "semanal", text: "Semanal" },
    { value: "quinzenal", text: "Quinzenal" },
    { value: "mensal", text: "Mensal" },
    { value: "trimestral", text: "Trimestral" },
    { value: "semestral", text: "Semestral" },
    { value: "anual", text: "Anual" },
    { value: "sobnegociacao", text: "Sob Negociação" },
    { value: "antecipado", text: "Pagamento Antecipado" },
    { value: "entrada mais parcelas", text: "Entrada mais Parcelas" },
];

function preencherSelect(idSelect) {
    const select = document.getElementById(idSelect);
    if (!select) return;

    condicoesPgto.forEach(ocupacao => {
        const option = document.createElement("option");
        option.value = ocupacao.value;
        option.textContent = ocupacao.text;
        select.appendChild(option);
    });
}

preencherSelect('condicoesPgto')