export type LevelMode = 'code' | 'blocks' | 'mathematics'

export class Level {
  _id?: string
  challengeId!: string
  title!: string
  description!: string
  starterBlocks?: string[]
  starterCode?: string
  expectedOutput?: string
  expectedAnswer?: string        // ← neu für mathematics
  choices?: string[]             // ← neu: wenn gesetzt → Auswahl statt Freitext
  hints?: Hint[]
  solutions?: Solution[]
  order!: number
  difficulty!: 'easy' | 'medium' | 'hard'
  isActive!: boolean
  isCompleted?: boolean
  mode?: LevelMode
}

export interface Hint {
  text: string
  order?: number
}

export interface Solution {
  mode: 'code' | 'blocks'
  code?: string
  isCorrect?: boolean
  explanation?: string
  feedback?: string
}
