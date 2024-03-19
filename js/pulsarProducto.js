export function pulsarProducto(e) {
    // extraer el id del porducto seleccionado -> redirigir descripcionProducto de ese id
    const tarjetaClicada = e.target.closest('.tarjeta');
    if (tarjetaClicada) {
        const idProducto = tarjetaClicada.getAttribute('data-idProducto');
        const nuevaPag = `descripcionProducto.html?id:${idProducto}`;
        window.location.href = nuevaPag;
    }
}