var _ = require("lodash");
//Model
const Courses = require("../../../lib/models").courses;
const Settings = require("../../../lib/models").settings;
const FrontPages = require("../../../lib/models").front_pages;
const Banners = require("../../../lib/models").banners;
const Blogs = require("../../../lib/models").blogs;
const Events = require("../../../lib/models").events;
const {
  getPagination,
  getPaginationData,
  sortByOrder
} = require("../../utils/common");
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
          limit: 2
        },
        FrontPages
      );
      let bannersData =  await TableSchema.getAll(
        {
          where: { status: "1" },
        },
        Banners
      );
      let eventData =  await TableSchema.getAll(
        {
          attributes:["id", "title", "short_description","slug", "event_date",'event_address','image','event_start_time','event_end_time'],
          where: { status: "1" },
          limit: 3,
        },
        Events
      );
      let blogData =  await TableSchema.getAll(
        {
          attributes:["id", "title", "short_description",'image'],
          where: { status: "1" },
          limit: 3,
        },
        Blogs
      );
      return res.success(
        { courses_list: courseData, section_data: frontData,banners:bannersData,events:eventData, blogs:blogData },
        req.__("GET_LIST_FOUND")
      );
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getAllList= async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );

      const page = params?.page ? params?.page : 1;
      var sort = [["createdAt", "DESC"]];
      const size = params?.limit ? params?.limit : 2;
      const { limit, offset } = await getPagination(page, size);
      
      let  result = await TableSchema.findAndCountAll(
        { where: {status:'1'}, order: sort, limit: limit, offset: offset },
        Courses
      );
      if(params?.type === 'event'){
        result = await TableSchema.findAndCountAll(
          { where: {status:'1'}, order: sort, limit: limit, offset: offset },
          Events
        );
      }else if(params?.type === 'blog'){
        result = await TableSchema.findAndCountAll(
          { where: {status:'1'}, order: sort, limit: limit, offset: offset },
          Blogs
        );
      }
     
      const resultData = await getPaginationData(result, page, limit);
      return res.success(resultData, req.__("LIST_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new HomeController();
