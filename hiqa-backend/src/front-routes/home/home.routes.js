const express = require("express");
const HomeController = require("./home.controller");

const router = express.Router();

router.post("/course-list", HomeController.getCourseSlugName);

router.post("/get-home", HomeController.getHome);
router.post("/get-list/:type", HomeController.getAllList);
router.post("/get-details/:type", HomeController.getAllDetails);
module.exports = router;
