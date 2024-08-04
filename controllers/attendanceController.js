const db  = require('../models');
const Attendance = db.Attendance;
exports.getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ message: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    if(!req.body.create_at){
      attendance.create_at = new Date();
    }
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      await attendance.update(req.body);
      res.json(attendance);
    } else {
      res.status(404).json({ message: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      await attendance.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};
