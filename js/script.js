document.getElementById('hamburguesa').addEventListener('click', function () {
    let categorias = document.querySelector('.categorias');
    categorias.classList.toggle('active');

    // Bajar el main con el menu hamburguesa
    const mainContent = document.querySelector('main');
    const carrusel = document.querySelector('.carrusel');
    const marginTopAbajo = 250;
    if(mainContent.style.marginTop === `${marginTopAbajo}px`){
        mainContent.style.marginTop = '0';
    }
    else{
        mainContent.style.marginTop = `${marginTopAbajo}px`;
        carrusel.style.marginTop = '20px';
    }
});
