const routerx = require('express-promise-router');
const { addCategoria, allCategorias, getCategoria, updateCategoria, activateCategoria, deactivateCategoria } = require('../controllers/CategoriaController')


const router = routerx();

router.post('/add', addCategoria);
router.get('/list', allCategorias);
router.get('/:id', getCategoria);
router.put('/update', updateCategoria);
router.put('/activate', activateCategoria);
router.put('/deactivate',  deactivateCategoria);

module.exports = router;