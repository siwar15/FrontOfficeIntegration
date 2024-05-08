import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://192.168.1.134:8071';


  constructor(private http : HttpClient) { }

  getCourses() {
    return this.http.get<any[]>(`${this.baseUrl}/Courses/afficherCourses`);
  }

  getCourseByID(courseID: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/Courses/retrievebyId/${courseID}`);
  }

  deleteCourse(courseID : string){
    return this.http.delete<any[]>(`${this.baseUrl}/Courses/delete/${courseID}`);
  }

  addCourse(course : Course){
      return this.http.post<any[]>(`${this.baseUrl}/Courses/addCourse`,course);
  }

  modifierCourse(courseData: FormData, courseId: string) {
    // course.courseID = courseId;
      return this.http.put<any[]>(`${this.baseUrl}/Courses/updateCourse/`+ courseId, FormData);
  }
}
