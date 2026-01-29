import {User} from './User';
import {Teacher} from './Teacher';

export class Course {
  _id?: string;
  name!: string;
  description!: string;
  students?: User[];
  teachers?: Teacher[];
}
