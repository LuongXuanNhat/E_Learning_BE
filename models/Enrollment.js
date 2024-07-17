// models/enrollment.js
module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    enrollment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    course_id: { type: DataTypes.INTEGER, references: { model: 'courses', key: 'course_id' }},
    class_id: { type: DataTypes.INTEGER, references: { model: 'classes', key: 'class_id' }},
    registration_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'enrollments'
  });

  Enrollment.associate = function(models) {
    Enrollment.belongsTo(models.User, { foreignKey: 'student_id' });
    Enrollment.belongsTo(models.Course, { foreignKey: 'course_id' });
    Enrollment.belongsTo(models.Class, { foreignKey: 'class_id' });
  };

  return Enrollment;
};
