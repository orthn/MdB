import {Level} from './Level';

export class Challenge {
  _id?: string;
  title!: string;
  description!: string;
  principle!: string;
  order?: number;
  isActive!: boolean;
  timestamp?: string;
  levels!: Level[];
}
