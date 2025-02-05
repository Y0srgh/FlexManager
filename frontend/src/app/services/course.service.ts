// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Course } from './course.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class CourseService {
//   private apiUrl = 'http://localhost:3000/courses'; // Change this if needed

//   constructor(private http: HttpClient) {}

//   getCourses(): Observable<Course[]> {
//     return this.http.get<Course[]>(this.apiUrl);
//   }

//   getCourse(id: number): Observable<Course> {
//     return this.http.get<Course>(`${this.apiUrl}/${id}`);
//   }

//   createCourse(course: Course): Observable<Course> {
//     return this.http.post<Course>(this.apiUrl, course);
//   }

//   updateCourse(id: number, course: Course): Observable<Course> {
//     return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
//   }

//   deleteCourse(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.patch<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

