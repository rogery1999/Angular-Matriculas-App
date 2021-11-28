import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlumno } from '../../interfaces/alumnos';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css'],
})
export class AlumnosListComponent implements OnInit {
  alumnos: IAlumno[] = [
    {
      apellidos: 'Vargas',
      fechaNacimiento: '17-08-1999',
      id: 1,
      nombres: 'Rogery',
      sexo: 'M',
    },
  ];

  constructor(private as: AlumnoService, private router: Router) {}

  ngOnInit(): void {
    // this.getAllAlumnos();
  }

  getAllAlumnos() {
    this.as.getAll().subscribe((alumnos) => {
      this.alumnos = [...alumnos];
    });
  }

  deleteAlumno(alumnoId: number) {
    this.as.delete(alumnoId).subscribe((response) => {
      this.alumnos = this.alumnos.filter(({ id }) => id !== alumnoId);
    });
  }

  navigateToAdd(id?: number) {
    this.router.navigateByUrl(id ? `alumno/${id}` : 'alumno/newAlumno');
  }
}
