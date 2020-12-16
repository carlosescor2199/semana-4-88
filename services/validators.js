const emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&]?)([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/;
module.exports = {
  validateSingUp: (nombre, email, password, confirmPassword, rol) => {
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
    if (!passwordFormat.test(password)) {
      errors.push({
        confirmPassword:
          "La contrasela debe tener entre 8 y 20 carácteres, comenzar por una letra y tener mínimo 2 numeros",
      });
    }
    if (confirmPassword.trim() === "") {
      errors.push({
        confirmPassword: "La contraseña de confirmación no puede estar vacía",
      });
    }
    if (password !== confirmPassword) {
      errors.push({
        password: "Las contraseñas no coinciden",
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
  }
};
