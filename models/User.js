// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    cap_bac: DataTypes.STRING,
    chuc_vu: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'users'
  });

  User.associate = function(models) {
    User.hasMany(models.Class, { as: 'Advisor', foreignKey: 'advisor_id' });
    User.hasMany(models.Enrollment, { foreignKey: 'student_id' });
    User.hasMany(models.Attendance, { foreignKey: 'student_id' });
    User.hasMany(models.Feedback, { foreignKey: 'user_id' });
    User.hasMany(models.Grade, { foreignKey: 'student_id' });
    User.hasMany(models.ChatMessage, { foreignKey: 'sender_id' });
    User.hasMany(models.Session, { foreignKey: 'user_id' });
    User.hasMany(models.Token, { foreignKey: 'user_id' });
    User.hasMany(models.Blog, { as: 'Teacher', foreignKey: 'teacher_id' });
    User.hasMany(models.Comment, { foreignKey: 'user_id' });
  };

  return User;
};
