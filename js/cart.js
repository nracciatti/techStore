let carrito = [];
//cargo desde el local
document.addEventListener("DOMContentLoaded", () => {
  cargarCarritoDesdeStorage();
  actualizarCarritoUI();
});

function cargarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id, nombre, precio, imagen) {
  Swal.fire({
    title: "¿Añadir al carrito?",
    html: `
      <div class="d-flex align-items-center justify-content-center">
        <img src="${imagen}" alt="${nombre}" style="width: 60px; height: 60px; object-fit: contain; margin-right: 15px;">
        <div>
          <strong>${nombre}</strong><br>
          <span class="text-primary">$${precio.toFixed(2)}</span>
        </div>
      </div>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",
    confirmButtonText: '<i class="bi bi-cart-plus"></i> Sí, añadir',
    cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
    customClass: {
      popup: "tech-swal-popup",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Ejecutar la lógica original
      const productoExistente = carrito.find((item) => item.id === id);

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push({
          id: id,
          nombre: nombre,
          precio: precio,
          imagen: imagen,
          cantidad: 1,
        });
      }

      guardarCarritoEnStorage();
      actualizarCarritoUI();

      Swal.fire({
        title: "¡Añadido!",
        text: `${nombre} se añadió al carrito`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  });
}

function actualizarCarritoUI() {
  const contadorCarrito = document.getElementById("contador-carrito");
  const listaProductos = document.getElementById("lista-productos");
  const carritoContenido = document.getElementById("carrito-contenido");
  const carritoVacio = document.getElementById("carrito-vacio");
  const carritoTotal = document.getElementById("carrito-total");

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  contadorCarrito.textContent = totalItems;

  if (carrito.length === 0) {
    if (carritoVacio) carritoVacio.style.display = "block";
    if (carritoContenido) carritoContenido.innerHTML = "";
    if (carritoTotal) carritoTotal.textContent = "$0.00";
    return; //cuando se actualiza , return
  }

  // si hay productos
  if (carritoVacio) carritoVacio.style.display = "none";

  let html = "";
  let total = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
    <div class="dropdown-item d-flex align-items-center py-2">
      <img src="${item.imagen}" alt="${
      item.nombre
    }" class="img-fluid me-3" style="width: 50px; height: 50px; object-fit: contain;">
      <div class="flex-grow-1">
        <h6 class="mb-0">${
          item.nombre.length > 20
            ? item.nombre.substring(0, 20) + "..."
            : item.nombre
        }</h6>
        <div class="d-flex justify-content-between align-items-center mt-1">
          <div>
            <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${
              item.id
            }, ${item.cantidad - 1})">-</button>
            <span class="mx-2">${item.cantidad}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${
              item.id
            }, ${item.cantidad + 1})">+</button>
          </div>
          <div>
            <span class="me-2">$${(item.precio * item.cantidad).toFixed(
              2
            )}</span>
            <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${
              item.id
            })">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  });

  if (carritoContenido) carritoContenido.innerHTML = html;
  if (carritoTotal) carritoTotal.textContent = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(id) {
  const producto = carrito.find((item) => item.id === id);

  if (!producto) return;

  Swal.fire({
    title: "¿Eliminar producto?",
    html: `¿Estás seguro de que quieres eliminar <strong>${producto.nombre}</strong> del carrito?`,
    icon: "warning",
    iconColor: "red",
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#64748b",
    confirmButtonText: '<i class="bi bi-trash"></i> Sí, eliminar',
    cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
    customClass: {
      popup: "tech-swal-popup",
      confirmButton: "tech-swal-delete",
      cancelButton: "tech-swal-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((item) => item.id !== id);
      guardarCarritoEnStorage();
      actualizarCarritoUI();

      Swal.fire({
        title: "¡Eliminado!",
        text: `${producto.nombre} se eliminó del carrito`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  });
} 

function cambiarCantidad(id, nuevaCantidad) {
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else {
      producto.cantidad = nuevaCantidad;
      guardarCarritoEnStorage();
      actualizarCarritoUI();
    }
  }
}
