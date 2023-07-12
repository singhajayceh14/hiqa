var _ = require("lodash");
//Model
const db = require("../../../lib/models");
const Courses = require("../../../lib/models").courses;
// Model Schema Function
const TableSchema = require("../../services");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPaginationData,
  sortByOrder,
} = require("../../utils/common");

class CoursesController {
  getList = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );

      const page = params?.page ? params?.page : 1;
      var sort = [["createdAt", "DESC"]];
      const size = params?.limit ? params?.limit : 5;
      const { limit, offset } = await getPagination(page, size);
      if (params?.sortBy != "") {
        const { sortField, sortOrder } = sortByOrder(params.sortBy);

        sort = [[sortField, sortOrder]];
      }

      let searchBy = "";
      var filter = [];
      if (params?.keyword) {
        let searchKeyword = params.keyword;
        searchKeyword =
          searchKeyword.indexOf("+") === 0
            ? searchKeyword.replace("+", "")
            : searchKeyword;
        searchBy = {
          [Op.or]: [
            { name: { [Op.like]: "%" + searchKeyword + "%" } },
            { email: { [Op.like]: "%" + searchKeyword + "%" } },
            { mobile_number: { [Op.like]: "%" + searchKeyword + "%" } },
            { status: { [Op.like]: searchKeyword } },
          ],
        };
        filter.push(searchBy);
      }
      let result = await TableSchema.findAndCountAll(
        { where: filter, order: sort, limit: limit, offset: offset },
        Courses
      );
      const resultData = await getPaginationData(result, page, limit);
      return res.success(resultData, req.__("LIST_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  add = async (req, res) => {
    try {
      if (req.files) {
        if (req.files.image) {
          req.body.image = req.files.image[0].filename;
        }
      }
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );

      console.log(params);
      const {
        name,
        short_description,
        long_description,
        duraion_course,
        total_seat,
        site_visits,
        image,
      } = params;
      const createPayload = {
        name: name,
        short_description: short_description,
        long_description: long_description,
        duraion_course: duraion_course,
        total_seat: total_seat,
        site_visits: site_visits,
        image: image,
        status: 1,
      };
      let create = await TableSchema.create(createPayload, Courses);
      if (create) {
        return res.success(create, req.__("CREATE_COURSE"));
      } else {
        return res.warn({}, req.__("CREATE_COURSE_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  details = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { id } = params;
      let getData = await TableSchema.get({ where: { id: id } }, Courses);
      if (!getData) {
        return res.warn({}, req.__("COURSE_NOT_FOUND"));
      }

      return res.success(getData, req.__("COURSE_DETAILS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  update = async (req, res) => {
    try {
      if (req.files) {
        if (req.files.image) {
          req.body.image = req.files.image[0].filename;
        }
      }
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const {
        id,
        name,
        short_description,
        long_description,
        duraion_course,
        total_seat,
        site_visits,
        image,
      } = params;
      let getData = await TableSchema.get({ where: { id: id } }, Courses);
      if (!getData) {
        return res.warn({}, req.__("COURSE_NOT_FOUND"));
      }
      const updatePayload = {
        name: name,
        short_description: short_description,
        long_description: long_description,
        duraion_course: duraion_course,
        total_seat: total_seat,
        site_visits: site_visits,
        image: image,
      };
      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: id },
        },
        Courses
      );
      if (update) {
        return res.success({}, req.__("UPDATE_COURSE"));
      } else {
        return res.warn({}, req.__("UPDATE_COURSE_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  delete = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { id } = params;
      console.log(id);
      let getData = await TableSchema.get({ where: { id: id } }, Courses);
      if (!getData) {
        return res.warn({}, req.__("COURSE_NOT_FOUND"));
      }
      await TableSchema.update(
        { status: "2" },
        {
          where: { id: id },
        },
        Courses
      );
      return res.success({}, req.__("DELETE_COURSE"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new CoursesController();
