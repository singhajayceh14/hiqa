module.exports = function (sequelize, DataTypes) {
  const Events = sequelize.define(
    "events",
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
      event_date:{
        type: DataTypes.DATE,
        defaultValue: null,
      },
      event_start_time:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      event_end_time:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      event_address:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      event_facebook_url:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      event_instagram_url:{
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      event_twitter_url:{
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
    { tableName: "events" }
  );
  Events.selectFields = function () {
    return [
      "id",
      "title",
      "short_description",
      "long_description",
      "slug",
      "event_date",
      "event_start_time",
      "event_end_time",
      "event_address",
      "event_facebook_url",
      "event_instagram_url",
      "event_twitter_url",
      "image",
    ];
  };
  return Events;
};
