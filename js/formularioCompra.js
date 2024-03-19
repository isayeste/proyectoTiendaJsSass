import {vaciarCarrito} from './cestaCompra.js';
"use strict";
let numProd;
let pTotal;
// ----


function infoCesta(){
    const urlCompleta = window.location.href;
    const partesUrl = urlCompleta.split('?');
    const numeroProductos = partesUrl[1].split('=')[1];
    const precioTotal = partesUrl[2].split('=')[1];
    numProd = numeroProductos;
    pTotal = precioTotal;
    document.getElementById('nProd').innerHTML = numeroProductos;
    document.getElementById('impTotal').innerHTML = parseFloat(precioTotal).toFixed(2) + "€";
}

infoCesta();

// Validar formulario antes de enviarlo
const formulario = document.getElementById('pedido');
formulario.addEventListener('input', function(evento){
    const elemento = evento.target;
    const spanMensajeError = document.getElementById(`${elemento.id}-error`);
    const valorSinEspacios = elemento.value.trim();
    if (valorSinEspacios.length > 0 && elemento.validity.valid) {
        bordeBien(elemento);
        borrarMensajeError(spanMensajeError);


    } else {
        bordeError(elemento);
        mostrarMensajeError(elemento, spanMensajeError, "");
    }
    // Fecha expiracion
    if(elemento.id==='fechaExpiracion'){
        const fechaIndicada = new Date(evento.target.value);
        const fechaHoy = new Date(); 

        if(fechaIndicada<fechaHoy){
            mostrarMensajeError(elemento, spanMensajeError, 'La fecha no puede ser anterior a la actual');
            bordeError();
        }
        else{
            bordeBien();
            borrarMensajeError(spanMensajeError);
        }
    }
    
});

formulario.addEventListener('submit',function(evento){
    evento.preventDefault();
    if(formulario.checkValidity()){
        // ventana modal -> pedido realizado
        mostrarVentanaModal();
        // eliminar localStorage
        vaciarCarrito();
        
    }
});


function bordeError(campo){
    campo.style.borderBottom = '1px solid red';
}
function bordeBien(campo){
    campo.style.borderBottom = '1px solid green';
}

function mostrarMensajeError(elemento, spanMensajeError, cadena){
    spanMensajeError.innerHTML = obtenerMensajePersonalizado(elemento, cadena);
}
function borrarMensajeError(spanMensajeError){
    spanMensajeError.innerHTML = "";
}

function obtenerMensajePersonalizado(elemento, cadena){
    if(cadena.length>0){
        return cadena;
    }
    
    if(elemento.validity.valueMissing){
        return "Campo obligatorio";
    }
    else if(elemento.validity.patternMismatch){
        return "El valor no cumple con el formato requerido";
    }
    else if(elemento.validity.tooShort){
        return `El valor debe tener al menos ${elemento.minLength} caracteres`;
    }
    else if(elemento.validity.tooLong){
        return `El valor debe tener como máximo ${elemento.maxLength} caracteres`;
    }
    else{
        return "Este campo no es válido";
    }
}

// Ventana modal
function mostrarVentanaModal() {
    const modal = document.getElementById("ventanaModal");
    modal.style.display = "block";
}

const modal = document.getElementById("ventanaModal");
const span = document.getElementsByClassName("cerrarModal")[0];

span.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

