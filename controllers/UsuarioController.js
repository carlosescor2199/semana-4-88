const db = require('../models');
const { validateSingUp, validateSingIn } = require('../services/validators');
const  bcrypt = require('bcryptjs');
const tokenService = require('../services/token');

module.exports = {
    singUp: async (req, res) => {
        const { nombre, email, password, confirmPassword, rol } = req.body;
        let errors = validateSingUp(nombre, email, password, confirmPassword, rol);
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
    singIn: async (req, res) => {
        const { email, password } = req.body;
        const errors = validateSingIn(email, password);
        if(errors) {
            return res.status(200).json(errors);
        }
        const user = await db.Usuario.findOne({where: {email: email}});
        if(user === null) {
            return res.status(404).send('User Not Found.');
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) {
            return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
        }
        const token = await tokenService.encode(user.id, user.nombre, user.email, user.rol)
        return res.status(200).send({ tokenReturn: token });

    }
}