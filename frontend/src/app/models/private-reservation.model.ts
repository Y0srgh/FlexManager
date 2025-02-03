export class PrivateReservation {
    coachId: number;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    imageUrl: string;
  
    constructor(coachId: number, name: string, date: string, startTime: string, endTime: string, imageUrl: string) {
      this.coachId = coachId;
      this.name = name;
      this.date = date;
      this.startTime = startTime;
      this.endTime = endTime;
      this.imageUrl = imageUrl;
    }
  }