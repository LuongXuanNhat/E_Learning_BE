const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Learning API',
      version: '1.0.0',
      description: 'API documentation for the E-Learning system',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: { type: 'integer', description: 'User ID' },
            username: { type: 'string', description: 'Unique username used for login' },
            name: { type: 'string', description: 'User\'s name' },
            cap_bac: { type: 'string', description: 'User\'s cap_bac' },
            chuc_vu: { type: 'string', description: 'User\'s chuc_vu' },
            email: { type: 'string', description: 'User email used for login' },
            password: { type: 'string', description: 'Hashed password' },
            role: { type: 'string', description: 'User\'s role' },
            avatar_url: { type: 'string', description: 'URL of the user avatar image' },
            is_active: { type: 'boolean', default: true, description: 'Account activation status' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of user creation' },
          },
        },
        Course: {
          type: 'object',
          properties: {
            course_id: { type: 'integer', description: 'Course ID' },
            name: { type: 'string', description: 'Course name' },
            description: { type: 'string', description: 'Course description' },
            status: { type: 'string', description: 'Course status' },
            start_date: { type: 'string', format: 'date-time', description: 'Course start date' },
            end_date: { type: 'string', format: 'date-time', description: 'Course end date' },
            registration_deadline: { type: 'string', format: 'date-time', description: 'Registration deadline' },
            image_url: { type: 'string', description: 'URL of the course image' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of course creation' },
          },
        },
        Class: {
          type: 'object',
          properties: {
            class_id: { type: 'integer', description: 'Class ID' },
            course_id: { type: 'integer', description: 'Reference to Course ID' },
            advisor_id: { type: 'integer', description: 'Reference to Advisor ID' },
            name: { type: 'string', description: 'Class name' },
            description: { type: 'string', description: 'Class description' },
            schedule: { type: 'string', description: 'Class schedule' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of class creation' },
          },
        },
        Enrollment: {
          type: 'object',
          properties: {
            enrollment_id: { type: 'integer', description: 'Enrollment ID' },
            student_id: { type: 'integer', description: 'Reference to Student ID' },
            course_id: { type: 'integer', description: 'Reference to Course ID' },
            class_id: { type: 'integer', description: 'Reference to Class ID' },
            registration_date: { type: 'string', format: 'date-time', description: 'Registration date' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of enrollment creation' },
          },
        },
        Attendance: {
          type: 'object',
          properties: {
            attendance_id: { type: 'integer', description: 'Attendance ID' },
            class_id: { type: 'integer', description: 'Reference to Class ID' },
            student_id: { type: 'integer', description: 'Reference to Student ID' },
            date: { type: 'string', format: 'date-time', description: 'Attendance date' },
            status: { type: 'string', description: 'Attendance status' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of attendance creation' },
          },
        },
        Feedback: {
          type: 'object',
          properties: {
            feedback_id: { type: 'integer', description: 'Feedback ID' },
            class_id: { type: 'integer', description: 'Reference to Class ID' },
            user_id: { type: 'integer', description: 'Reference to User ID' },
            content: { type: 'string', description: 'Feedback content' },
            date: { type: 'string', format: 'date-time', description: 'Feedback date' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of feedback creation' },
          },
        },
        Grade: {
          type: 'object',
          properties: {
            grade_id: { type: 'integer', description: 'Grade ID' },
            class_id: { type: 'integer', description: 'Reference to Class ID' },
            student_id: { type: 'integer', description: 'Reference to Student ID' },
            midterm_grade: { type: 'number', description: 'Midterm grade' },
            final_grade: { type: 'number', description: 'Final grade' },
            process_grade: { type: 'number', description: 'Process grade' },
            final_score: { type: 'number', description: 'Final score' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of grade creation' },
          },
        },
        ChatRoom: {
          type: 'object',
          properties: {
            chat_room_id: { type: 'integer', description: 'Chat Room ID' },
            class_id: { type: 'integer', description: 'Reference to Class ID', nullable: true },
            name: { type: 'string', description: 'Chat Room name' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of chat room creation' },
          },
        },
        ChatMessage: {
          type: 'object',
          properties: {
            message_id: { type: 'integer', description: 'Message ID' },
            chat_room_id: { type: 'integer', description: 'Reference to Chat Room ID' },
            sender_id: { type: 'integer', description: 'Reference to Sender ID' },
            content: { type: 'string', description: 'Message content' },
            sent_at: { type: 'string', format: 'date-time', description: 'Timestamp of message sent' },
          },
        },
        Session: {
          type: 'object',
          properties: {
            session_id: { type: 'integer', description: 'Session ID' },
            user_id: { type: 'integer', description: 'Reference to User ID' },
            session_token: { type: 'string', description: 'Unique token for the session' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of session creation' },
            expires_at: { type: 'string', format: 'date-time', description: 'Expiration time of the session' },
          },
        },
        Token: {
          type: 'object',
          properties: {
            token_id: { type: 'integer', description: 'Token ID' },
            user_id: { type: 'integer', description: 'Reference to User ID' },
            token: { type: 'string', description: 'Unique token for authentication' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of token creation' },
            expires_at: { type: 'string', format: 'date-time', description: 'Expiration time of the token' },
          },
        },
        Blog: {
          type: 'object',
          properties: {
            blog_id: { type: 'integer', description: 'Blog ID' },
            class_id: { type: 'integer', description: 'Reference to Class ID' },
            teacher_id: { type: 'integer', description: 'Reference to Teacher ID' },
            title: { type: 'string', description: 'Blog title' },
            content: { type: 'string', description: 'Blog content' },
            resource_url: { type: 'string', description: 'URL of the resource or video' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of blog creation' },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            comment_id: { type: 'integer', description: 'Comment ID' },
            blog_id: { type: 'integer', description: 'Reference to Blog ID' },
            user_id: { type: 'integer', description: 'Reference to User ID' },
            content: { type: 'string', description: 'Comment content' },
            created_at: { type: 'string', format: 'date-time', description: 'Timestamp of comment creation' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
