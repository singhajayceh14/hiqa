var _ = require("lodash");
//Model
const Users = require("../../../lib/models").users;
// Model Schema Function
const TableSchema = require("../../services");
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
}

module.exports = new AuthController();
