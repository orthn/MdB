import {Component, OnInit} from '@angular/core';
import {ICONS} from '../../data/icons';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';

@Component({
  selector: 'app-edit-student',
  standalone: false,
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent implements OnInit {
  httpError: any;
  saving = false;
  icons = ICONS;

  user: User = {
    firstName: '', gender: 'male', isLocked: false, isTeacher: false, lastName: '', password: '', username: '',
    settings: {showHints: false, showAnimations: false}
  }

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private toast: ToastService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('studentId')) {
      this.user._id = String(this.route.snapshot.paramMap.get('studentId'));
      this.api.getUserById(this.user._id).subscribe({
        next: student => {
         this.user = student
        },
        error: error => {
          this.httpError = error;
          this.toast.show("Error loading student", "error");
        }
      })
    }
  }

  save(): void {
    this.saving = true;
    this.api.updateUser(this.user).subscribe({
      next: result => {
        this.toast.show("Successfully updated student", "success");
        this.saving = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.toast.show("Error updating student", "error");
        this.httpError = error;
        this.saving = false;
      }
    })
  }
}
