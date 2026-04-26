
export class UserProgress {
  _id?: string;

  userId!: string;
  challengeId!: string;
  levelId!: string;

  completed!: boolean;
  attempts: number = 1
  completedAt?: string; // ISO date from backend

  createdAt?: string;
  updatedAt?: string;
}
