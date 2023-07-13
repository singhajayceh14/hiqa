var _ = require("lodash");
//Model
const Courses = require("../../../lib/models").courses;
const Settings = require("../../../lib/models").settings;
const FrontPages = require("../../../lib/models").front_pages;

// Model Schema Function
const TableSchema = require("../../services");

class HomeController {
  // Course List Slug with Name
  getCourseSlugName = async (req, res) => {
    try {
      let getListData = await TableSchema.getAll(
        {
          attributes: ["id", "name", "slug"],
          where: { status: "1" },
        },
        Courses
      );
      let settingData = await TableSchema.get(
        {
          where: { id: "1" },
        },
        Settings
      );
      return res.success(
        { courses_list: getListData, setting_data: settingData },
        req.__("GET_LIST_FOUND")
      );
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getHome = async (req, res) => {
    try {
      let courseData = await TableSchema.getAll(
        {
          where: { status: "1" },
        },
        Courses
      );
      let frontData = await TableSchema.getAll(
        {
          where: { status: "1" },
        },
        FrontPages
      );
      return res.success(
        { courses_list: courseData, front_data: frontData },
        req.__("GET_LIST_FOUND")
      );
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new HomeController();
