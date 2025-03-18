document.querySelectorAll('li.menu-item-2, li.menu-item-3, li.menu-item-4, li.menu-item-5, li.menu-item-6, li.menu-item-7, li.menu-item-8, li.menu-item-9, li.menu-item-10')
    .forEach(element => element.style.display = 'none');


const linkID_11 = document.querySelector('.list-a11')

function estilizarLinkAtivo(linkID) {
    linkID.style.background = '#ffcc00'; // Cor de fundo
    linkID.style.textShadow = 'none'; // Sem sombra de texto
    linkID.style.color = 'black'; // Cor do texto
    linkID.style.borderBottom = '2px solid black'; // Borda inferior
  }
  estilizarLinkAtivo(linkID_11);



