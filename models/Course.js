// models/course.js
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // or true, depending on your default value
      },
      subject_id: {
        type: DataTypes.INTEGER,
        references: { model: "subjects", key: "subject_id" },
        allowNull: true,
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      registration_deadline: DataTypes.DATE,
      image_url: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "courses",
    }
  );

  Course.associate = function (models) {
    Course.hasMany(models.Class, { foreignKey: "course_id" });
    Course.hasMany(models.Enrollment, { foreignKey: "course_id" });
    Course.belongsTo(models.Subject, { foreignKey: "subject_id" });
  };

  return Course;
};
