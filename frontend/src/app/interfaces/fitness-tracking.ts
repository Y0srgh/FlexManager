export interface FitnessMetrics {
    id?: string;
    date: Date;
    weight: number;
    caloriesBurned: number;
    muscleGain: number;
    fatPercentage: number;
    height: number;
    notes?: string;
  }