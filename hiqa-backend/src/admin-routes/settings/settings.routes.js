const express = require("express");
const SettingsController = require("./settings.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();
const { upload } = require("../../utils/common");

router.get("/detail", verifyToken, SettingsController.details);
router.post("/update", verifyToken, SettingsController.update);
module.exports = router;
