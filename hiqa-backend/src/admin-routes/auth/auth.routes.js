const express = require("express");
const AuthController = require("./auth.controller");
const validator = require("./auth.validator");
const { validate } = require("../../utils/validators");
var { verifyToken } = require("../../utils/authentication");
const { upload } = require("../../utils/common");
const router = express.Router();

router.post("/login", validate(validator.login), AuthController.login);

router.get("/user-details", verifyToken, AuthController.getUserDetails);
router.post(
  "/update-user-details",
  verifyToken,
  upload.fields([{ name: "profile_picture", maxCount: 1 }]),
  AuthController.updateUserDetails
);
router.post("/logout", verifyToken, AuthController.logout);

module.exports = router;
