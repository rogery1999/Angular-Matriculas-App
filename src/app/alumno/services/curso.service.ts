import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  host = environment.host;

  constructor(private http: HttpClient) {}

  public get url(): string {
    return `${this.host}/curso`;
  }

  addGrade(gradeId: string, grade: number) {
    return this.http.put(`${this.url}/grade`, { gradeId, grade });
  }
}
