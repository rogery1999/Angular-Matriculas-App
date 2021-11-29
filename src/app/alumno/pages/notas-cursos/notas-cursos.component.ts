import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Notas } from '../../interfaces/alumnos';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-notas-cursos',
  templateUrl: './notas-cursos.component.html',
  styleUrls: ['./notas-cursos.component.css'],
})
export class NotasCursosComponent implements OnInit {
  notasId = 0;
  notas?: Notas;
  editar = false;

  formularioNotas: FormGroup = this.fb.group({
    practica_1: [],
    practica_2: [],
    practica_3: [],
    parcial: [],
    final: [],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private cs: CursoService
  ) {}

  ngOnInit(): void {
    this.notasId = this.activatedRoute.snapshot.params['idNotas'];
    this.changeFormStatus(false);
    this.getGrades();
  }

  toggleEditar() {
    this.editar = !this.editar;
    this.changeFormStatus(this.editar);
  }

  getGrades() {
    this.cs
      .getGrade(this.notasId)
      .subscribe(({ final, parcial, practica_1, practica_2, practica_3 }) => {
        this.notas = {
          ...this.notas!,
          final,
          parcial,
          practica_1,
          practica_2,
          practica_3,
        };
        this.formularioNotas.controls['practica_1'].setValue(practica_1);
        this.formularioNotas.controls['practica_2'].setValue(practica_2);
        this.formularioNotas.controls['practica_3'].setValue(practica_3);
        this.formularioNotas.controls['parcial'].setValue(parcial);
        this.formularioNotas.controls['final'].setValue(final);
      });
  }

  updateGrades() {
    const { practica_1, practica_2, practica_3, parcial, final } =
      this.formularioNotas.value;

    const notas = {
      practica_1: practica_1.length === 0 ? null : parseFloat(practica_1),
      practica_2: practica_2.length === 0 ? null : parseFloat(practica_2),
      practica_3: practica_3.length === 0 ? null : parseFloat(practica_3),
      parcial: parcial.length === 0 ? null : parseFloat(parcial),
      final: final.length === 0 ? null : parseFloat(final),
    };
    this.cs.updateGrade(this.notasId, { ...notas }).subscribe((response) => {
      this.notas = response;
      this.editar = false;
      this.changeFormStatus(false);
    });
  }

  changeFormStatus(isEnable: boolean) {
    if (isEnable) {
      this.formularioNotas.controls['practica_1'].enable();
      this.formularioNotas.controls['practica_2'].enable();
      this.formularioNotas.controls['practica_3'].enable();
      this.formularioNotas.controls['parcial'].enable();
      this.formularioNotas.controls['final'].enable();
    } else {
      this.formularioNotas.controls['practica_1'].disable();
      this.formularioNotas.controls['practica_2'].disable();
      this.formularioNotas.controls['practica_3'].disable();
      this.formularioNotas.controls['parcial'].disable();
      this.formularioNotas.controls['final'].disable();
    }
  }
}
