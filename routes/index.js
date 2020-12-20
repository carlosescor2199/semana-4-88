const routerx = require('express-promise-router');
const articuloRouter = require('./articulo');
const usuarioRouter = require('./usuario');
const categoriaRouter = require('./categoria');
const auth = require('../middlewares/auth');


const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/usuario', usuarioRouter);
router.use('/categoria', auth.verifyUsuario, categoriaRouter);

module.exports = router;