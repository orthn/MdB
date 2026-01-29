export interface Hint {
  text: string;
  order?: number; // optional ordering
}

export interface Solution {
  mode: 'code' | 'blocks';   // can be 'code' or 'blocks'
  code?: string;             // code solution (optional if blocks)
  blocks?: string;           // block representation (optional if code)
  isCorrect?: boolean;        // true if this is a correct solution
  explanation?: string;      // optional explanation for wrong solutions
}

export class Level {
  _id?: string;
  challengeId!: string;
  title!: string;
  description!: string;
  starterCode?: string;        // initial code for the user
  expectedOutput?: string;     // expected output for validation
  hints?: Hint[];              // optional hints for the level
  solutions?: Solution[];      // multiple possible solutions
  order!: number;              // order in the challenge
  difficulty!: 'easy' | 'medium' | 'hard';
  isActive!: boolean;
  isCompleted?: boolean;
  mode?: 'code' | 'blocks'; // type of editor allowed
}
