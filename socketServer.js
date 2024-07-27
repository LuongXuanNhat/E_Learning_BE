const { Server } = require('socket.io');
const { Enrollment, Class } = require('./models'); // Adjust the path as needed
const { Op } = require('sequelize');
// const { setupAdminUI } = require('socket.io-admin-ui');
let io;

const setupSocketServer = (server) => {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Emit an event to check and update the status
    socket.on('checkRegistrations', async () => {
      console.log('Received checkRegistrations request');
      try {
        // Get the current date
        const currentDate = new Date();

        // Find all enrollments with past registration dates
        const enrollments = await Enrollment.findAll({
          where: {
            registration_date: { [Op.lt]: currentDate },
            status: true
          },
          include: [{ model: Class }]
        });

        // Update status based on student count
        for (const enrollment of enrollments) {
          const studentCount = await Enrollment.count({
            where: { class_id: enrollment.class_id, status: true }
          });

          if (studentCount <= 1) {
            await Enrollment.update({ status: false }, {
              where: { class_id: enrollment.class_id, registration_date: { [Op.lt]: currentDate } }
            });
            console.log(`Status updated for class ${enrollment.class_id}`);
            io.emit('statusUpdated', {
              class_id: enrollment.class_id,
              status: false
            });
          }
        }
      } catch (error) {
        console.error(error);
        io.emit('error', { message: 'An error occurred while checking registrations' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = { setupSocketServer };
