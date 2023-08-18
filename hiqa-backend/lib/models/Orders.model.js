module.exports = function (sequelize, DataTypes) {
  const Orders = sequelize.define(
    "orders",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      expiry_date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.TINYINT(2),
        defaultValue: 0,
      },
      receiptId: {
        type: DataTypes.TEXT,
      },
      payment_status: {
        type: DataTypes.TEXT,
      },
    },
    { tableName: "orders" }
  );
  Orders.selectFields = function () {
    return [
      "id",
      "userId",
      "amount",
      "expiry_date",
      "status",
      "receiptId",
      "payment_status",
    ];
  };
  return Orders;
};
