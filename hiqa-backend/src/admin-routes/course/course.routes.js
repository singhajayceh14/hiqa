const express = require("express");
const CourseController = require("./course.controller");
var { verifyToken } = require("../../utils/authentication");
const router = express.Router();
const { upload } = require("../../utils/common");

router.post("/list", verifyToken, CourseController.getList);

router.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  CourseController.add
);
router.post(
  "/update",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyToken,
  CourseController.update
);
router.delete("/remove/:id", verifyToken, CourseController.delete);
router.get("/detail/:id", verifyToken, CourseController.details);
module.exports = router;
