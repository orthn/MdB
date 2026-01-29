import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = '';
  type: 'success' | 'error' | 'info' = 'info';
  visible = false;

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 6000) {
    this.message = message;
    this.type = type;
    this.visible = true;
    setTimeout(() => this.visible = false, duration);
  }
}
