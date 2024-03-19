document.getElementById('formularioBusqueda').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener el valor del campo de texto
    const palabra = document.getElementById('campoBusqueda').value;
    const p = palabra.toLowerCase();
    switch(p){
        case "anillo":
        case "anillos": window.location.href = 'anillos.html';
        break;
        case "pulsera":
        case "pulseras": window.location.href = 'pulseras.html';
        break;
        case "pendiente":
        case "pendientes": window.location.href = 'pendientes.html';
        break;
        case "collar":
        case "collares": 
        case "colgante":
        case "colgantes":
        case "cadena":
        case "cadenas":  window.location.href = 'collares.html';
        break;
        default: window.location.href = 'verTodo.html?p=' + palabra;
    }
});

