import { Component,OnInit } from '@angular/core';
import { Course } from '../model/Course';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../service/course.service';
import { DocumentService } from '../service/document.service';
import { CourseDetailsComponent } from '../course-details/course-details.component';

@Component({
  selector: 'app-course-cards',
  templateUrl: './course-cards.component.html',
  styleUrl: './course-cards.component.css'
})
export class CourseCardsComponent implements OnInit{
  displayedColumns: string[] = ['courseID', 'title', 'disponibility', 'courseType', 'Actions'];
  dataSource: Course[] = [];

  constructor(private courseService: CourseService, private route: Router, private dialog: MatDialog, private documentService: DocumentService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.dataSource = data;
      console.log(data)
      
    })
  }

  deleteCourse(courseID: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseID).subscribe(
        {
          next: () => {
            this.dataSource = this.dataSource.filter((course) => course.courseID !== courseID);
            console.log('Course deleted successfully');
          },
          error: (err) => console.error('Failed to delete course: ', err)
        }
      );
    }
  }

  updateCourse(courseID: string) {
    this.route.navigate(['ui-components/updatecourse', courseID]);
  }

  showCourseDetails(course: Course) {
    this.courseService.getCourseByID(course.courseID).subscribe(courseWithDocuments => {
      console.log("list docs:", courseWithDocuments);
      this.dialog.open(CourseDetailsComponent, {
        data: {
          course: courseWithDocuments,
          documentts: courseWithDocuments.documentts
        }
      });
    });
  }

}
