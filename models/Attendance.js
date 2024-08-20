// models/attendance.js
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    attendance_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_id: { type: DataTypes.INTEGER, references: { model: 'classes', key: 'class_id' }},
    student_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE, 
  }, {
    timestamps: false,
    tableName: 'attendances'
  });

  Attendance.associate = function(models) {
    Attendance.belongsTo(models.Class, { foreignKey: 'class_id' });
    Attendance.belongsTo(models.User, { foreignKey: 'student_id' });
  };

  return Attendance;
};
