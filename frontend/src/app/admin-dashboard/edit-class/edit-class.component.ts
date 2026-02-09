import {Component, OnInit} from '@angular/core';
import {ICONS} from '../../data/icons';
import {Course} from '../../models/Course';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-edit-class',
  standalone: false,
  templateUrl: './edit-class.component.html',
  styleUrl: './edit-class.component.scss'
})
export class EditClassComponent implements OnInit {
  protected readonly icons = ICONS;
  protected course: Course = {description: '', name: ''}
  protected students: User[] = [];

  protected selectedStudentIds: string[] = [];

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else if (!this.userService.isTeacher()) {
      this.router.navigate(['/home']);
    }
    this.loadStudents()
    this.loadCourse()
  }

  private loadStudents(): void {
    this.api.getAllUsers().subscribe({
      next: (students: User[]) => {
        this.students = students;
      }
    })
  }

  private loadCourse(): void {
    if (this.route.snapshot.paramMap.get('classId')) {
      this.course._id = String(this.route.snapshot.paramMap.get('classId'));
      this.api.getCourseById(this.course._id).subscribe({
        next: (course: Course) => {
          this.course = course
          this.selectedStudentIds = course.students?.map((s: any) => s._id || s) || [];
        },
        error: () => {
          this.toast.show("Klasse konnte nicht geladen werden.", "error");
        }
      })
    }
  }

  protected save() {
    if (!this.course?._id) return;
    const payload: Course = {
      ...this.course,
      students: this.selectedStudentIds.map(String)
    };

    this.api.updateCourse(payload).subscribe({
      next: () => {
        this.toast.show("Änderungen gespeichert!", "success");
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toast.show("Fehler beim speichern der Änderungen", "error");
      }
    });
  }
}
