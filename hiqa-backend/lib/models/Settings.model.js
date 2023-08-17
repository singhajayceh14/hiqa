module.exports = function (sequelize, DataTypes) {
  const Settings = sequelize.define(
    "settings",
    {
      title: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      sub_title: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      address: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      latitude: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      longitude: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      phone: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      facebook_url: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      twitter_url: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      instagram_url: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      youtube_url: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      linkedin_url: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      registerCharges: {
        type: DataTypes.DECIMAL(10, 2),
      },
      verifyCharges: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    { tableName: "settings" }
  );
  Settings.selectFields = function () {
    return [
      "id",
      "title",
      "sub_title",
      "address",
      "latitude",
      "longitude",
      "email",
      "phone",
      "facebook_url",
      "twitter_url",
      "skype_url",
      "linkedin_url",
      "instagram_url",
    ];
  };
  return Settings;
};
