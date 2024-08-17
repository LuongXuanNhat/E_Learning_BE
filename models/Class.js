// models/class.js
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      class_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_id: {
        type: DataTypes.INTEGER,
        references: { model: "courses", key: "course_id" },
        allowNull: true,
      },
      advisor_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "user_id" },
        allowNull: true, // Allows this field to be null
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      schedule: DataTypes.TEXT,
      created_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "classes",
    }
  );

  Class.associate = function (models) {
    Class.belongsTo(models.Course, { foreignKey: "course_id" });
    Class.belongsTo(models.User, { as: "Advisor", foreignKey: "advisor_id" });
    // Class.belongsTo(models.User, { as: 'ClassLeader', foreignKey: 'class_leader' });
    Class.hasMany(models.Enrollment, { foreignKey: "class_id" });
    Class.hasMany(models.Attendance, { foreignKey: "class_id" });
    Class.hasMany(models.Feedback, { foreignKey: "class_id" });
    Class.hasMany(models.Grade, { foreignKey: "class_id" });
    Class.hasMany(models.ChatRoom, { foreignKey: "class_id" });
    Class.hasMany(models.Blog, { foreignKey: "class_id" });
  };

  return Class;
};
