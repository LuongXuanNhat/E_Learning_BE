// dto/ClassDTO.js
class ClassDTO {
    constructor(classDetails) {
      this.class_id = classDetails.class_id;
      this.name = classDetails.name;
      this.description = classDetails.description;
      this.schedule = classDetails.schedule;
      this.created_at = classDetails.created_at;
    }
  }
  
  module.exports = ClassDTO;
  