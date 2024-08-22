const ClassDTO = require("./ClassDTO");
const CourseDTO = require("./CourseDTO");
const UserDTO = require("./UserDTO");

class ClassListDTO {
  constructor(classDetails, courseDetails = null, userDetails, totalRegister) {
    this.class_id = classDetails.class_id;
    if (classDetails && classDetails.course_id)
      this.course_id = classDetails.course_id;
    this.advisor_id = classDetails.advisor_id;
    this.name = classDetails.name;
    this.description = classDetails.description;
    this.schedule = classDetails.schedule;
    this.created_at = classDetails.created_at;
    this.Course = courseDetails ? new CourseDTO(courseDetails) : null;
    this.Advisor = userDetails ? new UserDTO(userDetails) : null;
    this.totalRegister = totalRegister;
  }
}

module.exports = ClassListDTO;
