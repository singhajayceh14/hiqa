module.exports = function (sequelize, DataTypes) {
  const UserRegisters = sequelize.define(
    "user_registers",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      paymentType: {
        type: DataTypes.TEXT,
      },
      payment_status: {
        type: DataTypes.TEXT,
      },
      receiptId: {
        type: DataTypes.TEXT,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      status: {
        type: DataTypes.TINYINT(2),
        defaultValue: 0,
      },
    },
    { tableName: "user_registers" }
  );
  UserRegisters.selectFields = function () {
    return [
      "id",
      "paymentType",
      "userId",
      "payment_status",
      "receiptId",
      "amount",
      "status",
    ];
  };
  return UserRegisters;
};
