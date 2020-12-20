const routerx = require('express-promise-router');
const userController = require('../controllers/UsuarioController.js')

const router = routerx();

router.post('/signup', userController.singUp);
router.post('/login', userController.singIn);

module.exports = router;