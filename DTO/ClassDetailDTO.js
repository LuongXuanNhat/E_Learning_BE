// DTOs/ClassDetailDTO.js
class ClassDetailDTO {
    constructor(classItem, courseDetails, advisorDetails) {
      this.classId = classItem.class_id;
      this.className = classItem.name;
      this.classDescription = classItem.description;
      this.schedule = classItem.schedule;
      this.createdAt = classItem.created_at;
  
      if (courseDetails) {
        this.course = {
          courseId: courseDetails.course_id,
          courseName: courseDetails.name,
          courseDescription: courseDetails.description,
          courseStatus: courseDetails.status,
          courseStartDate: courseDetails.start_date,
          courseEndDate: courseDetails.end_date,
          registrationDeadline: courseDetails.registration_deadline,
          imageUrl: courseDetails.image_url,
          createdAt: courseDetails.created_at,
        };
      } else {
        this.course = null;
      }
  
      if (advisorDetails) {
        this.advisor = {
          advisor: advisorDetails.name,
        };
      } else {
        this.advisor = null;
      }
    }
  }
  
  module.exports = ClassDetailDTO;
  