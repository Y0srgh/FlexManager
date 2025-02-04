export class PrivateReservation {
  id: string;  // ID de la réservation
  coachId: string;  // ID du coach
  clientId: string;  // ID du client
  date: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;  // Champ optionnel
  state: string;  // Nouvel attribut pour gérer l'état de la réservation

  constructor(
    id: string,  // ID de la réservation
    coachId: string,  // ID du coach
    clientId: string,  // ID du client
    date: string, 
    startTime: string, 
    endTime: string,
    state: string = 'pending'  // Valeur par défaut de l'état
  ) {
    this.id = id;
    this.coachId = coachId;
    this.clientId = clientId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.state = state;  // Initialisation de l'état avec la valeur par défaut
  }
}
