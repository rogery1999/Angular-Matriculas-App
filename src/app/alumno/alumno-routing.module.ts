import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoDetailComponent } from './pages/alumno-detail/alumno-detail.component';
import { AlumnosListComponent } from './pages/alumnos-list/alumnos-list.component';
import { NotasCursosComponent } from './pages/notas-cursos/notas-cursos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listado',
        component: AlumnosListComponent,
      },
      {
        path: ':idAlumno',
        component: AlumnoDetailComponent,
      },
      {
        path: 'notas',
        component: NotasCursosComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'listado',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
