export interface Client {
  /*
  
  {
    "createdAt": "2025-01-27T08:55:44.714Z",
    "updatedAt": "2025-01-27T08:55:44.714Z",
    "deletedAt": null,
    "id": "464a7f57-a0de-4a44-9bae-46fc77c59db6",
    "physicalDetails": {
      "weight": 70,
      "height": 175,
      "age": 30
    },
    "preferredCoachId": null,
    "gender": "Male",
    "goal": [
      "Weight Loss",
      "Flexibility"
    ],
    "nutritionAssistanceType": "AI",
    "mealTracking": null,
    "progressTracking": null,
    "subscriptionStatus": null,
    "paymentInfo": null,
    "parentAccount": null,
    "user": {
      "createdAt": "2025-01-27T08:55:44.606Z",
      "updatedAt": "2025-01-27T08:55:44.606Z",
      "deletedAt": null,
      "id": "464a7f57-a0de-4a44-9bae-46fc77c59db6",
      "username": "client13",
      "email": "clien13@example.com",
      "password": "$2b$10$UsqDS0/pQhciYjzKcFDTTeoCqgkaGC4veDQAlexmRXKCf1tBeML5.",
      "phone": null,
      "role": "client",
      "salt": "$2b$10$UsqDS0/pQhciYjzKcFDTTe"
    }
  },
  */
 
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  physicalDetails: {
    weight: number;
    height: number;
    age: number;
  };
  preferredCoachId: string;
  gender: string;
  goal: string[];
  nutritionAssistanceType: string;
  mealTracking: string;
  progressTracking: string;
  subscriptionStatus: string;
  paymentInfo: string;
  parentAccount: string;
}
