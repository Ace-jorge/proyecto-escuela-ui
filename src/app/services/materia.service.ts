import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia, CreateMateriaRequest } from '../models/materia';
import { AuthService } from './auth.service';
import { Carrera } from '../models/carrera';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'http://localhost:8080/api/admin/materias';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createMateria(materia: CreateMateriaRequest): Observable<Materia> {
    return this.http.post<Materia>(this.apiUrl, materia, { headers: this.getAuthHeaders() });
  }

  updateMateria(id: number, materia: Partial<CreateMateriaRequest>): Observable<Materia> {
    return this.http.put<Materia>(`${this.apiUrl}/${id}`, materia, { headers: this.getAuthHeaders() });
  }

  deleteMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getCarrerasForMateria(id: number): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.apiUrl}/${id}/carreras`, { headers: this.getAuthHeaders() });
  }

  updateCarrerasForMateria(id: number, carreraIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/carreras`, carreraIds, { headers: this.getAuthHeaders() });
  }
}
