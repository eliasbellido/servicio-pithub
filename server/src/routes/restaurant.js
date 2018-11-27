const router = require('express').Router()

const restaurantController = require('../controllers/restaurantController')
const productoController = require('../controllers/productoController')
const categoriaController = require('../controllers/categoriaController')
const usuarioController = require('../controllers/usuarioController')
const tipoRestauranteController = require('../controllers/tipoRestauranteController')
const pedidoController = require('../controllers/pedidoController')


//para el restaurante
router.get('/restaurantes', restaurantController.listarRestaurantes)
router.get('/restaurante/:id', restaurantController.obtenerRestaurante)
router.get('/restaurantes/categoria/:id', restaurantController.obtenerRestaurantesxCategoria)
//para tipo restaurante
router.get('/restaurantes/categorias', tipoRestauranteController.listarTipoRestaurante)

//para los productos
router.get('/productos/:id', productoController.listarProductos);
router.get('/producto/:id', productoController.obtenerProducto);

//para las categorias
router.get('/categorias', categoriaController.listarCategorias);

//para el login
router.post('/usuario/validarUsuario', usuarioController.obtenerUsuarioFinal);

//para registrar pedido
router.post('/pedido/generarPedido', pedidoController.generarPedido);

//testpedidoUSP
router.post('/pedido/generarPedidoTest', pedidoController.generarPedidoUSP);

module.exports = router