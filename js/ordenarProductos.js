// Función para ordenar productos por precio
export function ordenarProductosPorPrecio(productos, ascendente) {
    if (!productos) {
        return;
    }

    if (ascendente) {
        return productos.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
    } else {
        return productos.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
    }
}

// Función para ordenar productos por nombre
export function ordenarProductosPorNombre(productos, ascendente) {
    if (!productos) {
        return;
    }

    if (ascendente) {
        return productos.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()));
    } else {
        return productos.sort((a, b) => b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase()));
    }
}