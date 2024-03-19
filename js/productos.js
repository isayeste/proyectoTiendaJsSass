import { pulsarProducto } from './pulsarProducto.js';
function muestraProductos (productos) {
    const contenedorProductos = document.getElementById('productosPromo');
    const productosNovedad = productos.filter(p => p.novedad === true);
    // Mapea cada producto a una tarjeta HTML
    const tarjetasHTML = productosNovedad.map(p => `
        <div class="tarjeta" data-idProducto="${p.id}">
            <img src="${p.foto}" class="tarjetaImgTop" alt="${p.nombre}">
            <div class="tarjetaCuerpo">
                <h5 class="tarjetaTitulo">${p.nombre}</h5>
                <p class="tarjetaPrecio">Precio: ${(p.precio *(1+p.iva)).toFixed(2)}€</p>
            </div>
        </div>
    `).join('');


    const contenedorProductosVendidos = document.getElementById('productosVendidos');
    const productosVendidos = productos.filter(p => p.numVentas >= 30);
    const tarjetasHTMLV = productosVendidos.map(p => `
        <div class="tarjeta" data-idProducto="${p.id}">
            <img src="${p.foto}" class="tarjetaImgTop" alt="${p.nombre}">
            <div class="tarjetaCuerpo">
                <h5 class="tarjetaTitulo">${p.nombre}</h5>
                <p class="tarjetaPrecio">Precio: ${(p.precio *(1+p.iva)).toFixed(2)}€</p>
            </div>
        </div>
    `).join('');

    // Inserta las tarjetas en los contenedore de productos
    contenedorProductos.innerHTML = tarjetasHTML;
    contenedorProductosVendidos.innerHTML = tarjetasHTMLV

};


fetch('./js/productos.json')
    .then(respuesta => respuesta.json())
    .then(muestraProductos)
    .catch(console.log);


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

document.getElementById('contenedorIndexProd').addEventListener('click', pulsarProducto);
    