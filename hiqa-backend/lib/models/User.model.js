module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      father_name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      mobile_number: {
        type: DataTypes.STRING(11),
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      email_verified: {
        type: DataTypes.TINYINT(1),
      },
      role_id: {
        type: DataTypes.INTEGER(11),
      },
      email_verified_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      password: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      remember_token: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      status: {
        type: DataTypes.TINYINT(2),
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING(255),
        defaultValue: "",
        allowNull: false,
        get: function () {
          const rawValue = this.getDataValue("image");
          const imageUrl = rawValue ? rawValue : "/img/no-images/img.png";
          return process.env.UPLOAD_URL + imageUrl;
        },
      },
      last_login_at: {
        type: DataTypes.DATE,
      },
      last_login_ip: {
        type: DataTypes.STRING(255),
      },
      notification_status: {
        type: DataTypes.TINYINT(2),
      },
      admin_approved: {
        type: DataTypes.INTEGER(11),
      },

      device_id: {
        type: DataTypes.STRING(255),
      },
      device_token: {
        type: DataTypes.STRING(255),
      },
      country_code: {
        type: DataTypes.STRING(255),
      },
      token: {
        type: DataTypes.TEXT,
      },
      reset_password_token: {
        type: DataTypes.TEXT,
      },
      social_id: {
        type: DataTypes.TEXT,
      },
      social_type: {
        type: DataTypes.TEXT,
      },
      device_type: {
        type: DataTypes.STRING(255),
      },
      gender: {
        type: DataTypes.STRING(255),
      },
      dob: {
        type: DataTypes.STRING(255),
      },
      address: {
        type: DataTypes.STRING(255),
      },
      zipcode: {
        type: DataTypes.STRING(255),
      },
      latitude: {
        type: DataTypes.STRING(255),
      },
      longitude: {
        type: DataTypes.STRING(255),
      },
      country: {
        type: DataTypes.STRING(255),
      },
      state: {
        type: DataTypes.STRING(255),
      },
      city: {
        type: DataTypes.STRING(255),
      },
      qualification: {
        type: DataTypes.TEXT,
      },
      qualificationId: {
        type: DataTypes.TEXT,
      },
      qualificationDoc: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.STRING(255),
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(0),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(0),
        field: "updated_at",
      },
      is_new_user: DataTypes.VIRTUAL,
    },
    { tableName: "users" }
  );
  Users.selectFields = function () {
    return [
      "id",
      "name",
      "father_name",
      "email",
      "mobile_number",
      "email_verified",
      "status",
      "image",
      "token",
      "role_id",
      "gender",
      "dob",
      "address",
      "zipcode",
      "latitude",
      "longitude",
      "country",
      "state",
      "city",
      "qualification",
      "qualificationId",
      "qualificationDoc",
      "category",
    ];
  };
  return Users;
};
