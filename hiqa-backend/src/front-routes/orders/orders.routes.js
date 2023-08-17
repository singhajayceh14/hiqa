const express = require("express");
const OrderController = require("./orders.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();

router.post("/checkout", verifyToken, OrderController.orderCreate);
router.post("/verify-payment", OrderController.verifyPayment);

module.exports = router;
