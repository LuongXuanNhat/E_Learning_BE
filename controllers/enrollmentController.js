// const Enrollment = require('../models/Enrollment');
const db  = require('../models');
const Enrollment = db.Enrollment;
const Class = db.Class;
const Course  = db.Course;

const EnrollmentDTO = require('../DTO/EnrollmentDTO');
exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    const enrollmentDetails = await Promise.all(enrollments.map(async (enrollment) => {
      const classDetails = await Class.findByPk(enrollment.class_id);
      const courseDetails = await Course.findByPk(enrollment.course_id);
      return new EnrollmentDTO(enrollment, classDetails, courseDetails);
    }));
    res.json(enrollmentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.createEnrollment = async (req, res) => {
  try {
    if(!req.body.create_at){
      req.body.create_at = new Date();
    }
    if(!req.body.registration_date){
      req.body.registration_date = new Date();
    }
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
      await enrollment.update(req.body);
      res.json(enrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
      await enrollment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Có gì đó đã xảy ra! ' });
  }
};
