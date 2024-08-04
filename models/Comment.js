// models/comment.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    blog_id: { type: DataTypes.INTEGER, references: { model: 'blogs', key: 'blog_id' }},
    user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    content: DataTypes.TEXT,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'comments'
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Blog, { foreignKey: 'blog_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Comment;
};
