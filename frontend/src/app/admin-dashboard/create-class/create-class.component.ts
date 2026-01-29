import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
import {ICONS} from '../../data/icons';
import {Course} from '../../models/Course';
import {User} from '../../models/User';

@Component({
  selector: 'app-create-class',
  standalone: false,
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export class CreateClassComponent implements OnInit {
  httpError: any;
  icons = ICONS;
  course: Course = {
    description: '', name: ''
  }

  students: User[] = [];

  constructor(private api: ApiService, private toast: ToastService) {
  }

  ngOnInit(): void {
    this.loadStudents()
  }

  loadStudents(): void {
    this.api.getAllUsers().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (err) => {
        this.httpError = err;
      }
    })
  }

  createClass() {
    this.api.createCourse(this.course).subscribe({
      next: (response) => {
        this.toast.show("Klasse wurde erstellt!", 'success');
        this.clearInputs()
      },
      error: (error) => {
        this.toast.show("Klasse konnte nicht erstellt werden", 'error');
        this.httpError = error;
      }
    })
  }

  clearInputs() {
    this.course.name = '';
    this.course.description = '';
    this.course.students = [];
  }
}
