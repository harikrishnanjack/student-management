import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3001/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[] | any[]> {
    return this.http.get<Student[] | any[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, Student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, Student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.apiUrl}/${id}`);
  }
}
