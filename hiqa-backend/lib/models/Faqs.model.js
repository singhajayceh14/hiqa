module.exports = function (sequelize, DataTypes) {
  const Faqs = sequelize.define(
    "faqs",
    {
      question: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      answer: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "0",
      },
    },
    { tableName: "faqs" }
  );
  Faqs.selectFields = function () {
    return ["id", "question", "answer"];
  };
  return Faqs;
};
