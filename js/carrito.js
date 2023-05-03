// Creamos un array para almacenar los productos en el carrito
var carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
	// Creamos un objeto para representar el producto
	var producto = {
		nombre: nombre,
		precio: precio
	};
	// Agregamos el producto al array del carrito
	carrito.push(producto);
	// Actualizamos el contenido del carrito en el DOM
	actualizarCarrito();
	// Guardamos el contenido del carrito en localStorage
	guardarCarritoEnLocalStorage();
}

// Función para actualizar el contenido del carrito en el DOM
function actualizarCarrito() {
	// Obtenemos la referencia al elemento HTML que muestra el contenido del carrito
	var carritoElemento = document.getElementById("carrito");
	// Limpiamos el contenido anterior del elemento
	carritoElemento.innerHTML = "";
	// Recorremos el array del carrito y creamos un nuevo elemento HTML para cada producto
	for (var i = 0; i < carrito.length; i++) {
		var productoElemento = document.createElement("div");
		productoElemento.innerHTML = carrito[i].nombre + " - $" + carrito[i].precio;
		carritoElemento.appendChild(productoElemento);
	}
}

// Función para guardar el contenido del carrito en localStorage
function guardarCarritoEnLocalStorage() {
	// Convertimos el array del carrito a JSON y lo guardamos en localStorage
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el contenido del carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
	// Obtenemos el contenido del carrito desde localStorage
	var carritoJSON = localStorage.getItem("carrito");
	// Si hay contenido en localStorage, lo convertimos de JSON a un objeto y lo asignamos al array del carrito
	if (carritoJSON) {
		carrito = JSON.parse(carritoJSON);
	}
	// Actualizamos el contenido del carrito en el DOM
	actualizarCarrito();
}

// Función para borrar el contenido del carrito
function borrarCarrito() {
	// Vaciamos el array del carrito
	carrito = [];
	// Actualizamos el contenido del carrito en el DOM
	actualizarCarrito();
	// Borramos el contenido del carrito en localStorage
	localStorage.removeItem("carrito");
}

// Función para finalizar la compra
function finalizarCompra() {
	// Calculamos la suma total de los productos en el carrito
	var total = 0;
	for (var i = 0; i < carrito.length; i++) {
		total += carrito[i].precio;
	}
	// Mostramos el resultado en una ventana emergente
	alert("El total de su compra es $" + total);
}