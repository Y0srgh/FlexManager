export class PrivateReservation {
  id?: string;  
  coachId: string;  
  clientId: string;  
  date: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;  
  state?: string;  

  constructor(
   
    coachId: string,  
    clientId: string,  
    date: string, 
    startTime: string, 
    endTime: string,
    
  ) {
  
    this.coachId = coachId;
    this.clientId = clientId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    
  }
}
