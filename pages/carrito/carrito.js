function obtenerCarrito() {
  let carritoGuardado = localStorage.getItem("carrito");

  if (carritoGuardado === null) {
    return [];
  }
  return JSON.parse(carritoGuardado);
}

// --------------------------------------------------------------------------------------------------

// 1-Obtiene la referencia de la tabla donde se mostaran los productos
// 2-Recupera la lista actual del carrito desde localstorage
// 3-Inicializa una variable para acumular el total final a pagar
// 4-Si la lista esta vacia muestra $0 como total y detiene la ejecucion
// 5-Recorre cada producto de la lista
// 6-Verifica que la cantidad del producto sea mayor o igual a 1
// 7-Parsea el precio  en un numero
// 8-Calcula el subtotal multiplicando precio por cantidad
// 9-Acumula el subtotal en el total final
// 10-Crea una fila de la tabla con los datos del producto usando innerHTML
// 11-Muestra el total final actalizado haciendo cantidad por precio
function cargarProductosCarrito() {
  let tabla = document.getElementById("tabla-carrito");
  let carrito = obtenerCarrito();

  let totalFinal = 0;

  if (carrito.length === 0) {
    document.getElementById("valor-final").textContent =
      "El valor final a pagar es: $0";
    return;
  }

  carrito.forEach(producto => {
    
    if (producto.cantidad >= 1) {
      let precioNumero = parseInt(producto.precio.replace("$", ""));
      let subtotal = precioNumero * producto.cantidad;

      totalFinal += subtotal;

      let filaHTML = `
        <tr>
          <td>${producto.nombre}</td>
          <td>${producto.cantidad}</td>
          <td>${producto.precio}</td>
        </tr>`;

      tabla.innerHTML += filaHTML;
    }
  });

  document.getElementById("valor-final").textContent =
    `El valor final a pagar es: $${totalFinal}`;
}

// ------------------------------------------------------------------------------------------------------
// 1-Elimina la lista de productos guardada en localstorage
// 2-Muestra un mensaje alert confirmando que el carrito fue limpiado
// 3-Restablece la tabla dejando solo la fila de encabezado
// 4-Actualiza el total final mostrando $0

function limpiarCarrito() {
  localStorage.removeItem("carrito");

  alert("Carrito limpiado");

  document.getElementById("tabla-carrito").innerHTML = `
    <tr class="fila-header-carrito">
      <td class="celda-header-tabla-carrito">Nombre del producto</td>
      <td class="celda-header-tabla-carrito">Cantidad</td>
      <td class="celda-header-tabla-carrito">Precio unitario</td>
    </tr>`;

  document.getElementById("valor-final").textContent =
    "El valor final a pagar es: $0";
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => {
  cargarProductosCarrito();
  document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});

