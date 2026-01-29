import {UserSettings} from './UserSettings';

export class User {
  _id?: string;
  firstName!: string;
  lastName!: string;
  username!: string;
  password!: string;
  gender!: 'male' | 'female';
  isLocked!: boolean;
  isTeacher!: boolean;

  
  settings!: UserSettings;
}
