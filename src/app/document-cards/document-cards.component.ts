import { Component } from '@angular/core';
import { Documentt } from '../model/Document';
import { Course } from '../model/Course';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentService } from '../service/document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-document-cards',
  templateUrl: './document-cards.component.html',
  styleUrl: './document-cards.component.css'
})
export class DocumentCardsComponent {
  displayedColumns: string[] = ['documentID', 'title', 'content'];
  dataSource: Documentt[] = [];
  courses: Course[] = [];
  searchTerm: string = '';
  title = 'autocomplete';
  options = ["Sam", "Varun", "Jasmine"];
  filteredOptions: string[] = [];
  formGroup: FormGroup = new FormGroup({});
  constructor(private documentService: DocumentService,private aroute: ActivatedRoute, private route: Router, private courseService: CourseService,private fb : FormBuilder) { }

  ngOnInit(): void {
    const courseId = this.aroute.snapshot.paramMap.get('courseId');
    this.documentService.getDocuments().subscribe(data => {
      this.dataSource = data.filter(document => document.CourseDoc.courseID === courseId);
      this.courseService.getCourses().subscribe(courses => {
        this.courses = courses;
      });
      this.getNames();
    });
  }

  deleteDocument(documentID: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.documentService.deleteDocument(documentID).subscribe(
        {
          next: () => {
            this.dataSource = this.dataSource.filter((document) => document.documentID !== documentID);
            console.log('Document deleted successfully');
          },
          error: (err) => console.error('Failed to delete Document: ', err)
        }
      );
    }
  }

  updateDocument(documentID: string) {
    this.route.navigate(['ui-components/updatedocument', documentID]);
  }

  affectCourse(documentId: string, courseId: string) {
    this.documentService.affectDocumentToCourse(documentId, courseId).subscribe(
      response => {
        alert('Document successfully affected to course: ' + response);
        this.ngOnInit();
      },
      error => {
        alert('Failed to affect document to course: ' + error.error);
      }
    );
  }

  desaffectCourse(documentId: string, courseId: string) {
    this.documentService.desaffectDocumentFromCourse(documentId, courseId).subscribe(() => {
      alert('Document successfully desaffected from course');
      this.ngOnInit();
    });
  }
  searchDocument() {
    this.dataSource = this.dataSource.filter(document => document.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  filterData(enteredData: string){
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().includes(enteredData.toLowerCase())
    })
  }
  
  getNames(){
    this.documentService.getDocuments().subscribe(response => {
      this.options = response.map(document => document.title);
      this.filteredOptions = [...this.options];
    })
  }
}
