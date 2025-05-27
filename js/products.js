function cargarProductos() {
  const productosContainer = document.getElementById("lista-productos");
  productosContainer.innerHTML =
    '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

  fetch(`https://fakestoreapi.com/products/category/electronics`)
    .then((response) => response.json())
    .then((productos) => {
      mostrarProductos(productos);
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
      productosContainer.innerHTML =
        '<div class="col-12 text-center"><p class="text-danger">Error al cargar productos. Intenta de nuevo más tarde.</p></div>';
    });
}

// // Función para cargar las categorías
// function cargarCategorias() {
//   fetch("https://fakestoreapi.com/products/categories")
//     .then((response) => response.json())
//     .then((categorias) => {
//       const categoriasContainer = document.getElementById("categorias");
//       if (!categoriasContainer) return;

//       //mantenes el boton de todos
//       let botonesHTML =
//         '<button type="button" class="btn btn-outline-primary active" onclick="cargarProductos()">Todos</button>';

//       categorias.forEach((categoria) => {
//         botonesHTML += `
//           <button type="button" class="btn btn-outline-primary" onclick="filtrarPorCategoria('${categoria}')">
//             ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}
//           </button>
//         `;
//       });

//       categoriasContainer.innerHTML = botonesHTML;
//     })
//     .catch((error) => console.error("Error al cargar categorías:", error));
// }

// Función para filtrar productos por categoría
function filtrarPorCategoria(categoria) {
  const productosContainer = document.getElementById("lista-productos");
  productosContainer.innerHTML =
    '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

  fetch(`https://fakestoreapi.com/products/category/${categoria}`)
    .then((response) => response.json())
    .then((productos) => {
      mostrarProductos(productos);

      // Actualizar botones activos
      const botones = document.querySelectorAll("#categorias button");
      botones.forEach((boton) => {
        boton.classList.remove("active");
        if (
          boton.textContent.trim().toLowerCase() === categoria.toLowerCase() ||
          (boton.textContent.trim() === "Todos" && categoria === "todos")
        ) {
          boton.classList.add("active");
        }
      });
    })
    .catch((error) => {
      console.error("Error al filtrar productos:", error);
      productosContainer.innerHTML =
        '<div class="col-12 text-center"><p class="text-danger">Error al cargar productos. Intenta de nuevo más tarde.</p></div>';
    });
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
  const productosContainer = document.getElementById("lista-productos");
  productosContainer.innerHTML = "";

  productos.forEach((producto) => {
    const productoHTML = `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${producto.image}" class="card-img-top p-3" alt="${
      producto.title
    }" style="height: 200px; object-fit: contain;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.title}</h5>
            <p class="card-text flex-grow-1">${producto.description.substring(
              0,
              100
            )}...</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <span class="h5 mb-0">$${producto.price.toFixed(2)}</span>
              <button class="btn btn-primary" onclick="agregarAlCarrito(${
                producto.id
              }, '${producto.title.replace(/'/g, "\\'")}', ${
      producto.price
    }, '${producto.image}')">
                <i class="bi bi-cart-plus"></i> Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    productosContainer.innerHTML += productoHTML;
  });
}

// Cargar productos al iniciar la página
document.addEventListener("DOMContentLoaded", cargarProductos);
