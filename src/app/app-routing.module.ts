import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'alumno',
    loadChildren: () =>
      import('./alumno/alumno.module').then((m) => m.AlumnoModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'alumno',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
