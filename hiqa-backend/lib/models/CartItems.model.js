module.exports = function (sequelize, DataTypes) {
  const Courses = sequelize.define("courses", {
    courseId: { type: DataTypes.INTEGER },
  });
  const CartItems = sequelize.define(
    "cart_items",
    {
      cartId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      courseId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    { tableName: "cart_items" }
  );
  CartItems.selectFields = function () {
    return ["id", "cartId", "courseId", "amount"];
  };
  CartItems.belongsTo(Courses);
  return CartItems;
};
