import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent implements OnInit {
  httpError: any;
  loading: boolean = true;
  constructor(private api: ApiService, private userService: UserService, private router: Router ) {
  }
    ngOnInit(): void {
      if (!this.userService.isLoggedIn()) {this.router.navigate(['/login']);}
      if (this.userService.isTeacher()) {this.router.navigate(['/dashboard']);}
      this.loading = false;
    }
}
