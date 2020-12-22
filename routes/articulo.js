/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const { addArticulo, allArticulos, getArticulo, updateArticulo, deactivateArticulo, activateArticulo } = require('../controllers/ArticuloController.js');
const { verifyUsuario } = require('../middlewares/auth');

const router = routerx();


router.post('/add', verifyUsuario, addArticulo);
router.get('/list', allArticulos);
router.get('/:id', getArticulo);
router.put('/update', verifyUsuario, updateArticulo);
router.put('/activate', verifyUsuario, activateArticulo);
router.put('/deactivate', verifyUsuario, deactivateArticulo);


module.exports = router;