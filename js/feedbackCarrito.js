export function darFeedbackCarrito(){
    let productoEnCarrito = JSON.parse(localStorage.getItem('carrito'));
    let sumaCantidades = 0;
    if(productoEnCarrito && productoEnCarrito.length>0){
        for(let i = 0; i<productoEnCarrito.length; i++){
            sumaCantidades+= productoEnCarrito[i].cantidad;
        }
    }

    const spanCarrito = document.getElementById('contCarrito');
    spanCarrito.innerHTML = sumaCantidades;
}

darFeedbackCarrito();