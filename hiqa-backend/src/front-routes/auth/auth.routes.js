const express = require("express");
const AuthController = require("./auth.controller");
const validator = require("./auth.validator");
const { validate } = require("../../utils/validators");
var { verifyToken } = require("../../utils/authentication");

const router = express.Router();


router.post("/login", validate(validator.login), AuthController.login);

router.get("/get-user-details", verifyToken, AuthController.getUserDetails);
module.exports = router;
