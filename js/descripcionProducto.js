import { agregarAlCarrito } from "./cestaCompra.js";
import { darFeedbackCarrito} from "./feedbackCarrito.js";
const muestraProducto = (producto) => {
    const contenedorProductos = document.getElementById('contenedorArticulo');
    const url = window.location.href.split("?");
    const parametro = url[1].split(":");
    const ID = parseInt(parametro[1]);

    const productoImprimir = producto.filter(p => p.id === ID);
    
    // Imprimir en tarjeta. Join -> de array a cadena
    const tarjetasHTML = productoImprimir.map(p => `
    <div class="fotoDescripProd">
        <div id="fGrande" class="fotoGrande">
            <img class="fotoUno" src="${p.foto}" alt="${p.nombre}">
        </div>
        <div class="fotosPequenias">
            <img class="fotillo" id="fotoUno" data-foto="2" src="${p.foto2}" alt="${p.nombre}">
            <img class="fotillo" id="fotoDos" data-foto="3" src="${p.foto3}" alt="${p.nombre}">
        </div>
    </div>
    <div class="textDescripProd">
        <div class="texto">
            <h1>${p.nombre}</h1>
            <h3>${p.precio}€</h3>
            <h5>+${(p.iva*p.precio).toFixed(2)} IVA</h5>
            <h2>TOTAL: ${(p.precio + (p.iva*p.precio)).toFixed(2)}€</h2>
            <p>${p.descripcion}</p>
            <div>
                <input type="button" id="${p.id}" value="AÑADIR A LA CESTA">
            </div>
        </div>
        
        
    </div>
    </div> `).join('');

    // Inserta las tarjetas en el contenedor de productos
    contenedorProductos.innerHTML = tarjetasHTML;

    document.querySelectorAll('.textDescripProd input[type="button"]').forEach(boton => {
        boton.addEventListener('click', function() {
            agregarAlCarrito(this.id);
            setTimeout(()=>{
                darFeedbackCarrito();
            },100);
            
        });
    });

    document.querySelector('.fotosPequenias').addEventListener('click', cambiarImagen);
};

fetch('./js/productos.json')
    .then(respuesta => respuesta.json())
    .then(muestraProducto)
    .catch(console.log);


    


function cambiarImagen(e){
    if (e.target.tagName === 'IMG') {
        // Intercambiar las URLs
        const urlMiniatura = e.target.src;
        e.target.src = document.getElementById('fGrande').querySelector('img').src;
        document.getElementById('fGrande').querySelector('img').src = urlMiniatura;
      }
}


    
