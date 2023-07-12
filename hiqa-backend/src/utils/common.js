const FCM = require("fcm-push");
var fs = require("fs");
const db = require("../../lib/models");
const Notifications = require("../../lib/models").notifications;
const Users = require("../../lib/models").users;

const TableSchema = require("../services");
var cron = require("node-cron");
var multer = require("multer");

cron.schedule("0 0 * * *", () => {
  //console.log("running a task every minute");
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public/uploads/";
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      cb(null, dir);
    });
    //cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const getPlatform = (req) => req.headers["x-platform"];
const getLanguage = (req) => req.headers["accept-language"];

const sendNotification = async (
  userID,
  type = "user",
  table_id,
  table_name,
  title,
  message
) => {
  try {
    if (type == "user") {
      const userData = await TableSchema.get({ where: { id: userID } }, Users);
      const notifyObj = {
        user_type: "0",
        title: title,
        description: message,
        from_id: userData.id,
        to_id: userData.id,
        table_name: table_name,
        table_id: table_id,
        is_read: false,
        is_status: false,
      };
      await TableSchema.create(notifyObj, Notifications);
      if (userData.device_token && userData.device_token != "") {
        if (
          userData.device_type == "Android" ||
          userData.device_type == "IOS"
        ) {
          let payload = { type: table_name };
          payload.message = message;
          payload.title = title;
          payload.order_id = table_id;
          const msg = {
            to: userData.device_token,
            collapse_key: "green",
            notification: {
              title: title,
              body: message,
            },
            data: payload,
          };
          const fcm = new FCM(process.env.USER_FCM);
          try {
            let send = await fcm.send(msg);
            console.log("success", send);
          } catch (error) {
            console.log("error", error);
          }
        }
      }
    }
  } catch (e) {
    // Log Errors
    console.log(e);
  }
};
const getPagination = async (page, size) => {
  const limit = size ? +size : 3;
  if (page == 1) {
    var offset = 0;
  } else {
    var offset = page ? (page - 1) * limit : 0;
  }
  return { limit, offset };
};
const getPaginationData = async (datas, page, limit) => {
  const { count: totalItems, rows: docs } = datas;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    total: totalItems,
    result: docs,
    page: totalPages,
    limit,
    currentPage,
  };
};

const sortByOrder = (sortBy) => {
  if (sortBy) {
    const sortArray = sortBy.split("_");
    const sortOrder = sortArray.at(-1);
    sortArray.pop();
    const sortField = sortArray.join("_");
    return { sortField, sortOrder: sortOrder === "asc" ? "ASC" : "DESC" };
  } else {
    return [["createdAt", "DESC"]];
  }
};
module.exports = {
  sendNotification,
  getPlatform,
  getLanguage,
  upload,
  getPagination,
  getPaginationData,
  sortByOrder,
};
