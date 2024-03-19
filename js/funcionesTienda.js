//filtrar, paginar y llama a ordenar
import { ordenarProductosPorPrecio, ordenarProductosPorNombre } from './ordenarProductos.js';
import { pulsarProducto } from './pulsarProducto.js';

let paginaActual = 1;
let productos = []; //productos disponibles en una determinada -> página, filtros, ordenar
const elementosPorPagina = 6;
let categoria;
let ordenaSelect;
let numeroProductosFiltrados = 0;

export function inicializarPagina(cat) {
    categoria = cat;
    const marcaSelect = document.getElementById('marca-select'); //Eventos para Filtrar
    const materialSelect = document.getElementById('material-select');
    const precioInput = document.getElementById('precio');
    marcaSelect.addEventListener('change', function(){
        filtrarProductos(elementosPorPagina, categoria)
    });
    materialSelect.addEventListener('change', function(){
        filtrarProductos(elementosPorPagina, categoria)
    });
    precioInput.addEventListener('input', function(){
        filtrarProductos(elementosPorPagina, categoria)
    });

    ordenaSelect = document.getElementById('ordena-select');  //Eventos para Ordenar
    ordenaSelect.addEventListener('change', function(){
        ordenarProductos(elementosPorPagina, categoria)
    });

    document.querySelector('.contenedorTarjetas').addEventListener('click', pulsarProducto); //Evento para pulsarProducto

    // Lectura json
    fetch('./js/productos.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            productos = datos.filter(p => p.categoria === categoria);
            filtrarProductos(elementosPorPagina, categoria);
        })
        .catch(console.log);
}

function filtrarProductos(elementosPorPagina, categoria) {

    const marcaSelect = document.getElementById('marca-select');
    const materialSelect = document.getElementById('material-select');
    const precioInput = document.getElementById('precio');

    const marcaSeleccionada = marcaSelect.value;
    const materialSeleccionado = materialSelect.value;
    const precioMaximo = parseFloat(precioInput.value);

    const productosFiltrados = productos.filter(p =>
        p.categoria === categoria &&
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
    // Cálculo de elementos que hay que mostrar
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    // Obtener una porción del array -> productos diltrados y ordenados de esa pagina
    const productosPagina = productosImprimir.slice(inicio, fin);
    const tarjetasHTML = productosPagina.map(p => `
        <div class="tarjeta" data-idProducto="${p.id}">
            <img src="${p.foto}" class="tarjetaImgTop" alt="${p.nombre}">
            <div class="tarjetaCuerpo">
                <h5 class="tarjetaTitulo">${p.nombre}</h5>
                <p class="tarjetaPrecio">Precio: ${(p.precio *(1+p.iva)).toFixed(2)}€</p>
            </div>
        </div>
    `).join('');

    contenedorProductos.innerHTML = tarjetasHTML;
}

function ordenarProductos(elementosPorPagina, categoria) {
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

    filtrarProductos(elementosPorPagina, categoria);
    generarPaginacion();
}

function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1 && nuevaPagina <= getTotalPaginas()) {
        paginaActual = nuevaPagina;
        generarPaginacion();
        filtrarProductos(elementosPorPagina, categoria);
    }
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    });
}

function getTotalPaginas() {
    return Math.ceil(numeroProductosFiltrados / elementosPorPagina);
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

    // Ahora, agregamos eventlisteners a los enlaces de la paginación
    const enlacesPaginacion = contenedorPaginacion.querySelectorAll('.page-link');
    
    enlacesPaginacion.forEach(enlace => {
        enlace.addEventListener('click', function(event) {
            event.preventDefault();
            const nuevaPagina = parseInt(enlace.dataset.pagina);
            cambiarPagina(nuevaPagina);
        });
    });
}


