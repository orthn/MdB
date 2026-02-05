import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ApiService} from '../services/api.service';
import {ToastService} from '../services/toast.service';
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    NgIf
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected login: FormGroup;
  protected httpError: any;

  protected readonly faLock = faLock;
  protected readonly faEnvelope = faEnvelope;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private api: ApiService,
    private toast: ToastService
  ) {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.redirectUser()
    }
  }

  protected onSubmit() {
    if (this.login.invalid) return;
    this.api.login(this.login.value).subscribe({
      next: (response) => {
        this.userService.saveToken(response.token);
        // Apply settings from decoded JWT
        const user = this.userService.getUser();
        this.userService.applySettings(user?.settings);
        this.toast.show("Login erfolgreich!", "success");
        this.redirectUser();
      },
      error: () => {
        this.toast.show("Login fehlgeschlagen", "error");
      }
    });
  }

  private redirectUser() {
    const user = this.userService.getUser();
    if (user?.role === 'teacher') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
