import {Component, OnInit} from '@angular/core';
import {IconService} from './services/icon.service';
import {ToastService} from './services/toast.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private iconService: IconService, public toast: ToastService, private userService: UserService) {
  }

  ngOnInit(): void {
    const user = this.userService.getUser()

    if (!user.settings.showAnimations) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }

  title = 'frontend';
}
