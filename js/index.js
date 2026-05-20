//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
  let carrito = localStorage.getItem("carrito");

  if (carrito === null) {
    return [];
  }
  return JSON.parse(carrito);
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// -----------------------------------------------------------------------------------------------------------------
// 1-Captura el elemento que disparo el evento
// 2-Navega en el DOM hasta el <li> que corresponde al producto
// 3-Obtiene el nombre y precio del producto desde el DOM
// 4-Recupera la lista actual de productos guardados en el carrito desde localstorage
// 5-Busca dentro de la lista si el producto ya fue agregado utilizando find()
// 6-Si el producto ya existe en la lista se incrementa en 1 su cantidad
// 7-Si el producto no existe se agrega a la lista con cantidad inicial en 1
// 8-Actualiza la lista con los cambios realizados
// 9-Guarda la lista actualizada nuevamente en localstorage
// 10-Muestra un mensaje al usuario confirmando que el producto fue agregado 

function sumarAlCarrito(e) {
  //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
  let elementoClickeado = e.target;

  let li = elementoClickeado.parentElement;

  let nombre = li.querySelector(".nombre-producto").textContent;
  let precio = li.querySelector(".precio-producto").textContent;

  let carrito = obtenerCarrito();

  let productoExistente = carrito.find(producto => producto.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  }
  else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }

  console.log(carrito);
  guardarCarrito(carrito);

  alert(`${nombre} se agrego al carrito`);
}


// ------------------------------------------------------------------------------------------------------------------------
// 1-Captura el elemento que disparo el evento
// 2-Navega en el DOM hasta el <li> que corresponde al producto
// 3-Obtiene el nombre del producto desde el DOM.
// 4-Recupera el estado actual del carrito desde localstorage
// 5-Si el carrito esta vacio se interrumpe la ejecucion
// 6-Busca el producto en la lista utilizando find()
// 7-Si no existe se informa al usuario y corta la ejecucion
// 8-Si existe se resta en 1 a cantidad
// 9-Si la cantidad llega a 0 se elimina el producto utilizando filter()
// 10-Guarda el nuevo estado actualizado en localstorage

function restarDelCarrito(e) {
  //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
  let elementoClickeado = e.target;

  let li = elementoClickeado.parentElement;

  let nombre = li.querySelector(".nombre-producto").textContent;

  let carrito = obtenerCarrito();

  if (carrito.length === 0) {
    alert("No hay ningún producto guardado en el carrito");
    return;
  }

  let productoExistente = carrito.find(producto => producto.nombre === nombre);

  if (!productoExistente) {
    alert(`No hay mas ${nombre} en el carrito`);
    return;
  }

  productoExistente.cantidad -= 1;

  alert(`${nombre} se elimino del carrito`);

  if (productoExistente.cantidad === 0) {
    carrito = carrito.filter(producto => producto.nombre !== nombre);
  }

  console.log(carrito);

  guardarCarrito(carrito);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => {
  const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
  const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

  botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
  botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
