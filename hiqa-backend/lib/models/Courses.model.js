module.exports = function (sequelize, DataTypes) {
  const Courses = sequelize.define(
    "courses",
    {
      slug: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
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
      general: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      ews: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      special_consideration: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      other: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      discount_price: {
        type: DataTypes.DECIMAL(10, 2),
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
      "general",
      "ews",
      "special_consideration",
      "other",
      "image",
      "price",
      "discount_price"
    ];
  };
  return Courses;
};
