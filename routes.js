const express = require('express');
const router = express.Router();
const productController = require("./controller/products"); //controller 가져오기

//router.get('/', productController.hello);
router.post('/', productController.createProduct);

module.exports = router; //내보내주기 (server.js에서 가져올 수 있게)