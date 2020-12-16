const db = require('../models');
const { validateSingUp } = require('../services/validators');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    singUp: async (req, res) => {
        const { nombre, email, password, confirmPassword, rol } = req.body;
        let errors = validateSingUp(nombre, email, password, confirmPassword, rol)
        console.log(errors)
        
        if(errors) {
            return res.status(200).json(errors);
        }
        errors = []
        let user = await db.Usuario.findOne({where: {email: email}})
        if(user !== null) {
            if(user.get() !== null) {
                errors.push({
                    email: "Este usuario ya está registrado"
                })
                return res.status(401).json(errors)
            }
        }
        const encryptPassword = await bcrypt.hash(password, 10)
        const newUser = await db.Usuario.build({
            nombre,
            email,
            password: encryptPassword,
            rol,
            estado: true
        })
        const resp = await newUser.save();
        return res.status(201).json(resp)

    },
    login: (req, res) => {

    }
}