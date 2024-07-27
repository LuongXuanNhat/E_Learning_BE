// dto/CourseDTO.js
class CourseDTO {
    constructor(courseDetails) {
      this.course_id = courseDetails.course_id || null;
      this.name = courseDetails.name|| null;
      this.description = courseDetails.description|| null;
      this.status = courseDetails.status|| null;
      this.start_date = courseDetails.start_date|| null;
      this.end_date = courseDetails.end_date|| null;
      this.registration_deadline = courseDetails.registration_deadline|| null;
      this.image_url = courseDetails.image_url|| null;
      this.created_at = courseDetails.created_at || null;
    }
  }
  
  module.exports = CourseDTO;