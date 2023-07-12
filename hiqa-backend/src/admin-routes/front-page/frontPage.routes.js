const express = require("express");
const FrontPageController = require("./frontPage.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();
const { upload } = require("../../utils/common");

router.post("/list", verifyToken, FrontPageController.getList);

router.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  FrontPageController.add
);
router.post(
  "/update",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  FrontPageController.update
);
router.delete("/remove/:id", verifyToken, FrontPageController.delete);
router.get("/detail/:id", verifyToken, FrontPageController.details);
module.exports = router;
