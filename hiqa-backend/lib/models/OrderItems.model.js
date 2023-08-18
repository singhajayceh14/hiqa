module.exports = function (sequelize, DataTypes) {
  const OrderItems = sequelize.define(
    "order_items",
    {
      orderId: {
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

      status: {
        type: DataTypes.ENUM("start", "complete"),
        defaultValue: 0,
      },
    },
    { tableName: "order_items" }
  );
  OrderItems.selectFields = function () {
    return [
      "id",
      "orderId",
      "userId",
      "courseId",
      "status",
      "amount",
      "status",
    ];
  };
  return OrderItems;
};
