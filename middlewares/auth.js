//Middleware de autenticacion;
const tokenService = require("../services/token");
const db = require("../models");

module.exports = {
  verifyUsuario: async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(404).send({
        message: "No token",
      });
    }
    const resToken = req.headers.authorization.split(' ')[1];

    const response = await tokenService.decode(resToken);
    if (response && response.id) {
      const user = await db.Usuario.findOne({ where: { id: response.id } });
      if (user) {
        if (user.rol == "Administrador" || user.rol == "Vendedor" || user.rol == "Almacenero") {
          next();
        } else {
            return res.status(403).send({
                message: "No autorizado",
            });            
        }
      } else {
        return res.status(403).send({
            message: "Usuario no valido",
        });
      }
    } else {
      return res.status(403).send({
        message: "No autorizado",
      });
    }
  },
};