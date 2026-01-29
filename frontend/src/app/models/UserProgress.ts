
export class UserProgress {
  _id?: string;

  userId!: string;
  challengeId!: string;
  levelId!: string;

  completed!: boolean;
  attempts!: number;
  completedAt?: string; // ISO date from backend

  createdAt?: string;
  updatedAt?: string;
}
