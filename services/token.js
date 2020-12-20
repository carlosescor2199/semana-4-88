var jwt = require('jsonwebtoken');
const secret = require('../config/secret.json')


module.exports = {

    //generar el token
    encode: async(id, nombre, email, rol) => {
        return jwt.sign({ id, nombre, email, rol }, secret.secretJWT, {
            expiresIn: 86400
        });
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            return jwt.decode(token)
        } catch (e) {
            console.log(e)
        }
    }
}