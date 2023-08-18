var _ = require("lodash");
const moment = require("moment");
const Razorpay = require("razorpay");
//Model
const Carts = require("../../../lib/models").carts;
const CartItems = require("../../../lib/models").cart_items;
const Courses = require("../../../lib/models").courses;
const Orders = require("../../../lib/models").orders;
const OrderItems = require("../../../lib/models").order_items;
const Users = require("../../../lib/models").users;
const Transactions = require("../../../lib/models").transactions;
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
          let createData = await TableSchema.create(
            {
              userId: user.id,
              amount: cartData.totalAmount,
              expiry_date: moment(new Date())
                .add(30, "days")
                .format("YYYY-MM-DD"),
              status: "1",
              receiptId: params.receiptId,
              payment_status: "pending",
            },
            Orders
          );

          if (createData) {
            const cartItems = await TableSchema.getAll(
              { where: { userId: req.user.id, cartId: cartData.id } },
              CartItems
            );

            if (cartItems.length) {
              for (let index = 0; index < cartItems.length; index++) {
                const element = cartItems[index];

                await TableSchema.create(
                  {
                    orderId: createData.id,
                    userId: user.id,
                    courseId: createData.courseId,
                    amount: element.amount,
                    status: "start",
                  },
                  OrderItems
                );
              }
            }

            if (
              params?.receiptId &&
              params?.razorpay_payment_id &&
              params?.razorpay_order_id &&
              params?.razorpay_signature
            ) {
              const traCreatePayload = {
                userId: user.id,
                orderId: createData.id,
                razorpay_payment_id: params?.razorpay_payment_id,
                razorpay_order_id: params?.razorpay_order_id,
                razorpay_signature: params?.razorpay_signature,
                type: "order",
                amount: createData.amount,
                payment_status: "unpaid",
                receiptId: params?.receiptId,
              };
              await TableSchema.create(traCreatePayload, Transactions);
            }
            await TableSchema.delete(cartCondition, Carts);
            await TableSchema.delete(cartCondition, CartItems);
            return res.success({}, req.__("ORDER_SUCCESS"));
          } else {
            return res.serverError({}, req.__("ORDER_FAILED"));
          }
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
      console.log(JSON.stringify(params));
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };
}

module.exports = new OrderController();
