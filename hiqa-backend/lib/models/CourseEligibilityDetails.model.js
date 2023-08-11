module.exports = function (sequelize, DataTypes) {
  const CourseEligibilityDetails = sequelize.define(
    "course_eligibility_details",
    {
      courseId: {
        type: DataTypes.INTEGER,
      },
      qualificationId: {
        type: DataTypes.INTEGER,
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
