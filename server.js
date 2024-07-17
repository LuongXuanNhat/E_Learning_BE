const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger'); // Import Swagger configuration
const { sequelize } = require('./models'); // Import Sequelize models
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());

// Swagger UI setup
swaggerDocs(app)

// Routes
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const chatRoomRoutes = require('./routes/chatRoomRoutes');
const chatMessageRoutes = require('./routes/chatMessageRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/chatrooms', chatRoomRoutes);
app.use('/api/chatmessages', chatMessageRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`Server is running on port ${PORT}`);
     // Synchronize database schema
     await sequelize.sync({ alter: true });
     console.log('Database synchronized successfully.');
 
     console.log(`Server is running on port ${PORT}`);
   } catch (error) {
     console.error('Unable to connect to the database or synchronize:', error);
   }
});
