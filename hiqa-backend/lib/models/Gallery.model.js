module.exports = function (sequelize, DataTypes) {
  const Gallery = sequelize.define(
    "gallery",
    {
      type: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
    },
    { tableName: "gallery" }
  );
  Gallery.selectFields = function () {
    return ["id", "type", "image"];
  };
  return Gallery;
};
