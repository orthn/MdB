export interface LeaderboardEntry {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  completedLevels: number;
  displayName: {
    $ifNull: ['$user.username', 'Spieler']
  }
}
