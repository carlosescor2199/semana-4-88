const routerx = require('express-promise-router');
const userController = require('../controllers/usuario.controller.js')



const router = routerx();

router.post('/signup', userController.singUp);

module.exports = router;