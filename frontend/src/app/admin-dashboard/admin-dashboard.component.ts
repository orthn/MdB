import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ToastService} from '../services/toast.service';
import {User} from '../models/User';
import {Course} from '../models/Course';
import {ICONS} from '../data/icons';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  breadcrumbLabel: string = 'Dashboard';
  icons = ICONS;
  httpError: any;
  isTeacher: boolean = false;

  students: User[] = [];
  courses: Course[] = [];

  constructor(private api: ApiService,
              private toast: ToastService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.isLoggedIn()
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.isTeacher = this.userService.isTeacher();
    if (!this.userService.isTeacher()) {
      this.router.navigate(['/login']);
    }
    this.loadStudents()
    this.loadCourses()
  }

  loadStudents(): void {
    this.api.getAllUsers().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (err) => {
        this.httpError = err;
      }
    })
  }

  loadCourses(): void {
    this.api.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        this.httpError = err;
      }
    })
  }

  deleteStudent(student: User): void {
    const label = student.gender === 'female' ? 'Schülerin' : 'Schüler';
    this.api.deleteUser(student?._id ?? '').subscribe({
      next: (response) => {
        this.toast.show(
          `${label} ${student.firstName} wurde gelöscht`,
          'success'
        );
        this.loadStudents()
      },
      error: (error) => {
        this.toast.show("Fehler beim Löschen", "error");
        this.httpError = error;
      }
    })
  }

  deleteCourse(course: Course): void {
    this.api.deleteCourse(course?._id ?? '').subscribe({
      next: (response) => {
        this.toast.show(`Klasse ${course.name} wurde gelöscht`, "success");
        this.loadCourses()
        // Focus the "Klassen" tab
        const classesTabButton = document.querySelector('#classes-tab') as HTMLElement;
        classesTabButton.focus()
      },
      error: (error) => {
        this.toast.show("Fehler beim Löschen der Klasse", "error");
        this.httpError = error;
      }
    })
  }

  resetPassword(student: User): void {
    this.api.resetPassword(student?._id ?? '').subscribe({
      next: (response) => {
        this.toast.show(`Passwort für ${student.username} zurückgesetzt`, "success");
        this.loadStudents()
      },
      error: (error) => {
        this.toast.show("Fehler beim Zurücksetzen des Passworts!", "error");
        this.httpError = error;
      }
    })
  }
}
