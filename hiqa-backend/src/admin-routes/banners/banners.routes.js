const express = require("express");
const BannersController = require("./banners.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();
const { upload } = require("../../utils/common");

router.post("/list", verifyToken, BannersController.getList);

router.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  BannersController.add
);
router.post(
  "/update",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  BannersController.update
);
router.delete("/remove/:id", verifyToken, BannersController.delete);
router.get("/detail/:id", verifyToken, BannersController.details);
module.exports = router;
