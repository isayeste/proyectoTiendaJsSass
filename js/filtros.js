//Crear los filtros basándome en los datos del json

let precioMaximo; // Variable para almacenar el precio máximo
    document.addEventListener('DOMContentLoaded', function () {
        const inputPrecio = document.querySelector('.inputPrecio');
        const precioMenorSpan = document.getElementById('precioMenor');
        const precioMayorSpan = document.getElementById('precioMayor');

        // Configurar el valor inicial
        precioMayorSpan.textContent = inputPrecio.value;

        // Manejar eventos de cambio en el rango
        inputPrecio.addEventListener('input', function () {
            const valorActual = inputPrecio.value;
            precioMayorSpan.textContent = valorActual;
        });

        // Cambiar el filtro por defecto al precio mayor
        inputPrecio.addEventListener('change', function () {
            const valorActual = inputPrecio.value;
        });

        obtenerProductos();
    });

    // Rellenar las opciones del selector
    function rellenarOpciones(selector, opciones){
        const elementosSelect = document.getElementById(selector);

        for (let i = 0; i < opciones.length; i++){
            const elementoOpcion = document.createElement('option');
            elementoOpcion.value = opciones[i];
            elementoOpcion.textContent = opciones[i];
            elementosSelect.append(elementoOpcion);
        }
    }

    // Leer los productos del json
    function obtenerProductos(){
        fetch('./js/productos.json')
        .then(respuesta => respuesta.json())
        .then(productos =>{
            // Marcas
            const marcas = [];
            for (let i = 0; i<productos.length; i++){
                const marca = productos[i].marca;
                if (!marcas.includes(marca)){
                    marcas.push(marca);
                }  
            }
            rellenarOpciones('marca-select', marcas);

            // Materiales
            const materiales = [];
            for (let i = 0; i<productos.length; i++){
                const material = productos[i].material;
                if(!materiales.includes(material)){
                    materiales.push(material);
                }
            }
            rellenarOpciones('material-select', materiales)

            // Precio
            const precios = productos.map(producto => producto.precio);
            precios.sort((a, b) => a - b);
            const precioMenor = precios[0];
            const precioMayor = precios[precios.length - 1];

            // Actualizar los elementos en el DOM con los valores calculados
            document.getElementById('precioMenor').textContent = 0;
            document.getElementById('precioMayor').textContent = precioMayor;

            // Asignar el valor máximo al rango
            precioMaximo = precioMayor;
            document.querySelector('.inputPrecio').max = precioMaximo;
            // Establecer el valor por defecto al máximo
            document.querySelector('.inputPrecio').value = precioMaximo;
        })
        .catch(console.log);
    }