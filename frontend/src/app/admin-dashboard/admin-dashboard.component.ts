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
  protected readonly icons = ICONS;
  protected students: User[] = [];
  protected courses: Course[] = [];

  // loading indicator
  protected loading: boolean = true;

  isTeacher: boolean = false;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private toast: ToastService,
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
    this.loading = false;
  }

  private loadStudents(): void {
    this.api.getAllUsers().subscribe({
      next: (students: User[]) => {
        this.students = students;
      },
      error: () => {
        this.toast.show('Studenten konnten nicht geladen werden', 'error')
      }
    })
  }

  private loadCourses(): void {
    this.api.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: () => {
        this.toast.show('Klassen konnten nicht geladen werden', 'error')
      }
    })
  }

  protected deleteStudent(student: User): void {
    const label: string = student.gender === 'female' ? 'Schülerin' : 'Schüler';
    this.api.deleteUser(student?._id ?? '').subscribe({
      next: () => {
        this.toast.show(
          `${label} ${student.firstName} wurde gelöscht`,
          'success'
        );
        this.loadStudents()
      },
      error: () => {
        this.toast.show('Student konnte nicht gelöscht werden', "error");
      }
    })
  }

  protected deleteCourse(course: Course): void {
    this.api.deleteCourse(course?._id ?? '').subscribe({
      next: () => {
        this.toast.show(`Klasse ${course.name} wurde gelöscht`, "success");
        this.loadCourses()
        // Focus the "Klassen" tab
        const classesTabButton = document.querySelector('#classes-tab') as HTMLElement;
        classesTabButton.focus()
      },
      error: () => {
        this.toast.show('Klasse konnte nicht gelöscht werden', "error");
      }
    })
  }

  protected resetPassword(student: User): void {
    this.api.resetPassword(student?._id ?? '').subscribe({
      next: () => {
        this.toast.show(`Passwort für ${student.username} zurückgesetzt`, "success");
        this.loadStudents()
      },
      error: () => {
        this.toast.show("Passwort konnte nicht zurückgesetzt werden", "error");
      }
    })
  }

  protected addStudentToCourse(student: User, classId: string): void {
    this.api.addStudentToCourse(classId, student._id!)
      .subscribe({
        next: () => {
          this.toast.show(`${student.firstName} wurde zur Klasse hinzugefügt`, 'success');
          this.loadCourses();
        },
        error: () => {
          this.toast.show('Schüler konnte nicht hinzugefügt werden', 'error');
        }
      });
  }

  protected removeStudentFromCourse(student: User, classId: string): void {
    this.api.removeStudentFromCourse(classId, student._id!)
      .subscribe({
        next: () => {
          this.toast.show(`${student.firstName} wurde aus Klasse entfernt`, 'success');
          this.loadCourses();
        },
        error: () => {
          this.toast.show('Konnte Schüler nicht entfertn werden', 'error');
        }
      });
  }

  protected showStatistics(student: User) {

  }
}
