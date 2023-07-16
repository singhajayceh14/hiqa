module.exports = function (sequelize, DataTypes) {
  const Banners = sequelize.define(
    "banners",
    {
      title: {
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
    { tableName: "banners" }
  );
  Banners.selectFields = function () {
    return [
      "id",
      "title",
      "image",
    ];
  };
  return Banners;
};
