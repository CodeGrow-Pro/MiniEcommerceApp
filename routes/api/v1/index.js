const express = require('express');
const categoriesController = require('../../../src/controllers/categoryController');
const productController = require('../../../src/controllers/productController');
const userController = require('../../../src/controllers/userConntroller');
const orderController = require('../../../src/controllers/order.controller')
let router = express.Router();
router.get('/category/all',categoriesController.listCategories);
router.get('/product/all',userController.isAuthorized,productController.productList);
router.post('/product/add',userController.isAuthorized,productController.addProducts)
router.post('/user/signup',userController.signup);
router.post('/user/login',userController.login);
router.get('/order/details',userController.isAuthorized,orderController.getOrderDetails);
router.post('/order/add-order',userController.isAuthorized,orderController.createOrder)
router.put('/user/update-user/',userController.isAuthorized,userController.updateUser);
module.exports = router;