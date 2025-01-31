export class Course {
  id: number;
  name: string;
  coachId: number;  // Ajout de l'ID du coach
  coachName: string;
  coachPhoto: string; 
  description: string;
  duration: string;
  courseCapacity: number;  
  
  constructor(
    id: number,
    name: string,
    coachId: number,  // Ajout dans le constructeur
    coachName: string,
    coachPhoto: string,
    description: string,
    duration: string,
    courseCapacity: number 
  ) {
    this.id = id;
    this.name = name;
    this.coachId = coachId;  // Affectation de l'ID du coach
    this.coachName = coachName;
    this.coachPhoto = coachPhoto;
    this.description = description;
    this.duration = duration;
    this.courseCapacity = courseCapacity; 
  }
}
