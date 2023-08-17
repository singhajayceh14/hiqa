var _ = require("lodash");
const Razorpay = require("razorpay");
//Model
const Carts = require("../../../lib/models").carts;
const CartItems = require("../../../lib/models").cart_items;
const Courses = require("../../../lib/models").courses;

const Users = require("../../../lib/models").users;
const db = require("../../../lib/models");
const DBCartItem = db.cart_items;
const DBCourse = db.courses;
// Model Schema Function
const TableSchema = require("../../services");
const { generateRandomString } = require("../../utils/common");

class OrderController {
  orderCreate = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      let user = await TableSchema.get({ where: { id: req.user.id } }, Users);
      if (user) {
        const cartCondition = { where: { userId: req.user.id } };
        const cartData = await TableSchema.get(cartCondition, Carts);
        if (cartData) {
          const payment_capture = 1;
          const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
            key_secret: process.env.RAZORPAY_KEY_SECRET, // YOUR RAZORPAY SECRET
          });
          let amount = parseFloat(cartData.totalAmount);
          const options = {
            amount: amount + "00",
            currency: "INR",
            receipt: "HIQA_ORDER_" + cartData.id,
            payment_capture,
          };

          const order = await instance.orders.create(options);
          return res.success(order, req.__("ORDER_SUCCESS"));
        } else {
          return res.serverError({}, req.__("CART_NOT_FOUND"));
        }
      } else {
        return res.serverError({}, req.__("USER_NOT_FOUND"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
  verifyPayment = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      const shasum = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET)
      shasum.update(JSON.stringify(params))
      const digest = shasum.digest('hex')
      if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        console.log(JSON.stringify(params))
      } else {
        console.log('request is Failed')
        // pass it
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new OrderController();
