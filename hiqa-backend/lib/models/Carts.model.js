module.exports = function (sequelize, DataTypes) {
  const CartItems = sequelize.define("cart_items", {
    cartId: { type: DataTypes.INTEGER },
  });
  const Carts = sequelize.define(
    "carts",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    { tableName: "carts" }
  );
  Carts.selectFields = function () {
    return ["id", "userId", "totalAmount"];
  };
  Carts.hasMany(CartItems);
  return Carts;
};
