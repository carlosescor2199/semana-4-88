const routerx = require('express-promise-router');
const articuloRouter = require('./articulo');
const usuarioRouter = require('./usuario');



const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/auth', usuarioRouter);

module.exports = router;