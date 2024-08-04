// dto/EnrollmentDTO.js
const ClassDTO = require('./ClassDTO');
const CourseDTO = require('./CourseDTO');

class EnrollmentDTO {
  constructor(enrollment, classDetails, courseDetails) {
    this.enrollment_id = enrollment.enrollment_id;
    this.student_id = enrollment.student_id;
    // this.class_id = enrollment.class_id;
    // this.course_id = enrollment.course_id;
    this.status = enrollment.status;
    this.registration_date = enrollment.registration_date;
    this.created_at = enrollment.created_at;
    this.class_details = new ClassDTO(classDetails);
    this.course_details = new CourseDTO(courseDetails);
  }
}

module.exports = EnrollmentDTO;
