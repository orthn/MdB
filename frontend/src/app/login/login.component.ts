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
  login: FormGroup;
  httpError: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private api: ApiService,
    private toast: ToastService
  ) {
    this.login = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      if (this.userService.getUser().isTeacher) {
        this.router.navigate(['/dashboard']);
      } else this.router.navigate(['/home']);
    }
  }

  protected readonly faLock = faLock;
  protected readonly faEnvelope = faEnvelope;

  onSubmit() {
    console.log('Login form submitted', this.login.value);

    const loginData = this.login.value;

    this.api.login(loginData).subscribe({
      next: (response) => {
        if (response.token) {
          this.toast.show("Login erfolgreich!", "success");
          this.userService.setUser(response.user);
          this.userService.applySettings(response.user.settings);
          this.userService.saveToken(response.token);

          if (this.userService.getUser().isTeacher) {
            this.router.navigate(['/dashboard']);
          } else this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.toast.show("Login fehlgeschlagen", "error");
        this.httpError = error;
      }
    });
  }
}
