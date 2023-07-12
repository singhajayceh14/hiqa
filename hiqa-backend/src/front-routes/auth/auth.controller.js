var _ = require("lodash");
const moment = require("moment");
//Model
const db = require("../../../lib/models");
const Users = require("../../../lib/models").users;
const UserOTP = require("../../../lib/models").userOTPs;
const UserAvatar = require("../../../lib/models").user_avatars;

const UserActivityStreaks =
  require("../../../lib/models").user_activity_streaks;
// Model Schema Function
const TableSchema = require("../../services");
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const { sendMail } = require("../../../lib/mailer/index");
const { signToken } = require("../../utils/authentication");

class AuthController {
  sendOTP = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { email } = params;
      const otp = Math.floor(1000 + Math.random() * 9000);
      const resData = { otp: otp, email: email, is_new_user:true};
      let user = await TableSchema.get({ where: { email: email } }, Users);
      if (user) {
        resData['is_new_user'] = false
      }
      let userOTP = await TableSchema.get(
        {
          where: { email_mobile: email },
        },
        UserOTP
      );
      if (userOTP) {
        await TableSchema.update(
          { otp: otp },
          { where: { id: userOTP.id } },
          UserOTP
        );
      } else {
        await TableSchema.create({ email_mobile: email, otp: otp }, UserOTP);
      }
      sendMail("welcome-email", "Welcome", email, {
        otp: `${otp}`,
        email: `${email}`,
      });
      return res.success(resData, req.__("SENT_OTP"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  reSendOTP = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { email } = params;
      const otp = Math.floor(1000 + Math.random() * 9000);
      const resData = { otp: otp, email: email, is_new_user:true};
      let user = await TableSchema.get({ where: { email: email } }, Users);
      if (user) {
        resData['is_new_user'] = false
      }
      let userOTP = await TableSchema.get(
        {
          where: { email_mobile: email },
        },
        UserOTP
      );
      if (userOTP) {
        await TableSchema.update(
          { otp: otp },
          { where: { id: userOTP.id } },
          UserOTP
        );
      } else {
        await TableSchema.create({ email_mobile: email, otp: otp }, UserOTP);
      }
      sendMail("welcome-email", "Welcome", email, {
        otp: `${otp}`,
        email: `${email}`,
      });
      return res.success(resData, req.__("RESENT_OTP"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  verifyOtp = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { email, otp, device_token, device_type } = params;
      let is_new_user = false;
      let userOTP = await TableSchema.get(
        {
          where: { email_mobile: email, otp: otp },
        },
        UserOTP
      );
      if (userOTP?.otp === otp) {
        let user = await TableSchema.get({ where: { email: email } }, Users);
        if (!user) {
          const lastID=  await TableSchema.get({order: [['created_at', 'DESC']] }, Users);
          console.log(lastID.id)
          user = await TableSchema.create({ email: email,name:"FitMap"+(lastID.id + 1)}, Users);
          is_new_user =true;
        }
        let token = signToken(user);
        if (token) {
          await TableSchema.update(
            {
              status: true,
              email_verified: true,
              email_verified_at: new Date(),
              token: token,
              device_token: device_token,
              device_type: device_type,
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
          userData['is_new_user'] = is_new_user;
          return res.success(userData, req.__("VERIFIED"));
        } else {
          return res.warn({}, req.__("NO_MATCH"));
        }
      } else {
        return res.warn({}, req.__("NO_MATCH"));
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
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { name, avatarId, daily_wellness_goal, question_meta_data } = params;

      const updatePayload = {};
      if (name) updatePayload["name"] = name;
      if (avatarId) {
        let getData = await TableSchema.get(
          {
            where: { id: avatarId },
          },
          UserAvatar
        );
        if (getData) {
          updatePayload["image"] = getData.getDataValue("image");
          updatePayload["userAvatarId"] = avatarId;
        }
      }
      if (daily_wellness_goal) {
        updatePayload["daily_wellness_goal"] = daily_wellness_goal;
      }
      if (question_meta_data) {
        updatePayload["question_meta_data"] = question_meta_data;
      }
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

  //Get user avatar
  getUserAvatars = async (req, res) => {
    try {
      const attributesData = ["id", "image", "status"];
      let userAvatar = await TableSchema.getAll(
        {
          attributes: attributesData,
          where: { status: "1" },
        },
        UserAvatar
      );

      if (userAvatar.length > 0) {
        return res.success({ userAvatar }, req.__("AVATAR_FOUND"));
      } else {
        return res.success({}, req.__("AVATAR_NOT_FOUND"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  socialLogin = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const { social_type, social_id, email, name, device_type, device_token } =
        params;
        let is_new_user = false;
      let user = await TableSchema.get({ where: { email: email } }, Users);
      if (!user) {
        user = await TableSchema.create({ email: email }, Users);
        is_new_user = true
      }
      let token = signToken(user);
      if (token) {
        await TableSchema.update(
          {
            social_type: social_type,
            social_id: social_id,
            name: name,
            status: true,
            email_verified: true,
            email_verified_at: new Date(),
            token: token,
            device_type: device_type,
            device_token: device_token,
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
        userData['is_new_user'] = is_new_user;
        return res.success(userData, req.__("SOCIAL_LOGIN"));
      } else {
        return res.warn({}, req.__("TOKEN_NOT_CREATE"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getStreaks = async (req, res) => {
    try {
      const END = moment().subtract("1", "days").format("YYYY-MM-DD");
      const START = moment(END).subtract("4", "days").format("YYYY-MM-DD");
      console.log(START, END)
      const todaysRecord = await TableSchema.getAll(
        {
          where: {
            userId: req.user.id,
            dateTime: {
              [Op.between]: [START, END],
            },
          },
          raw: true,
        },
        UserActivityStreaks
      );
      let resStreaks = [];
      for (let streaks = 0; streaks < todaysRecord.length; streaks++) {
        let element = todaysRecord[streaks];

        var item = resStreaks.findIndex((x) => x.dateTime == element.dateTime);
        if (resStreaks.some((x) => x.dateTime == element.dateTime)) {
          resStreaks[item]["completeActivity"] =
            resStreaks[item]["completeActivity"] + 1;
        } else {
          resStreaks.push({
            dateTime: element.dateTime,
            completeActivity: 1,
            daily_wellness_goal: element.daily_wellness_goal,
          });
        }
      }

      let resData = {
        last_5_data: resStreaks,
        current_streaks: req.user.current_streaks,
        highest_streaks: req.user.current_streaks,
        last_highest_streaks_date: req.user.last_highest_streaks_date,
        
        daily_wellness_goal: req.user.daily_wellness_goal,
      };
      return res.success(resData, req.__("GET_STREAKS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new AuthController();
