// models/feedback.js
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    feedback_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_id: { type: DataTypes.INTEGER, references: { model: 'classes', key: 'class_id' }},
    user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    content: DataTypes.TEXT,
    date: DataTypes.DATE,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'feedbacks'
  });

  Feedback.associate = function(models) {
    Feedback.belongsTo(models.Class, { foreignKey: 'class_id' });
    Feedback.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Feedback;
};
