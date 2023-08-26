import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  login(payload: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/login`, payload).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
        } else {
          alert('Invalid Credentials');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
