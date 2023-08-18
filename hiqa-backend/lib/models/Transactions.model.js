module.exports = function (sequelize, DataTypes) {
  const Transactions = sequelize.define(
    "transactions",
    {
      type: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      orderId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      razorpay_payment_id: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      razorpay_order_id: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      razorpay_signature: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      payment_status: {
        type: DataTypes.TEXT,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      receiptId: {
        type: DataTypes.STRING(255),
      },
    },
    { tableName: "transactions" }
  );
  Transactions.selectFields = function () {
    return [
      "id",
      "type",
      "userId",
      "razorpay_payment_id",
      "razorpay_signature",
      "razorpay_order_id",
    ];
  };
  return Transactions;
};
