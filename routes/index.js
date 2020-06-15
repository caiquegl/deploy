const express = require('express');
const router = express.Router();
const upload = require("../config/upload");
const {check,validationResult,body} = require("express-validator")




const bodyController = require("../controller/bodyController");
const autenController = require("../controller/atentificacao");
const produtosController = require("../controller/produtos");
const regisController = require("../controller/registrar");
const carrinhoController = require("../controller/carrinho");
const pedidoController = require("../controller/pedidoController");
const clienteController = require("../controller/clienteController");



router.get('/', bodyController.home);

router.get('/registro', bodyController.cadastro);
router.post('/registro', [
    check("email").isEmail().withMessage("E-mail obrigatório"),
    check("password").isLength({min:6}).withMessage("Password como minimo de 6 digitos"),
], regisController.store);


router.get('/carrinho', autenController.validando ,bodyController.carrinho);
router.post('/carrinho', autenController.validando ,carrinhoController.remove);


router.get('/cliente', autenController.validando, bodyController.cliente);
router.post('/clienteE', autenController.validando, clienteController.updateE);
router.post('/clienteC', autenController.validando, clienteController.updateC);




router.get('/ecomerce', produtosController.ecomerce);
router.get('/ecomerce/up', produtosController.ecomerceUp);
router.get('/ecomerce/down', produtosController.ecomerceDown);


router.post('/ecomerce',autenController.validando ,carrinhoController.store);

router.get('/ecomerce/:id', produtosController.ecomerceId);
router.post('/ecomerce/:id',autenController.validando ,carrinhoController.store);

router.get('/finalizar', autenController.validando, pedidoController.finalizar);
router.post('/finalizar', autenController.validando, pedidoController.storePedido);


router.get('/infoProdutos/:id', produtosController.infoProdutos);


router.get('/login', bodyController.login);
router.post('/login', autenController.validatorLogin);

router.get('/logout', bodyController.logout);



router.get('/mapa', bodyController.mapa);
router.post('/mapa', bodyController.mapaSearch);

router.get('/noticia', bodyController.noticia);

router.get('/paginaAdmin', autenController.validando, bodyController.paginaAdmin);
router.post('/paginaAdmin', upload.any() ,produtosController.storeProduto);
router.post('/paginaAdminR',produtosController.remove);








module.exports = router;
