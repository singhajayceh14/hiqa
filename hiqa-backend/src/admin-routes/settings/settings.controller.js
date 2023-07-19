var _ = require("lodash");
//Model
const db = require("../../../lib/models");
const Settings = require("../../../lib/models").settings;
// Model Schema Function
const TableSchema = require("../../services");
const Op = db.Sequelize.Op;
const {
  getPagination,
  getPaginationData,
  sortByOrder,
} = require("../../utils/common");

class FrontPageController {
  details = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      let getData = await TableSchema.get({ where: { id: "1" } }, Settings);
      if (!getData) {
        return res.warn({}, req.__("SETTINGS_NOT_FOUND"));
      }

      return res.success(getData, req.__("SETTINGS_DETAILS"));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  update = async (req, res) => {
    try {
      // if (req.files) {
      //   if (req.files.image) {
      //     req.body.image = req.files.image[0].filename;
      //   }
      // }
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const {
        sub_title,
        title,
        address,
        latitude,
        longitude,
        email,
        phone,
        facebook_url,
        twitter_url,
        youtube_url,
        linkedin_url,
        instagram_url,
      } = params;
      const updatePayload = {
        title: title,
        sub_title: sub_title,
        address: address,
        latitude: latitude,
        longitude: longitude,
        email: email,
        phone: phone,
        facebook_url: facebook_url,
        twitter_url: twitter_url,
        youtube_url: youtube_url,
        linkedin_url: linkedin_url,
        instagram_url: instagram_url,
      };
      let update = await TableSchema.update(
        updatePayload,
        {
          where: { id: 1 },
        },
        Settings
      );
      if (update) {
        return res.success(updatePayload, req.__("UPDATE_FRONT_PAGE"));
      } else {
        return res.warn({}, req.__("UPDATE_FRONT_PAGE_ERROR"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new FrontPageController();
