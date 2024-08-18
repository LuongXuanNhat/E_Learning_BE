// models/subjects.js
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define(
    "Subject",
    {
      subject_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      created_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "subjects",
    }
  );
  Subject.associate = function (models) {
    Subject.hasMany(models.Course, { foreignKey: "subject_id" });
  };

  return Subject;
};
