import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor, CreateProfesorRequest } from '../models/profesor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:8080/api/admin/profesores';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createProfesor(profesor: CreateProfesorRequest): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, profesor, { headers: this.getAuthHeaders() });
  }

  updateProfesor(id: number, profesor: Partial<CreateProfesorRequest>): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}/${id}`, profesor, { headers: this.getAuthHeaders() });
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
