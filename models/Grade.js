// models/grade.js
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define(
    "Grade",
    {
      grade_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      class_id: {
        type: DataTypes.INTEGER,
        references: { model: "classes", key: "class_id" },
      },
      student_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "user_id" },
      },
      optional_grade_1: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      optional_grade_2: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      rollcall_grade: DataTypes.FLOAT,
      midterm_grade: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      final_grade: DataTypes.FLOAT,
      process_grade: {
        type: DataTypes.VIRTUAL,
        get() {
          const rollcallGrade = this.getDataValue("rollcall_grade");
          const optionalGrade1 = this.getDataValue("optional_grade_1");
          const optionalGrade2 = this.getDataValue("optional_grade_2");
          const midtermGrade = this.getDataValue("midterm_grade");

          const averageOptionalGrades = [
            optionalGrade1,
            optionalGrade2,
            midtermGrade,
          ].filter((grade) => grade !== null && grade !== undefined);

          const average =
            averageOptionalGrades.length > 0
              ? averageOptionalGrades.reduce((acc, grade) => acc + grade, 0) /
                averageOptionalGrades.length
              : 0;

          return 0.3 * (rollcallGrade || 0) + 0.7 * average;
        },
      },
      summary_score: {
        type: DataTypes.VIRTUAL,
        get() {
          const processGrade = this.get("process_grade");
          const finalGrade = this.getDataValue("final_grade");

          return 0.5 * processGrade + 0.5 * (finalGrade || 0);
        },
      },
      created_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "grades",
    }
  );

  Grade.associate = function (models) {
    Grade.belongsTo(models.Class, { foreignKey: "class_id" });
    Grade.belongsTo(models.User, { as: "Student", foreignKey: "student_id" });
  };

  return Grade;
};
