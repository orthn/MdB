import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  httpError: any;
  loading = true;

  constructor(private api: ApiService, private userService: UserService, private router: Router ) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {this.router.navigate(['/login']);}
    if (this.userService.isTeacher()) {this.router.navigate(['/dashboard']);}
    this.loading = false;
  }
}
