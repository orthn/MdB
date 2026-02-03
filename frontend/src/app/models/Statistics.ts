export class Statistics {
  totalCompletedLevels?: number;
  totalAttempts?: number;
  levelsPerChallenge?: ChallengeStats[];
}

export interface ChallengeStats {
  challengeId: string;
  title: string;
  completed: number;
  total: number;
}
