export class PrivateReservation {
  id?: string;  
  coachId: string;  
 
  date: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;  
  state?: string;  
  username?: string; 

  constructor(
   
    coachId: string,  
   
    date: string, 
    startTime: string, 
    endTime: string,
    
  ) {
  
    this.coachId = coachId;
  
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    
  }
}