/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const { addArticulo, allArticulos, getArticulo, updateArticulo, deactivateArticulo, activateArticulo } = require('../controllers/ArticuloController.js');
const auth = require('../middlewares/auth');

const router = routerx();


router.post('/add', auth.verifyUsuario, addArticulo);
router.get('/list', allArticulos);
router.get('/:id', getArticulo);
router.put('/update', auth.verifyUsuario, updateArticulo);
router.put('/activate', auth.verifyUsuario, activateArticulo);
router.put('/deactivate', auth.verifyUsuario, deactivateArticulo);


module.exports = router;