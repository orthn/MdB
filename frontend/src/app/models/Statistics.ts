export class Statistics {
  totalCompletedLevels?: number;
  totalAttempts?: number;
  levelsPerChallenge?: {
    [challengeTitle: string]: {
      completed: number;
      total: number
    }
  };
}
