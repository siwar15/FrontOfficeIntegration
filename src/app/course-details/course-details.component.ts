import { Component, Inject, Input } from '@angular/core';
import { Course } from '../model/Course';
import { Documentt } from '../model/Document';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  @Input() course: Course;
  @Input() documentts: Documentt[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.course = data.course;
    this.documentts = data.documentts;
  }
}