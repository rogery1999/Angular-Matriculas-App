import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IAlumno,
  IAlumnoCreateData,
  IAlumnoDetail,
} from '../interfaces/alumnos';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  host = environment.host;

  constructor(private http: HttpClient) {}

  private get url(): string {
    return `${this.host}/alumno`;
  }

  getAll(): Observable<IAlumno[]> {
    return this.http.get<IAlumno[]>(`${this.url}`);
  }

  create(data: IAlumnoCreateData): Observable<IAlumno> {
    return this.http.post<IAlumno>(`${this.url}`, { ...data });
  }

  update(alumno: IAlumno): Observable<IAlumno> {
    return this.http.put<IAlumno>(`${this.url}`, { ...alumno });
  }

  delete(alumnoId: number): Observable<IAlumno> {
    return this.http.delete<IAlumno>(`${this.url}/${alumnoId}`);
  }

  getAlumno(alumnoId: number): Observable<IAlumnoDetail> {
    return this.http.get<IAlumnoDetail>(`${this.url}/${alumnoId}`);
  }
}
