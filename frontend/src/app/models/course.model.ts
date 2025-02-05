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
  daysOfWeek: string[];

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
    capacity: number,
    daysOfWeek: string[] = [] 
  ) {
    this.id = id;
    this.title = title;
    this.coachId = coachId;  
    this.coachName = coachName;
    this.coachPhoto = coachPhoto ;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.capacity = capacity; 
    this.daysOfWeek = daysOfWeek;
  }
}
