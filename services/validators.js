const emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
module.exports = {
  validateSingUp: (nombre, email, password, rol) => {
    let errors = [];
    if (nombre.trim() === "") {
      errors.push({
        nombre: "El nombre no puede estar vacío",
      });
    }
    if (email.trim() === "") {
      errors.push({
        email: "El email no puede estar vacío",
      });
    }
    if (!emailFormat.test(email)) {
      errors.push({
        email: "La dirección de email " + email + " es no tiene el formato correcto.",
      });
    }
    if (password.trim() === "") {
      errors.push({
        password: "La contraseña no puede estar vacía",
      });
    }
    if (rol.trim() === "") {
      errors.push({
        rol: "Debe escoger un rol",
      });
    }

    return errors.length > 0 ? errors : null;
  },
  validateSingIn: (email, password) => {
    let errors = [];
    if (email.trim() === "") {
      errors.push({
        email: "El email no puede estar vacío",
      });
    }
    if (!emailFormat.test(email)) {
      errors.push({
        email: "La dirección de email " + email + " es no tiene el formato correcto.",
      });
    }
    if (password.trim() === "") {
      errors.push({
        password: "La contraseña no puede estar vacía",
      });
    }

    return errors.length > 0 ? errors : null;
  },
  validateCategoria(nombre, descripcion) {
    let errors = [];

    if (nombre.trim() === "") {
      errors.push({
        nombre: "El Nombre no puede estar vacía",
      });
    }
    if (descripcion.trim() === "") {
      errors.push({
        descripcion: "La Descripción no puede estar vacía",
      });
    }
    return errors.length > 0 ? errors : null;
  },
  validateArticulo(codigo, nombre, descripcion) {
    let errors = [];
    if (codigo.trim() === "") {
      errors.push({
        nombre: "El Nombre no puede estar vacía",
      });
    }
    if (nombre.trim() === "") {
      errors.push({
        nombre: "El Nombre no puede estar vacía",
      });
    }
    if (descripcion.trim() === "") {
      errors.push({
        descripcion: "La Descripción no puede estar vacía",
      });
    }
    return errors.length > 0 ? errors : null;
  }
};
