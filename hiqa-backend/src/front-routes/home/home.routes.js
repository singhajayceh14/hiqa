const express = require("express");
const HomeController = require("./home.controller");

const router = express.Router();

router.post("/course-list", HomeController.getCourseSlugName);

router.post("/get-home", HomeController.getHome);
module.exports = router;
