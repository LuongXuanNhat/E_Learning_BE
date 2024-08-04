// models/blog.js
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    blog_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_id: { type: DataTypes.INTEGER, references: { model: 'classes', key: 'class_id' }},
    teacher_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    resource_url: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'blogs'
  });

  Blog.associate = function(models) {
    Blog.belongsTo(models.Class, { foreignKey: 'class_id' });
    Blog.belongsTo(models.User, { as: 'Teacher', foreignKey: 'teacher_id' });
    Blog.hasMany(models.Comment, { foreignKey: 'blog_id' });
  };

  return Blog;
};
