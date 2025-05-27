document.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const asunto = document.getElementById("asunto");
  const mensaje = document.getElementById("mensaje");

  document.querySelectorAll(".form-control").forEach((input) => {
    input.classList.remove("is-invalid");
    input.nextElementSibling.style.display = "none";
  });

  let todoOk = true;

  if (!nombre.value.trim()) {
    mostrarError(nombre, "Escribe tu nombre");
    todoOk = false;
  }

  if (!email.value.trim() || !email.value.includes("@")) {
    mostrarError(email, "Email válido por favor");
    todoOk = false;
  }

  if (!asunto.value.trim()) {
    mostrarError(asunto, "Escribe un asunto");
  }

  if (!mensaje.value.trim()) {
    mostrarError(mensaje, "Escribe un mensaje");
    todoOk = false;
  }

  if (todoOk) {
    document.getElementById("mensaje-exito").style.display = "block";
    this.reset();
    setTimeout(() => {
      document.getElementById("mensaje-exito").style.display = "none";
    }, 3000);
  }
});

function mostrarError(campo, texto) {
  campo.classList.add("is-invalid");
  campo.nextElementSibling.textContent = texto;
  campo.nextElementSibling.style.display = "block";
}
