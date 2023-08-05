var _ = require("lodash");
//Model
const Users = require("../../../lib/models").users;
// Model Schema Function
const TableSchema = require("../../services");
const {
  signToken,
  verifyPassword,
  hashPassword,
} = require("../../utils/authentication");
class AuthController {
  register = async (req, res) => {
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
      const hash = await hashPassword("123456");

      const {
        fullName,
        email,
        mobile,
        fatherName,
        gender,
        dob,
        address,
        zipcode,
        image,
        latitude,
        longitude,
        country,
        state,
        city,
        qualification,
        qualificationId,
        qualificationDoc,
        category,
      } = params;
      let user = await TableSchema.get({ where: { email: email } }, Users);
      if (user) {
        return res.serverError({}, req.__("USER_ALREADY_EXISTS"));
      }

      const createPayload = {
        name: fullName,
        mobile_number: mobile,
        email: email,
        password: hash,
        father_name: fatherName ?? "",
        gender: gender ?? "",
        dob: dob ?? "",
        address: address ?? "",
        zipcode: zipcode ?? "",
        image: image ?? "",
        latitude: latitude ?? "",
        longitude: longitude ?? "",
        country: country ?? "",
        state: state ?? "",
        city: city ?? "",
        qualification: qualification ?? "",
        qualificationId: qualificationId ?? "",
        qualificationDoc: qualificationDoc ?? "",
        category: category ?? "",
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
