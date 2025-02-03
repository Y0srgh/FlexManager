export class Coach {
  constructor(
    public id: string,               // ID du coach (UUID)
    public specialty: string,        // expertise dans le back
    public name: string,             // username dans le back
    public image: string = 'path/to/default/image.jpg'  // Image (photo par défaut si non fournie)
  ) {}
}
