// Creamos un array para almacenar los productos en el carrito
let carrito = [];

// Obtenemos los botones
document.getElementById("btnBorrarCarrito").addEventListener('click', borrarCarrito);
document.getElementById("btnFinalizarCompra").addEventListener('click', finalizarCompra);

document.addEventListener('DOMContentLoaded', function () {
  cargarCarritoDesdeLocalStorage();
});

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Eliminar el signo "$" de la cadena del precio
    let precioSinSigno = precio.replace('$', '');
    
    let producto = {
        nombre: nombre,
        precio: parseFloat(precioSinSigno)
    };
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para actualizar el contenido del carrito en el DOM
function actualizarCarrito() {
  // Obtenemos la referencia al elemento HTML que muestra el contenido del carrito
  let carritoElemento = document.getElementById("carrito");
  // Limpiamos el contenido anterior del elemento
  carritoElemento.innerHTML = "";
  // Recorremos el array del carrito y creamos un nuevo elemento HTML para cada producto
  for (let i = 0; i < carrito.length; i++) {
    let productoElemento = document.createElement("div");
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
  let carritoJSON = localStorage.getItem("carrito");
  // Si hay contenido en localStorage, lo convertimos de JSON a un objeto y lo asignamos al array del carrito
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
  // Actualizamos el contenido del carrito en el DOM
  actualizarCarrito();
}

// Función para borrar el contenido del carrito
function borrarCarrito() {
  Swal.fire({
    title: 'Vaciar carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.value) {
      // Vaciamos el array del carrito
      carrito = [];
      // Actualizamos el contenido del carrito en el DOM
      actualizarCarrito();
      // Borramos el contenido del carrito en localStorage
      localStorage.removeItem("carrito");
      Swal.fire({
        title: 'Carrito vaciado',
        icon: 'success',
      });
    }
  });
}

// Función para finalizar la compra
function finalizarCompra() {
  // Calculamos la suma total de los productos en el carrito
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
  }
  // Mostramos el resultado en una ventana emergente
  Swal.fire({
    icon: 'success',
    title: 'Compra Finalizada',
    text: `El total de su compra es $${total}`,
    footer: 'Gracias por elegirnos'
  });
}

function obtenerDatos() {
    let APIBOOKS = 'https://api.itbook.store/1.0/new';
    fetch(APIBOOKS)
      .then(resultado => resultado.json())
      .then(data => {
        console.log(data.books);
        let librosContainer = document.getElementById('libros');
        let libros = data.books;
        libros.forEach(libro => {
          let columna = document.createElement('div');
          columna.classList.add('col-md-4');
          columna.innerHTML = `
            <div class="product">
              <img src="${libro.image}" class="img-fluid rounded" alt="${libro.title}">
              <p>Precio: ${libro.price}</p>
              <button class="btn btn-primary" onclick="agregarAlCarrito('${libro.title}', '${libro.price}')">Agregar al Carrito</button>

            </div>
          `;
          librosContainer.appendChild(columna);
        });
      })
      .catch(error => console.log(error));
  }
  
  obtenerDatos();
  
