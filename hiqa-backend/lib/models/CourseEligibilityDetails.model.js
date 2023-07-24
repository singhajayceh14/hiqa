module.exports = function (sequelize, DataTypes) {
  const CourseEligibilityDetails = sequelize.define(
    "course_eligibility_details",
    {
      courseId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      qualificationId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    { tableName: "course_eligibility_details" }
  );
  CourseEligibilityDetails.selectFields = function () {
    return [
      "id",
      "courseId",
      "qualificationId",
    ];
  };
  return CourseEligibilityDetails;
};
