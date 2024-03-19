import { ordenarProductosPorPrecio, ordenarProductosPorNombre } from './ordenarProductos.js';
import { pulsarProducto } from './pulsarProducto.js';

let paginaActual = 1;
let productos = [];
const elementosPorPagina = 6;
let ordenaSelect;
let numeroProductosFiltrados = 0;  // Inicializar el número de productos filtrados

const url = window.location.href.split("?");
const parametro = url[1].split("=");
const palabraURL = parametro[1]; //palabra por la que se filtran los productos

document.addEventListener('DOMContentLoaded', function () {
    inicializarPagina();
});

function inicializarPagina() {
    const marcaSelect = document.getElementById('marca-select');
    const materialSelect = document.getElementById('material-select');
    const precioInput = document.getElementById('precio');

    marcaSelect.addEventListener('change', function () {
        filtrarProductos(elementosPorPagina);
    });
    materialSelect.addEventListener('change', function () {
        filtrarProductos(elementosPorPagina);
    });
    precioInput.addEventListener('input', function () {
        filtrarProductos(elementosPorPagina);
    });

    ordenaSelect = document.getElementById('ordena-select');  //Eventos para Ordenar
    ordenaSelect.addEventListener('change', function(){
        ordenarProductos(elementosPorPagina)
    });

    document.querySelector('.contenedorTarjetas').addEventListener('click', pulsarProducto); //Evento para pulsarProducto

    // Fetch productos y filtrar
    fetch('./js/productos.json')
        .then(respuesta => respuesta.json())
        .then(data => {
            productos = data.filter(producto =>
                producto.nombre.toLowerCase().includes(palabraURL.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(palabraURL.toLowerCase()) ||
                producto.material.toLowerCase().includes(palabraURL.toLowerCase()) ||
                producto.marca.toLowerCase().includes(palabraURL.toLowerCase())
            );
            filtrarProductos(elementosPorPagina);
            generarPaginacion();
        })
        .catch(console.log);
}

function filtrarProductos(elementosPorPagina) {
    const marcaSelect = document.getElementById('marca-select');
    const materialSelect = document.getElementById('material-select');
    const precioInput = document.getElementById('precio');

    const marcaSeleccionada = marcaSelect.value;
    const materialSeleccionado = materialSelect.value;
    const precioMaximo = parseFloat(precioInput.value);

    // Filtrar productos en función de los valores de los filtros
    const productosFiltrados = productos.filter(p =>
        (marcaSeleccionada === '' || p.marca === marcaSeleccionada) &&
        (materialSeleccionado === '' || p.material === materialSeleccionado) &&
        (p.precio <= precioMaximo)
    );

    numeroProductosFiltrados = productosFiltrados.length;
    muestraProductos(productosFiltrados, elementosPorPagina);
    generarPaginacion();
}

function muestraProductos(productosImprimir, elementosPorPagina) {
    const contenedorProductos = document.getElementById('productos');

    // Calcular el índice de inicio de productos a imprimir para la página actual
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    // Obtener una porción del array de productos filtrados y ordenados
    const productosPagina = productosImprimir.slice(inicio, fin);

    // Crear el HTML de las tarjetas
    const tarjetasHTML = productosPagina.map(p => `
        <div class="tarjeta" data-idProducto="${p.id}">
            <img src="${p.foto}" class="tarjetaImgTop" alt="${p.nombre}">
            <div class="tarjetaCuerpo">
                <h5 class="tarjetaTitulo">${p.nombre}</h5>
                <p class="tarjetaPrecio">Precio: ${(p.precio *(1+p.iva)).toFixed(2)}€</p>
            </div>
        </div>
    `).join('');

    // Insertar las tarjetas en el contenedor de productos
    contenedorProductos.innerHTML = tarjetasHTML;
}

function generarPaginacion() {
    const contenedorPaginacion = document.getElementById('navPaginacion');
    const totalPaginas = getTotalPaginas();

    let paginacionHTML = `<nav><ul class="pagination justify-content-center">`;

    paginacionHTML += `<li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
                          <a class="page-link" href="#" tabindex="-1" data-pagina="${paginaActual - 1}">Anterior</a>
                       </li>`;

    for (let i = 1; i <= totalPaginas; i++) {
        paginacionHTML += `<li class="page-item ${paginaActual === i ? 'active' : ''}">
                             <a class="page-link" href="#" data-pagina="${i}">${i}</a>
                          </li>`;
    }

    paginacionHTML += `<li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
                          <a class="page-link" href="#" data-pagina="${paginaActual + 1}">Siguiente</a>
                       </li></ul></nav>`;

    contenedorPaginacion.innerHTML = paginacionHTML;

    // Agregar event listeners a los enlaces de la paginación
    const enlacesPaginacion = contenedorPaginacion.querySelectorAll('.page-link');
    
    enlacesPaginacion.forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            event.preventDefault();
            const nuevaPagina = parseInt(enlace.dataset.pagina);
            cambiarPagina(nuevaPagina);
        });
    });
}

function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1 && nuevaPagina <= getTotalPaginas()) {
        paginaActual = nuevaPagina;
        generarPaginacion();
        filtrarProductos(elementosPorPagina);
    }
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    });
}

function getTotalPaginas() {
    return Math.ceil(numeroProductosFiltrados / elementosPorPagina);
}

function ordenarProductos(elementosPorPagina) {
    // Obtener la opcion seleccionada
    const opcionSeleccionada = ordenaSelect.value;

    switch (opcionSeleccionada) {
        case 'pBajo':
            productos = ordenarProductosPorPrecio(productos, true);
            break;
        case 'pAlto':
            productos = ordenarProductosPorPrecio(productos, false);
            break;
        case 'nombreA':
            productos = ordenarProductosPorNombre(productos, true);
            break;
        case 'nombreZ':
            productos = ordenarProductosPorNombre(productos, false);
            break;
        default:
            break;
    }

    filtrarProductos(elementosPorPagina);
    generarPaginacion();
}