export function obtenerCarritoDelLocalStorage() {
    const carritoJSON = localStorage.getItem('carrito');
    return carritoJSON ? JSON.parse(carritoJSON) : null;
}

export function agregarAlCarrito(idProducto){
    // Lista de productos del json -> buscar el id del producto a añadir
    fetch('./js/productos.json')
        .then(respuesta => respuesta.json())
        .then(productos =>{
            const productoSeleccionado = productos.find(producto => producto.id== idProducto);
            // Obtener info para guardarla en el localstorage
            const nombre = productoSeleccionado.nombre;
            const precio = productoSeleccionado.precio;
            const foto = productoSeleccionado.foto;
            const stock = productoSeleccionado.cantStock;
            const iva = productoSeleccionado.iva;
            
            const carritoActual = obtenerCarritoDelLocalStorage();

            // Verificar que haya stock
            if(stock>0){
                //Ver si hay carrito en el localStorage
                if (carritoActual && carritoActual.length > 0) {
                    // ver si el producto está en el carrito para aumentar uno a la cantidad
                    const productoEnCarrito = carritoActual.find(item => item.id === idProducto);
                    if(productoEnCarrito){
                        productoEnCarrito.cantidad++;
                    }else{
                        // Si no está -> añadir el producto al carrito
                        carritoActual.push({
                            id: idProducto,
                            nombre: nombre,
                            foto: foto,
                            precio: precio,
                            cantidad: 1, 
                            iva: iva
                        });
                    }
                    localStorage.setItem('carrito', JSON.stringify(carritoActual));   

                } else {
                    // Crear objeto articulo y guardarlo en el localStorage
                    const nuevoCarrito = [
                        {
                            id: idProducto,
                            nombre: nombre,
                            foto: foto,
                            precio: precio,
                            cantidad: 1,
                            iva: iva
                        }

                    ];
                    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
                }
            }
            else{
                return;
            }
        
        })
        .catch(console.log);       

}  

export function quitarUnaUnidadProducto(id){
    const carritoActual = obtenerCarritoDelLocalStorage();
    const productoEnCarrito = carritoActual.find(item => item.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad--;
    }
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
}

export function eliminarDelCarrito(id){
    const carritoJSON = localStorage.getItem('carrito');
    const carrito = JSON.parse(carritoJSON);
    const nuevoCarrito = carrito.filter(p=>p.id!=id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    
}

export function vaciarCarrito(){
    localStorage.removeItem('carrito');
}
