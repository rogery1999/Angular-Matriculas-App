import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IAlumnoCreateData,
  ICurso,
  InscripcionesCurso,
  ISpecificUser,
} from '../../interfaces/alumnos';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.css'],
})
export class AlumnoDetailComponent implements OnInit {
  editar = false;
  alumno?: ISpecificUser;
  alumnoId: number = 0;
  cursos: ICurso[] = [];

  formularioAlumno: FormGroup = this.fb.group({
    nombres: [],
    apellidos: [],
    fechaNacimiento: [],
    sexo: [],
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private as: AlumnoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { idAlumno } = this.activatedRoute.snapshot.params;
    if (idAlumno === 'newAlumno') {
      this.alumnoId = -1;
    } else {
      this.alumnoId = parseInt(idAlumno);
      this.getDetail();
      this.changeFormStatus(this.editar);
    }
  }

  getDetail() {
    this.as.getAlumno(this.alumnoId).subscribe((response) => {
      this.alumno = { ...response };
      this.cursos = this.transformToCursos(response.inscripcionesCursos);
      this.formularioAlumno.controls['nombres'].setValue(response.nombres);
      this.formularioAlumno.controls['apellidos'].setValue(response.apellidos);
      this.formularioAlumno.controls['fechaNacimiento'].setValue(
        response.fechaNacimiento.split('T')[0]
      );
      this.formularioAlumno.controls['sexo'].setValue(response.sexo);
    });
  }

  actualizar() {
    const { nombres, apellidos, fechaNacimiento, sexo } =
      this.formularioAlumno.value;
    const alumnoClone: any = {
      apellidos,
      fechaNacimiento,
      nombres,
      sexo,
    };
    console.log('alumno', alumnoClone);
    this.as.update(alumnoClone, this.alumnoId).subscribe((response) => {
      this.alumno = { ...this.alumno!, ...response };
      this.editar = false;
      this.changeFormStatus(false);
    });
  }

  transformToCursos(inscripciones: InscripcionesCurso[]): ICurso[] {
    return inscripciones.map(({ curso, id, notas }) => {
      return {
        descripcion: curso.descripcion,
        id: curso.id,
        nombre: curso.nombre,
        obligatorio: curso.obligatoriedad,
        inscripcionId: id,
        notas: {
          final: notas.final,
          id: notas.id,
          parcial: notas.parcial,
          practica_1: notas.practica_1,
          practica_2: notas.practica_2,
          practica_3: notas.practica_3,
        },
      };
    });
  }

  toggleEditar() {
    this.editar = !this.editar;
    this.changeFormStatus(this.editar);
  }

  changeFormStatus(value: boolean) {
    if (value) {
      this.formularioAlumno.controls['nombres'].enable();
      this.formularioAlumno.controls['apellidos'].enable();
      this.formularioAlumno.controls['fechaNacimiento'].enable();
      this.formularioAlumno.controls['sexo'].enable();
    } else {
      this.formularioAlumno.controls['nombres'].disable();
      this.formularioAlumno.controls['apellidos'].disable();
      this.formularioAlumno.controls['fechaNacimiento'].disable();
      this.formularioAlumno.controls['sexo'].disable();
    }
  }

  crear() {
    const { nombres, apellidos, fechaNacimiento, sexo } =
      this.formularioAlumno.value;
    const data: IAlumnoCreateData = {
      apellidos,
      fechaNacimiento,
      nombres,
      sexo,
    };
    console.log('data', data);
    this.as.create(data).subscribe((response) => {
      window.history.back();
    });
  }

  editarNotas(notasId: number) {
    this.router.navigateByUrl(`alumno/notas/${notasId}`);
  }
}
