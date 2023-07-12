var _ = require("lodash");
//Model
const db = require("../../../lib/models");
const Users = require("../../../lib/models").users;
// Model Schema Function
const TableSchema = require("../../services");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPaginationData,
  sortByOrder,
} = require("../../utils/common");
const { hashPassword } = require("../../utils/authentication");

class UserController {
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
      var filter = [{ id: { [Op.not]: req.user.id } }];
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
        Users
      );
      const resultData = await getPaginationData(result, page, limit);
      return res.success(resultData, req.__("LIST_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  add = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { name, email, mobile_number, password } = params;
      const hash = await hashPassword(password);
      const createPayload = {
        name: name,
        mobile_number: mobile_number,
        email: email,
        password: hash,
        status: 1,
        role_id: 1,
      };
      let create = await TableSchema.create(createPayload, Users);
      if (create) {
        return res.success(create, req.__("CREATE_USER"));
      } else {
        return res.warn({}, req.__("CREATE_USER_ERROR"));
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
      let getData = await TableSchema.get({ where: { id: id } }, Users);
      if (!getData) {
        return res.warn({}, req.__("USER_NOT_FOUND"));
      }

      return res.success(getData, req.__("USER_DETAILS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  update = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { id, name, email, mobile_number } = params;
      let getData = await TableSchema.get({ where: { id: id } }, Users);
      if (!getData) {
        return res.warn({}, req.__("USER_NOT_FOUND"));
      }
      const updatePayload = {
        name: name,
        mobile_number: mobile_number,
        email: email,
      };
      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: id },
        },
        Users
      );
      if (update) {
        return res.success({}, req.__("UPDATE_USER"));
      } else {
        return res.warn({}, req.__("UPDATE_USER_ERROR"));
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
      let getData = await TableSchema.get({ where: { id: id } }, Users);
      if (!getData) {
        return res.warn({}, req.__("USER_NOT_FOUND"));
      }
      await TableSchema.update(
        { status: "2" },
        {
          where: { id: id },
        },
        Users
      );
      return res.success({}, req.__("DELETE_USER"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new UserController();
