var _ = require("lodash");
const Razorpay = require("razorpay");
const crypto = require("crypto");

//Model
const db = require("../../../lib/models");
const Courses = require("../../../lib/models").courses;
const Settings = require("../../../lib/models").settings;
const FrontPages = require("../../../lib/models").front_pages;
const Banners = require("../../../lib/models").banners;
const Blogs = require("../../../lib/models").blogs;
const Users = require("../../../lib/models").users;
const Events = require("../../../lib/models").events;
const Gallery = require("../../../lib/models").gallery;

const Faqs = require("../../../lib/models").faqs;
const Qualifications = require("../../../lib/models").qualifications;
const CourseEligibilityDetails =
  require("../../../lib/models").course_eligibility_details;
const Op = db.Sequelize.Op;
const { convertHTMLToImage } = require("../../../lib/html-to-image");
const {
  getPagination,
  getPaginationData,
  sortByOrder,
} = require("../../utils/common");
// Model Schema Function
const TableSchema = require("../../services");

class HomeController {
  // Course List Slug with Name
  allList = async (req, res) => {
    try {
      let whereCondition = { status: "1" };
      if (req.user && req.user.qualificationId) {
        let courseDatas = await TableSchema.getAll(
          {
            where: {
              qualificationId: { [Op.in]: req.user.qualificationId.split(",") },
            },
          },
          CourseEligibilityDetails
        );
        const courseIds = courseDatas
          .filter((item) => item.courseId)
          .map((item) => item.courseId);

        whereCondition["id"] = { [Op.in]: courseIds };
      }
      let getListData = await TableSchema.getAll(
        {
          attributes: ["id", "name", "slug"],
          where: whereCondition,
        },
        Courses
      );
      let settingData = await TableSchema.get(
        {
          where: { id: "1" },
        },
        Settings
      );
      let qualification = await TableSchema.getAll({}, Qualifications);
      return res.success(
        {
          courses_list: getListData,
          setting_data: settingData,
          user: req.user,
          qualification,
        },
        req.__("GET_LIST_FOUND")
      );
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  getCourseSlugName = async (req, res) => {
    try {
      let whereCondition = { status: "1" };
      if (req.user && req.user.qualificationId) {
        let courseDatas = await TableSchema.getAll(
          {
            where: {
              qualificationId: { [Op.in]: req.user.qualificationId.split(",") },
            },
          },
          CourseEligibilityDetails
        );
        const courseIds = courseDatas
          .filter((item) => item.courseId)
          .map((item) => item.courseId);

        whereCondition["id"] = { [Op.in]: courseIds };
      }
      let getListData = await TableSchema.getAll(
        {
          attributes: ["id", "name", "slug"],
          where: whereCondition,
        },
        Courses
      );
      return res.success(
        {
          courses_list: getListData,
        },
        req.__("GET_LIST_FOUND")
      );
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  getHome = async (req, res) => {
    try {
      let whereCondition = { status: "1" };
      if (req.body && req.body.qualificationId) {
        let courseDatas = await TableSchema.getAll(
          {
            where: {
              qualificationId: { [Op.in]: req.body.qualificationId.split(",") },
            },
          },
          CourseEligibilityDetails
        );
        const courseIds = courseDatas
          .filter((item) => item.courseId)
          .map((item) => item.courseId);

        whereCondition["id"] = { [Op.in]: courseIds };
      }
      let courseData = await TableSchema.getAll(
        {
          where: whereCondition,
        },
        Courses
      );
      let frontData = await TableSchema.getAll(
        {
          where: { status: "1" },
          limit: 2,
        },
        FrontPages
      );
      let bannersData = await TableSchema.getAll(
        {
          where: { status: "1" },
        },
        Banners
      );
      let eventData = await TableSchema.getAll(
        {
          attributes: [
            "id",
            "title",
            "short_description",
            "slug",
            "event_date",
            "event_address",
            "image",
            "event_start_time",
            "event_end_time",
          ],
          where: { status: "1" },
          limit: 3,
        },
        Events
      );
      let blogData = await TableSchema.getAll(
        {
          attributes: ["id", "title", "short_description", "slug", "image"],
          where: { status: "1" },
          limit: 3,
        },
        Blogs
      );
      let settingData = await TableSchema.get(
        {
          where: { id: "1" },
        },
        Settings
      );
      let totalStudent = await TableSchema.count(
        {
          where: { role_id: "1" },
        },
        Users
      );
      let totalStaff = await TableSchema.count(
        {
          where: { role_id: "0" },
        },
        Users
      );
      let totalCourse = await TableSchema.count(
        {
          where: { status: "1" },
        },
        Courses
      );
      let faqs = await TableSchema.getAll(
        {
          where: { status: "1" },
        },
        Faqs
      );
      const counterData = {
        totalStudent:
          settingData?.isCounter == true
            ? settingData?.totalStudent
            : totalStudent,
        totalCourse:
          settingData?.isCounter == true
            ? settingData?.totalCourse
            : totalCourse,
        totalPlacement:
          settingData?.isCounter == true ? settingData?.totalPlacement : 0,
        totalStaff:
          settingData?.isCounter == true ? settingData?.totalStaff : totalStaff,
      };
      return res.success(
        {
          courses_list: courseData,
          section_data: frontData,
          banners: bannersData,
          events: eventData,
          blogs: blogData,
          counter: counterData,
          faqs: faqs,
        },
        req.__("GET_LIST_FOUND")
      );
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getAllList = async (req, res) => {
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

      let result = await TableSchema.findAndCountAll(
        { where: { status: "1" }, order: sort, limit: limit, offset: offset },
        Courses
      );
      if (params?.type === "event") {
        result = await TableSchema.findAndCountAll(
          { where: { status: "1" }, order: sort, limit: limit, offset: offset },
          Events
        );
      } else if (params?.type === "blog") {
        result = await TableSchema.findAndCountAll(
          { where: { status: "1" }, order: sort, limit: limit, offset: offset },
          Blogs
        );
      } else if (params?.type === "gallery") {
        result = await TableSchema.findAndCountAll(
          { where: { status: "1" }, order: sort, limit: limit, offset: offset },
          Blogs
        );
      }

      const resultData = await getPaginationData(result, page, limit);
      return res.success(resultData, req.__("LIST_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  getGallery = async (req, res) => {
    try {
      let result = await TableSchema.getAll({}, Gallery);
      return res.success(result, req.__("LIST_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  getFaqs = async (req, res) => {
    try {
      let result = await TableSchema.getAll({}, Faqs);
      return res.success(result, req.__("LIST_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getAllDetails = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );

      let result = "";
      if (params.slug) {
        result = await TableSchema.get(
          { where: { status: "1", slug: params.slug } },
          Courses
        );
        if (params?.type === "event") {
          result = await TableSchema.get(
            { where: { status: "1", slug: params.slug } },
            Events
          );
        } else if (params?.type === "blog") {
          result = await TableSchema.get(
            { where: { status: "1", slug: params.slug } },
            Blogs
          );
        }
      }

      if (result) {
        return res.success(result, req.__("DETAILS_SUCCESS"));
      } else {
        return res.warn({}, req.__("DETAILS_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  docUpload = async (req, res) => {
    try {
      let image = "";
      if (req.files) {
        if (req.files.image) {
          image = req.files.image[0].filename;
        }
      }

      return res.success(image, req.__("USER_DOCS_UPLOAD"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  shareImage = async (req, res) => {
    try {
      await convertHTMLToImage("welcome-email", {
        email: "ashish.sharma@yopmail.com",
        otp: "123456",
      });

      return res.success({}, req.__("USER_DOCS_UPLOAD"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  razorpayOrders = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      if (params?.amount) {
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
          key_secret: process.env.RAZORPAY_KEY_SECRET, // YOUR RAZORPAY SECRET
        });
        const payment_capture = 1;
        const options = {
          amount: parseInt(params?.amount) + "00",
          currency: "INR",
          payment_capture,
        };

        if (params?.type === "REGSITER") {
          options["receipt"] =
            "HIQA_REG_" + Math.floor(Math.random() * 9999999) + 1;
        }
        if (params?.type === "ORDER") {
          options["receipt"] =
            "HIQA_ORD_" + Math.floor(Math.random() * 9999999) + 1;
        }
        const order = await instance.orders.create(options);
        return res.success(order, req.__("ORDER_SUCCESS"));
      } else {
        return res.serverError({}, req.__("INVALID_AMOUNT"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  verifyRegisterPayment = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      console.log(JSON.stringify(params));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  checkEligibility = async (req, res) => {
    try {
      let whereCondition = { status: "1" };
      if (req.body && req.body?.qualificationId) {
        let courseDatas = await TableSchema.getAll(
          {
            where: {
              qualificationId: { [Op.in]: req.body.qualificationId.split(",") },
            },
          },
          CourseEligibilityDetails
        );
        const courseIds = courseDatas
          .filter((item) => item.courseId)
          .map((item) => item.courseId);

        whereCondition["id"] = { [Op.in]: courseIds };
      }
      let getListData = await TableSchema.getAll(
        {
          attributes: [
            "id",
            "name",
            "slug",
            "image",
            "short_description",
            "price",
            "discount_price",
          ],
          where: whereCondition,
        },
        Courses
      );
      return res.success(getListData, req.__("GET_LIST_FOUND"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new HomeController();
