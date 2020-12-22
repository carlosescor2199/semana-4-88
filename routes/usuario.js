const routerx = require('express-promise-router');
const { singIn, singUp, list, updateUsuario, activateUsuario, deactivateUsuario } = require('../controllers/UsuarioController.js')
const { verifyUsuario } = require('../middlewares/auth')

const router = routerx();

router.get('/list', verifyUsuario, list);
router.post('/add', verifyUsuario, singUp);
router.post('/login', singIn);
router.put('/update', verifyUsuario, updateUsuario);
router.put('/activate', verifyUsuario, activateUsuario);
router.put('/deactivate', verifyUsuario, deactivateUsuario);

module.exports = router;