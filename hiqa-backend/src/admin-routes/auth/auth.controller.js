var _ = require("lodash");
const moment = require("moment");
//Model
const db = require("../../../lib/models");
const Users = require("../../../lib/models").users;
const UserOTP = require("../../../lib/models").userOTPs;
// Model Schema Function
const TableSchema = require("../../services");
const Op = db.Sequelize.Op;
const { sendMail } = require("../../../lib/mailer/index");
const { signToken, verifyPassword } = require("../../utils/authentication");

class AuthController {
  login = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { email, password } = params;

      let user = await TableSchema.get({ where: { email: email } }, Users);
      if (!user) {
        return res.serverError({}, req.__("USER_NOT_FOUND"));
      }
      const checkPassword = await verifyPassword(password, user.password);
      if (!checkPassword) {
        return res.serverError({}, req.__("USER_PASSWORD_INCORRECT"));
      }
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile_number: user.mobile_number,
        status: user.status,
        email_verified: user.email_verified,
        token: user.token,
        role_id: user.role_id,
      };
      let token = signToken(userData);
      if (token) {
        await TableSchema.update(
          {
            token: token,
          },
          { where: { id: user.id } },
          Users
        );
        const userData = await TableSchema.get(
          {
            attributes: Users.selectFields(),
            where: { id: user.id },
          },
          Users
        );
        return res.success(userData, req.__("LOGIN_SUCCESS"));
      } else {
        return res.serverError({}, req.__("USER_NOT_FOUND"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getUserDetails = async (req, res) => {
    try {
      return res.success(req.user, req.__("USER_DETAILS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  updateUserDetails = async (req, res) => {
    try {
      if (req.files) {
        if (req.files.profile_picture) {
          req.body.profile_picture = req.files.profile_picture[0].filename;
        }
      }
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );

      const { name, phone, email, profile_picture } = params;

      console.log(req.body);
      const updatePayload = {};
      if (name) updatePayload["name"] = name;
      if (email) updatePayload["email"] = email;
      if (phone) updatePayload["mobile_number"] = phone;
      if (profile_picture) updatePayload["image"] = profile_picture;

      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: req.user.id },
        },
        Users
      );
      if (update) {
        const userData = await TableSchema.get(
          {
            attributes: Users.selectFields(),
            where: { id: req.user.id },
          },
          Users
        );
        return res.success(userData, req.__("UPDATE_USER_DETAILS"));
      } else {
        return res.warn({}, req.__("UPDATE_USER_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  logout = async (req, res) => {
    try {
      await TableSchema.update(
        {
          token: "",
        },
        { where: { id: req.user.id } },
        Users
      );
      return res.success({}, req.__("LOGOUT"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new AuthController();
