module.exports = function (sequelize, DataTypes) {
  const Blogs = sequelize.define(
    "blogs",
    {
      title: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      short_description:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      long_description:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      slug:{
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
    { tableName: "blogs" }
  );
  Blogs.selectFields = function () {
    return [
      "id",
      "title",
      "short_description",
      "long_description",
      "slug",
      "image",
    ];
  };
  return Blogs;
};
