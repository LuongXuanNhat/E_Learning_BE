const ClassDTO = require('./ClassDTO');
const CourseDTO = require('./CourseDTO');
const UserDTO = require ('./UserDTO')
// const ClassStatus =require('./classStatus');
class ClassListDTO {
    constructor(classDetails, courseDetails = null,userDetails, isRegistered) {
        this.class_id = classDetails.class_id;
        this.course_id = classDetails.course_id;
        this.advisor_id = classDetails.advisor_id;
        this.name = classDetails.name;
        this.description = classDetails.description;
        this.schedule = classDetails.schedule;
        this.created_at = classDetails.created_at;
        this.isRegistered = isRegistered;
        this.Course = new CourseDTO(courseDetails);
        this.Advisor = userDetails ? new UserDTO(userDetails) : null;
    }
}

module.exports = ClassListDTO;
