export class Course {
  id: string;
  title: string;
  coachId: string; 
  coachName: string;
  coachPhoto: string; 
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
  capacity: number;  
  
  constructor(
    id: string,
    title: string,
    coachId: string,  
    coachName: string,
    coachPhoto: string,
    description: string,
    startTime: string,
    endTime: string,
    duration: string,
    capacity: number 
  ) {
    this.id = id;
    this.title = title;
    this.coachId = coachId;  
    this.coachName = coachName;
    this.coachPhoto = coachPhoto || "assets/yoga.jpg";
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.capacity = capacity; 
  }
}
