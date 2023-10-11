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
      image: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
    },
    { tableName: "qualifications" }
  );
  Qualifications.selectFields = function () {
    return ["id", "name", "slug", "image"];
  };
  return Qualifications;
};
