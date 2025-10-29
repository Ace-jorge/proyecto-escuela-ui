import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno, CreateAlumnoRequest } from '../models/alumno';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = 'http://localhost:8080/api/admin/alumnos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createAlumno(alumno: CreateAlumnoRequest): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno, { headers: this.getAuthHeaders() });
  }

  updateAlumno(id: number, alumno: Partial<CreateAlumnoRequest>): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno, { headers: this.getAuthHeaders() });
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
