var _ = require("lodash");
//Model
const Users = require("../../../lib/models").users;
const Transactions = require("../../../lib/models").transactions;
const UserRegisters = require("../../../lib/models").user_registers;

// Model Schema Function
const TableSchema = require("../../services");
const {
  signToken,
  verifyPassword,
  hashPassword,
} = require("../../utils/authentication");
const { generateRandomString } = require("../../utils/common");
const { sendMail } = require("../../../lib/mailer/index");
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
      const password = Math.floor(100000 + Math.random() * 900000);
      const hash = await hashPassword(password.toString());

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
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        amount,
        verifyAmount,
        paymentType,
        receiptId,
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
        paymentType: paymentType ?? "leter",
        status: 1,
        role_id: 1,
      };
      let create = await TableSchema.create(createPayload, Users);
      if (create) {
        const userRegisterCreatePayload = {
          userId: create.id,
          amount: amount + verifyAmount,
          payment_status: "unpaid",
          paymentType: paymentType ?? "leter",
          receiptId: receiptId,
          status: "1",
        };
        await TableSchema.create(userRegisterCreatePayload, UserRegisters);
        if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
          const traCreatePayload = {
            userId: create.id,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            type: "regsiter",
            amount: amount + verifyAmount,
            payment_status: "unpaid",
            receiptId: receiptId,
          };
          await TableSchema.create(traCreatePayload, Transactions);
        }
        sendMail("welcome-email", "New Register", email, {
          password: `${password}`,
          email: `${email}`,
        });
        return res.success(create, req.__("CREATE_USER"));
      } else {
        return res.warn({}, req.__("CREATE_USER_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  forgotPassword = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { email } = params;
      const token = generateRandomString();
      const newUrl =
        process.env.FRONTEND + "/reset-password?" + "token=" + token;
      let user = await TableSchema.get({ where: { email: email } }, Users);
      if (!user) {
        return res.serverError({}, req.__("USER_NOT_FOUND"));
      }
      await TableSchema.update(
        {
          reset_password_token: token,
        },
        { where: { id: user.id } },
        Users
      );
      return res.success({ url: newUrl }, req.__("EMAIL_SENT_SUCCESS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  resetPassword = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { password, token } = params;
      let user = await TableSchema.get(
        { where: { reset_password_token: token } },
        Users
      );
      if (!user) {
        return res.serverError({}, req.__("INVALID_TOKEN"));
      }
      const requestData = {
        password: await hashPassword(password),
        reset_password_token: null,
      };
      await TableSchema.update(requestData, { where: { id: user.id } }, Users);
      return res.success({}, req.__("PASSWORD_RESET_SUCCESS"));
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

  updateUser = async (req, res) => {
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
      console.log(params);
      const updatePayload = {
        name: fullName,
        mobile_number: mobile,
        email: email,
        father_name: fatherName ?? "",
        gender: gender ?? "",
        dob: dob ?? "",
        address: address ?? "",
        zipcode: zipcode ?? "",
        latitude: latitude ?? "",
        longitude: longitude ?? "",
        country: country ?? "",
        state: state ?? "",
        city: city ?? "",
        qualification: qualification.toString() ?? "",
        qualificationId: qualificationId.toString() ?? "",
        qualificationDoc: JSON.stringify(qualificationDoc) ?? "",
        category: category ?? "",
      };
      if (image) {
        updatePayload["image"] = image;
      }
      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: req.user.id },
        },
        Users
      );
      if (update) {
        let user = await TableSchema.get({ where: { id: req.user.id } }, Users);
        return res.success(user, req.__("UPDATE_USER"));
      } else {
        return res.warn({}, req.__("UPDATE_USER_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  changePassword = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { password, oldPassword } = params;
      let user = await TableSchema.get({ where: { id: req.user.id } }, Users);
      if (!user) {
        return res.serverError({}, req.__("USER_NOT_FOUND"));
      }
      const hash = await hashPassword(password.toString());
      const checkPassword = await verifyPassword(oldPassword, user.password);
      if (checkPassword) {
        return res.serverError({}, req.__("OLD_PASSWORD_DONOT_SAME"));
      }
      const updatePayload = {
        password: hash,
      };
      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: req.user.id },
        },
        Users
      );
      if (update) {
        return res.success({}, req.__("CHANGE_PASSWORD_SUCCESS"));
      } else {
        return res.warn({}, req.__("UPDATE_USER_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new AuthController();
