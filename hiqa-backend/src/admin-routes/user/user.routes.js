const express = require("express");
const UserController = require("./user.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();

router.post("/list", verifyToken, UserController.getList);

router.post("/add", verifyToken, UserController.add);
router.post("/update/:id", verifyToken, UserController.update);
router.delete("/remove/:id", verifyToken, UserController.delete);
router.get("/detail/:id", verifyToken, UserController.details);
module.exports = router;
