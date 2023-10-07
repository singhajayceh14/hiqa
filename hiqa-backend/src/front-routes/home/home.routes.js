const express = require("express");
const HomeController = require("./home.controller");
const { upload } = require("../../utils/common");
const router = express.Router();

router.post("/course-list", HomeController.getCourseSlugName);
router.post("/all-list", HomeController.allList);

router.post("/get-home", HomeController.getHome);
router.post("/get-list/:type", HomeController.getAllList);
router.post("/get-details/:type", HomeController.getAllDetails);

router.post(
  "/doc-uploads",
  upload.fields([{ name: "image", maxCount: 1 }]),
  HomeController.docUpload
);
router.post("/razorpay-orders", HomeController.razorpayOrders);
router.post("/verify-register-payment", HomeController.verifyRegisterPayment);

router.get("/share-images", HomeController.shareImage);
module.exports = router;
