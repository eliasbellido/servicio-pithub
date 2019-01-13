var router = require('express').Router()


const restaurantController = require('../controllers/restaurantController')
const productoController = require('../controllers/productoController')
const categoriaController = require('../controllers/categoriaController')
const usuarioController = require('../controllers/usuarioController')
const tipoRestauranteController = require('../controllers/tipoRestauranteController')
const pedidoController = require('../controllers/pedidoController')

const auth = require('../auth/verifytoken')

//para el restaurante
router.get('/restaurantes', auth.authWithToken, restaurantController.listarRestaurantes)
router.get('/restaurante/:id', auth.authWithToken, restaurantController.obtenerRestaurante)
router.get('/restaurantes/categoria/:id', auth.authWithToken, restaurantController.obtenerRestaurantesxCategoria)
//para tipo restaurante
router.get('/restaurantes/categorias', auth.authWithToken, tipoRestauranteController.listarTipoRestaurante)

//para los productos
router.get('/productos/:id', auth.authWithToken, productoController.listarProductos);
router.get('/producto/:id', auth.authWithToken, productoController.obtenerProducto);

//para las categorias
/*router.route('/categorias')
.get(middleware.verificaToken,categoriaController.Listar)*/
router.route('/categorias')
.get(auth.authWithToken, categoriaController.listarCategorias);

//para el login
router.post('/usuario/validarUsuario', usuarioController.obtenerUsuarioFinal);
router.post('/usuario/registrarUsuarioFinal', usuarioController.registrarNuevoUsuarioFinal);

//para registrar pedido
router.post('/pedido/generarPedido', auth.authWithToken, pedidoController.generarPedido);

//testpedidoUSP
router.post('/pedido/generarPedidoTest', auth.authWithToken, pedidoController.generarPedidoUSP);



module.exports = router