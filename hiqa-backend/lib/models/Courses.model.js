module.exports = function (sequelize, DataTypes) {
  const Courses = sequelize.define(
    "courses",
    {
      name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      short_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      long_description: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      duraion_course: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      total_seat: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      site_visits: {
        type: DataTypes.STRING(255),
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
    { tableName: "courses" }
  );
  Courses.selectFields = function () {
    return [
      "id",
      "name",
      "short_description",
      "long_description",
      "duraion_course",
      "total_seat",
      "site_visits",
      "status",
      "image",
    ];
  };
  return Courses;
};
