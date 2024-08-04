// models/grade.js
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    grade_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_id: { type: DataTypes.INTEGER, references: { model: 'classes', key: 'class_id' }},
    student_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    midterm_grade: DataTypes.FLOAT,
    final_grade: DataTypes.FLOAT,
    process_grade: DataTypes.FLOAT,
    final_score: DataTypes.FLOAT,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'grades'
  });

  Grade.associate = function(models) {
    Grade.belongsTo(models.Class, { foreignKey: 'class_id' });
    Grade.belongsTo(models.User, { foreignKey: 'student_id' });
  };

  return Grade;
};
