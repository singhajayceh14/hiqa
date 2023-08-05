const express = require("express");
const AuthController = require("./auth.controller");
const validator = require("./auth.validator");
const { validate } = require("../../utils/validators");
var { verifyToken } = require("../../utils/authentication");
const { upload } = require("../../utils/common");
const router = express.Router();

router.post("/login", validate(validator.login), AuthController.login);
router.post(
  "/register",
  upload.fields([{ name: "image", maxCount: 1 }]),
  AuthController.register
);

router.get("/get-user-details", verifyToken, AuthController.getUserDetails);
router.post(
  "/update-user",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  AuthController.updateUser
);
router.post("/change-password", verifyToken, AuthController.changePassword);
module.exports = router;
