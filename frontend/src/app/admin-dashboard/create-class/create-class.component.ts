import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
import {ICONS} from '../../data/icons';
import {Course} from '../../models/Course';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-class',
  standalone: false,
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export class CreateClassComponent implements OnInit {
  protected readonly icons = ICONS;
  protected course: Course = {description: '', name: ''}
  protected students: User[] = [];

  // loading indicator
  protected loading: boolean = true;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else if (!this.userService.isTeacher()) {
      this.router.navigate(['/home']);
    }

    this.loadStudents()
  }

  private loadStudents(): void {
    this.api.getAllUsers().subscribe({
      next: (students: User[]) => {
        this.students = students;
        this.loading = false;
      },
      error: () => {
        this.toast.show('Studenten konnten nicht geladen werden', 'error')
      }
    })
  }

  protected createClass() {
    this.api.createCourse(this.course).subscribe({
      next: () => {
        this.toast.show("Klasse wurde erstellt!", 'success');
        this.clearInputs()
      },
      error: () => {
        this.toast.show("Klasse konnte nicht erstellt werden", 'error');
      }
    })
  }

  private clearInputs() {
    this.course.name = '';
    this.course.description = '';
    this.course.students = [];
  }
}
