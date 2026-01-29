import {Component, OnInit} from '@angular/core';
import {ICONS} from '../../data/icons';
import {Course} from '../../models/Course';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-edit-class',
  standalone: false,
  templateUrl: './edit-class.component.html',
  styleUrl: './edit-class.component.scss'
})
export class EditClassComponent implements OnInit {
  httpError: any;
  icons = ICONS;

  course: Course = {
    description: '', name: '', students: []
  }

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private toast: ToastService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('classId')) {
      this.course._id = String(this.route.snapshot.paramMap.get('classId'));
      this.api.getCourseById(this.course._id).subscribe({
        next: course => {
          this.course = course
        },
        error: error => {
          this.httpError = error;
          this.toast.show("Klasse konnte nicht geladen werden.", "error");
        }
      })
    }
  }

  save() {
    this.api.updateCourse(this.course).subscribe({
      next: result => {
        this.toast.show("Änderungen gespeichert!", "success");
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.httpError = error;
        this.toast.show("Fehler beim speichern der Änderungen", "error");
      }
    })
  }
}
