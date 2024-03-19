import { agregarAlCarrito, eliminarDelCarrito, quitarUnaUnidadProducto, obtenerCarritoDelLocalStorage } from "./cestaCompra.js";
import { darFeedbackCarrito} from "./feedbackCarrito.js";
let precioTotal;
let numProductos;

function rellenarInfoCarrito(){
  numProductos = 0;
  precioTotal = 0;
  const carritoActual = obtenerCarritoDelLocalStorage();
  for(let i = 0; i<carritoActual.length; i++){
    const elemento = carritoActual[i];
    const precio = elemento.precio;
    const iva = elemento.iva +1;
    const cantidad = elemento.cantidad;
    numProductos += cantidad; 
    const precioProductosIguales = (precio*iva) * cantidad;
    precioTotal += precioProductosIguales;
  }
  
  const nProd = document.getElementById('nProd');
  const impTotal = document.getElementById('impTotal');

  const precioImprimir = precioTotal.toFixed(2);
  nProd.innerHTML = numProductos;
  impTotal.innerHTML = precioImprimir + "€";
  
}

function imprimirCarritoVacio(){
  const parrafo = document.getElementById('textoVacio');
  parrafo.innerHTML= "Tu cesta de la compra está vacía";

  const nProd = document.getElementById('nProd');
  const impTotal = document.getElementById('impTotal');
  nProd.innerHTML = "0";
  impTotal.innerHTML = "0€";

  const listadoProductos = document.getElementById('cajitas');
  listadoProductos.innerHTML = '';

}

function decrementar (id){
  // Decrementar la cantidad hasta llegar a 0
  const carritoActual = obtenerCarritoDelLocalStorage();
  const productoSeleccionado = carritoActual.find(p=>p.id==id);
  const cantidad = productoSeleccionado.cantidad;
  if(cantidad>1){
    quitarUnaUnidadProducto(id.toString());
  }
  else{
    // 0 -> eliminar el producto del carrito
    eliminarDelCarrito(id.toString());
  }
  
  setTimeout(()=>{
    imprimirCarrito();
    darFeedbackCarrito();
    
  }, 100);
  
}
function incrementar (id){
  fetch('./js/productos.json')
    .then(respuesta =>respuesta.json())
    .then(datos =>{
      const producto = datos.find(p=>p.id ===id);
      const stockActual = producto.cantStock;
      if (stockActual>0){
        //Añadir mientras haya stock
        agregarAlCarrito(id.toString());
        // Para darle tiempo a que se actualice la cantidad
        setTimeout(()=>{
          imprimirCarrito();
          darFeedbackCarrito();
        }, 100);

      }
      
    })
    .catch(console.error())

}

// Añadir la funcion al objeto windows -> me lo ahorraría con un addEventListener
window.incrementar = incrementar;
window.decrementar = decrementar;

function imprimirCarrito(){
  const listadoProductos = document.getElementById('cajitas');

  // Obtener info del carrito actual
  const carritoActual = obtenerCarritoDelLocalStorage();

      if(carritoActual.length>0){
          // crear un card por cada articulo
          const tarjetasHTML = carritoActual.map(p=> `
              <div class="cajita card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${p.foto}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${p.nombre}</h5>
                      <p class="card-text">${((p.precio)+(p.iva*p.precio)).toFixed(2)}€ cada uno</p>
                      <p class="card-text">${(p.precio)*p.cantidad}€ + ${((p.iva*p.precio)*p.cantidad).toFixed(2)} IVA</p>
                      <h5 class="card-text">Total: ${((p.precio)*p.cantidad + ((p.iva*p.precio)*p.cantidad)).toFixed(2)}€</h5>
                      <div>
                        <button class="boton" onclick="decrementar(${p.id})">-</button>
                        <input type="number" readonly value ="${p.cantidad}">
                        <button class="boton" onclick="incrementar(${p.id})">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          `).join('');
           
          listadoProductos.innerHTML = tarjetasHTML;
          rellenarInfoCarrito();

      }
      else{
          // La cesta está vacía
          imprimirCarritoVacio();
      }
  
  
  

}

const claveExistenteEnLocal = localStorage.getItem('carrito');
if (claveExistenteEnLocal===null || claveExistenteEnLocal ===undefined){
  imprimirCarritoVacio();
}
else{
  imprimirCarrito();
}


document.getElementById('botonPedido').addEventListener('submit', function(event) {
    // Si la cesta tiene productos
    const carritoActual = obtenerCarritoDelLocalStorage();
    if(Array.isArray(carritoActual)&& carritoActual.length>0){
      event.preventDefault();
      window.location.href = 'formularioPedido.html?numProd=' +numProductos + '?pTotal=' + precioTotal;
    }

  });

    
