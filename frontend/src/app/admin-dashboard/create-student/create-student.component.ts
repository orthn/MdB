import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {ApiService} from '../../services/api.service';
import {ICONS} from '../../data/icons';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-create-student',
  standalone: false,
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss'
})
export class CreateStudentComponent {
  httpError: any ;
  saving: boolean = false;
  icons = ICONS;
  user: User = {
    firstName: '', gender: 'male', isLocked: false, isTeacher: false, lastName: '', password: '', username: '',
    settings: {showHints: false, showAnimations: false}
  }

  constructor(private api: ApiService, private toast: ToastService) {
  }

  create() {
    this.saving = true;
    const label = this.user.gender === 'female' ? 'Schülerin' : 'Schüler';
    this.api.createUser(this.user).subscribe({
      next: (response) => {
        this.toast.show(`${label} ${this.user.firstName} wurde erstellt!`, 'success');
        this.clearInputs()
        this.saving = false;
        },
      error: (error) => {
        this.toast.show(`${label} konnte nicht erstellt werden`, 'error');
        this.httpError = error;
        this.saving = false;
      }
    })
  }

  clearInputs() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.gender = 'male';
  }
}
