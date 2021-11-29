import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notas } from '../interfaces/alumnos';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  host = environment.host;

  constructor(private http: HttpClient) {}

  public get url(): string {
    return `${this.host}/notas`;
  }

  updateGrade(notasId: number, grades: any) {
    return this.http.put<Notas>(`${this.url}/${notasId}`, { ...grades });
  }

  getGrade(notasId: number) {
    return this.http.get<Notas>(`${this.url}/${notasId}`);
  }
}
