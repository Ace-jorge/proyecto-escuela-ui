import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso, CreateCursoRequest } from '../models/curso';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/admin/cursos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createCurso(curso: CreateCursoRequest): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso, { headers: this.getAuthHeaders() });
  }

  updateCurso(id: number, curso: Partial<CreateCursoRequest>): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso, { headers: this.getAuthHeaders() });
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
