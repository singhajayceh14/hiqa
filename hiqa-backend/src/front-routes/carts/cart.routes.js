const express = require("express");
const CartController = require("./cart.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();

router.post("/add-to-cart", verifyToken, CartController.addToCart);
router.post("/get-cart", verifyToken, CartController.getCart);
module.exports = router;
