import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrera } from '../models/carrera';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = 'http://localhost:8080/api/admin/carreras';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createCarrera(carrera: Omit<Carrera, 'id'>): Observable<Carrera> {
    return this.http.post<Carrera>(this.apiUrl, carrera, { headers: this.getAuthHeaders() });
  }

  updateCarrera(id: number, carrera: Omit<Carrera, 'id'>): Observable<Carrera> {
    return this.http.put<Carrera>(`${this.apiUrl}/${id}`, carrera, { headers: this.getAuthHeaders() });
  }

  deleteCarrera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  checkIfExists(nombre: string, codigo: string): Observable<boolean> {
    const params = new HttpParams().set('nombre', nombre).set('codigo', codigo);
    return this.http.get<boolean>(`${this.apiUrl}/exists`, { headers: this.getAuthHeaders(), params });
  }
}
