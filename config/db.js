// db.js (config/db.js)
const { Sequelize,DataTypes  } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});


const User = require('../models/User')(sequelize, DataTypes);
const Course = require('../models/Course')(sequelize, DataTypes);
const Class = require('../models/Class')(sequelize, DataTypes);
const Enrollment = require('../models/Enrollment')(sequelize, DataTypes);
const Attendance = require('../models/Attendance')(sequelize, DataTypes);
const Feedback = require('../models/Feedback')(sequelize, DataTypes);
const Grade = require('../models/Grade')(sequelize, DataTypes);
const ChatRoom = require('../models/ChatRoom')(sequelize, DataTypes);
const Session = require('../models/Session')(sequelize, DataTypes);
const Token = require('../models/Token')(sequelize, DataTypes);
const Blog = require('../models/Blog')(sequelize, DataTypes);
const Comment = require('../models/Comment')(sequelize, DataTypes);

// Define associations
User.hasMany(Class, { foreignKey: 'advisor_id' });
Class.belongsTo(User, { foreignKey: 'advisor_id' });

Course.hasMany(Class, { foreignKey: 'course_id' });
Class.belongsTo(Course, { foreignKey: 'course_id' });

User.hasMany(Enrollment, { foreignKey: 'student_id' });
Enrollment.belongsTo(User, { foreignKey: 'student_id' });

Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

Class.hasMany(Enrollment, { foreignKey: 'class_id' });
Enrollment.belongsTo(Class, { foreignKey: 'class_id' });

User.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(User, { foreignKey: 'student_id' });

Class.hasMany(Attendance, { foreignKey: 'class_id' });
Attendance.belongsTo(Class, { foreignKey: 'class_id' });

User.hasMany(Feedback, { foreignKey: 'user_id' });
Feedback.belongsTo(User, { foreignKey: 'user_id' });

Class.hasMany(Feedback, { foreignKey: 'class_id' });
Feedback.belongsTo(Class, { foreignKey: 'class_id' });

User.hasMany(Grade, { foreignKey: 'student_id' });
Grade.belongsTo(User, { foreignKey: 'student_id' });

Class.hasMany(Grade, { foreignKey: 'class_id' });
Grade.belongsTo(Class, { foreignKey: 'class_id' });

User.hasMany(Session, { foreignKey: 'user_id' });
Session.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Token, { foreignKey: 'user_id' });
Token.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Blog, { foreignKey: 'teacher_id' });
Blog.belongsTo(User, { foreignKey: 'teacher_id' });

Class.hasMany(Blog, { foreignKey: 'class_id' });
Blog.belongsTo(Class, { foreignKey: 'class_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Blog.hasMany(Comment, { foreignKey: 'blog_id' });
Comment.belongsTo(Blog, { foreignKey: 'blog_id' });

// Sync models with database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = sequelize;