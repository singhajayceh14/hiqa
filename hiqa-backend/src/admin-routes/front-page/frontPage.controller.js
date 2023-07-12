var _ = require("lodash");
//Model
const db = require("../../../lib/models");
const FrontPages = require("../../../lib/models").front_pages;
// Model Schema Function
const TableSchema = require("../../services");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPaginationData,
  sortByOrder,
} = require("../../utils/common");

class FrontPageController {
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
        FrontPages
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
      const { type, title, description, image } = params;
      const createPayload = {
        type: type,
        title: title,
        description: description,
        image: image,
        status: 1,
      };
      let create = await TableSchema.create(createPayload, FrontPages);
      if (create) {
        return res.success(create, req.__("CREATE_FRONT_PAGE"));
      } else {
        return res.warn({}, req.__("CREATE_FRONT_PAGE_ERROR"));
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
      let getData = await TableSchema.get({ where: { id: id } }, FrontPages);
      if (!getData) {
        return res.warn({}, req.__("FRONT_PAGE_NOT_FOUND"));
      }

      return res.success(getData, req.__("FRONT_PAGE_DETAILS"));
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
      const { id, type, title, description, image } = params;
      let getData = await TableSchema.get({ where: { id: id } }, FrontPages);
      if (!getData) {
        return res.warn({}, req.__("FRONT_PAGE_NOT_FOUND"));
      }
      const updatePayload = {
        type: type,
        title: title,
        description: description,
        image: image,
      };
      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: id },
        },
        FrontPages
      );
      if (update) {
        return res.success({}, req.__("UPDATE_FRONT_PAGE"));
      } else {
        return res.warn({}, req.__("UPDATE_FRONT_PAGE_ERROR"));
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
      let getData = await TableSchema.get({ where: { id: id } }, FrontPages);
      if (!getData) {
        return res.warn({}, req.__("FRONT_PAGE_NOT_FOUND"));
      }
      await TableSchema.update(
        { status: "2" },
        {
          where: { id: id },
        },
        FrontPages
      );
      return res.success({}, req.__("DELETE_FRONT_PAGE"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new FrontPageController();
