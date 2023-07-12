module.exports = function (sequelize, DataTypes) {
  const FrontPages = sequelize.define(
    "front_pages",
    {
      type: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      title: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      status: {
        type: DataTypes.TINYINT(2),
        defaultValue: 0,
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: false,
        get: function () {
          const rawValue = this.getDataValue("image");
          const imageUrl = rawValue
            ? process.env.UPLOAD_URL + rawValue
            : process.env.BASE_URL + "img/no-images/img.png";
          return imageUrl;
        },
      },
    },
    { tableName: "front_pages" }
  );
  FrontPages.selectFields = function () {
    return ["id", "type", "title", "descption", "status", "image"];
  };
  return FrontPages;
};
