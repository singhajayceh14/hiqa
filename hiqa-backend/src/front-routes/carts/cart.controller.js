var _ = require("lodash");
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

class CartController {
  addToCart = async (req, res) => {
    try {
      const params = _.extend(
        req.query || {},
        req.params || {},
        req.body || {}
      );
      let user = await TableSchema.get({ where: { id: req.user.id } }, Users);
      await TableSchema.delete({ where: { userId: req.user.id } }, Carts);
      await TableSchema.delete({ where: { userId: req.user.id } }, CartItems);
      if (user) {
        const cartCondition = { where: { userId: req.user.id } };
        const cartData = await TableSchema.get(cartCondition, Carts);
        if (cartData) {
          return res.serverError({}, req.__("CART_ALREADY_ADDED"));
        } else {
          if (params.courseIds !== "") {
            const courseIds = params.courseIds.split(",");
            if (courseIds.length) {
              const totalAmount = courseIds.length * 20.0;
              let createData = await TableSchema.create(
                {
                  userId: user.id,
                  totalAmount: totalAmount.toFixed(2),
                },
                Carts
              );

              if (createData) {
                let error = false;
                for (let i = 0; i < courseIds.length; i++) {
                  const course = await TableSchema.get(
                    { where: { id: courseIds[i] } },
                    Courses
                  );
                  if (course) {
                    await TableSchema.create(
                      {
                        cartId: createData.id,
                        userId: user.id,
                        courseId: course.id,
                        amount: 20.0,
                      },
                      CartItems
                    );
                  } else {
                    error = true;
                    break;
                  }
                }

                if (error) {
                  await TableSchema.delete(
                    {
                      userId: user.id,
                      id: createData.id,
                    },
                    Carts
                  );

                  return res.serverError({}, req.__("COURSE_NOT_FOUND"));
                } else {
                  return res.success(createData, req.__("COURSE_ADDED_CART"));
                }
              } else {
                return res.serverError({}, req.__("COURSE_CANT_ADDED"));
              }
            } else {
              return res.serverError({}, req.__("COURSE_NOT_FOUND"));
            }
          } else {
            return res.serverError({}, req.__("COURSE_NOT_FOUND"));
          }
        }
      } else {
        return res.serverError({}, req.__("USER_NOT_FOUND"));
      }
    } catch (error) {
      return res.serverError({}, req.__("SERVER_ERROR"), error);
    }
  };

  getCart = async (req, res) => {
    try {
      let user = await TableSchema.get({ where: { id: req.user.id } }, Users);
      if (user) {
        const cartCondition = {
          where: { userId: req.user.id },
          include: { model: DBCartItem, include: { model: DBCourse } },
        };
        const cartData = await TableSchema.get(cartCondition, Carts);
        if (cartData) {
          return res.success(cartData, req.__("CART_NOT_FOUND"));
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
}

module.exports = new CartController();
