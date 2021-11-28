import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IAlumno,
  IAlumnoCreateData,
  IAlumnoDetail,
  ICurso,
} from '../../interfaces/alumnos';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.css'],
})
export class AlumnoDetailComponent implements OnInit {
  editar = false;
  alumno?: IAlumnoDetail;
  alumnoId: number = 0;

  cursosMock: ICurso[] = [
    {
      descripcion: 'DESCRIPCION 1',
      id: 1,
      nombre: 'curso 1',
      obligatorio: 1,
      notas: {
        final: null,
        parcial: null,
        practica_1: 10,
        practica_2: 15,
        practica_3: 17,
      },
    },
    {
      descripcion: 'DESCRIPCION 2',
      id: 1,
      nombre: 'curso 2',
      obligatorio: 0,
      notas: {
        final: null,
        parcial: null,
        practica_1: 10,
        practica_2: 15,
        practica_3: 17,
      },
    },
  ];

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
      // this.getDetail();
      this.changeFormStatus(this.editar);
    }
  }

  getDetail() {
    this.as.getAlumno(this.alumnoId).subscribe((response) => {
      this.alumno = { ...response };

      this.formularioAlumno.controls['nombres'].setValue(response.nombres);
      this.formularioAlumno.controls['apellidos'].setValue(response.apellidos);
      this.formularioAlumno.controls['fechaNacimiento'].setValue(
        response.fechaNacimiento
      );
      this.formularioAlumno.controls['sexo'].setValue(response.sexo);
    });
  }

  actualizar() {
    const { nombres, apellidos, fechaNacimiento, sexo } =
      this.formularioAlumno.value;
    const alumnoClone: IAlumno = {
      apellidos,
      fechaNacimiento,
      id: this.alumnoId,
      nombres,
      sexo,
    };
    console.log('alumno', alumnoClone);
    this.as.update(alumnoClone).subscribe((response) => {
      this.alumno = { ...response };
      this.editar = false;
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
      this.router.navigate([`alumno/${response.id}`], { replaceUrl: true });
    });
  }
}
