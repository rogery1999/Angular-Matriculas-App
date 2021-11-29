import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoListItemComponent } from './components/alumno-list-item/alumno-list-item.component';
import { CursoItemComponent } from './components/curso-item/curso-item.component';
import { AlumnoDetailComponent } from './pages/alumno-detail/alumno-detail.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { NotasCursosComponent } from './pages/notas-cursos/notas-cursos.component';

@NgModule({
  declarations: [
    AlumnosListComponent,
    AlumnoDetailComponent,
    AlumnoListItemComponent,
    NotasCursosComponent,
    CursoItemComponent,
  ],
  imports: [CommonModule, AlumnoRoutingModule, ReactiveFormsModule],
})
export class AlumnoModule {}
