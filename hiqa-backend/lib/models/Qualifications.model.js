module.exports = function (sequelize, DataTypes) {
  const Qualifications = sequelize.define(
    "qualifications",
    {
      slug: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
    },
    { tableName: "qualifications" }
  );
  Qualifications.selectFields = function () {
    return [
      "id",
      "name",
      "slug",
    ];
  };
  return Qualifications;
};
