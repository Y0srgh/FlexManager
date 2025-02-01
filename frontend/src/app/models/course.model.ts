export class Course {
  id: number;
  name: string;
  coachId: number; 
  coachName: string;
  coachPhoto: string; 
  description: string;
  duration: string;
  courseCapacity: number;  
  
  constructor(
    id: number,
    name: string,
    coachId: number,  
    coachName: string,
    coachPhoto: string,
    description: string,
    duration: string,
    courseCapacity: number 
  ) {
    this.id = id;
    this.name = name;
    this.coachId = coachId;  
    this.coachName = coachName;
    this.coachPhoto = coachPhoto;
    this.description = description;
    this.duration = duration;
    this.courseCapacity = courseCapacity; 
  }
}
