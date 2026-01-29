import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../models/User';
import {Course} from '../models/Course';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {Challenge} from '../models/Challenge';
import {Level} from '../models/Level';
import {UserProgress} from '../models/UserProgress';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000';
  private users: string = '/users';
  private classes: string = '/classes'
  private challenges: string = '/challenges';
  private progress: string = '/progress';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.baseUrl + this.users + '/getAll');
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + this.users + '/' + id);
  }

  createUser(user: User) {
    return this.http.post<User>(this.baseUrl + this.users + '/create', user);
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + this.users + '/' + id);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + this.users + '/' + user._id + '/update', user);
  }

  resetPassword(id: string) {
    return this.http.put(this.baseUrl + this.users + '/' + id + '/reset-password', id)
  }

  getAllCourses() {
    return this.http.get<Course[]>(this.baseUrl + this.classes + '/getAll')
  }

  createCourse(cla: Course) {
    return this.http.post(this.baseUrl + this.classes + '/create', cla);
  }

  deleteCourse(id: string) {
    return this.http.delete(this.baseUrl + this.classes + '/' + id);
  }

  getCourseById(id: string) {
    return this.http.get<Course>(this.baseUrl + this.classes + '/' + id);
  }

  updateCourse(course: Course) {
    return this.http.put(`${this.baseUrl}${this.classes}/${course._id}/update`, course);
  }

  login(loginBody: any): Observable<any> {
    return this.http.post(this.baseUrl + this.users + '/login', loginBody)
      .pipe(catchError(this.handleError));
  }

  getAllChallenges() {
    return this.http.get<Challenge[]>(this.baseUrl + this.challenges);
  }

  getLevelsOfChallenge(challengeId: string) {
    return this.http.get<Level[]>(this.baseUrl + this.challenges + '/' + challengeId + '/levels');
  }

  getLevelById(challengeId: string) {
    return this.http.get<Level>(this.baseUrl + this.challenges + '/' + challengeId + '/level');
  }

  getUserProgressByUserId(id: string) {
    return this.http.get<UserProgress>(this.baseUrl + this.progress + '/' + id);
  }

  getCompletedLevels(id:string) {
    return this.http.get<UserProgress[]>(this.baseUrl + this.progress + '/' + id+ '/completed');
  }

  updateUserProgress(progress: UserProgress) {
    return this.http.put(this.baseUrl + this.progress + '/' + progress.userId, progress);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
