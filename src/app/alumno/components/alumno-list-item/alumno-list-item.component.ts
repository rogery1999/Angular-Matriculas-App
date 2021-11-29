import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAlumno } from '../../interfaces/alumnos';

@Component({
  selector: 'app-alumno-list-item',
  templateUrl: './alumno-list-item.component.html',
  styleUrls: ['./alumno-list-item.component.css'],
})
export class AlumnoListItemComponent implements OnInit {
  @Input() alumno?: IAlumno;
  @Output() eliminar = new EventEmitter<number>();
  fechaNacimiento: string = '';

  constructor() {}

  ngOnInit(): void {
    this.fechaNacimiento = this.alumno!.fechaNacimiento.split('T')[0]
      .split('-')
      .reverse()
      .join('-');
  }

  delete(event: any) {
    event.stopPropagation();
    this.eliminar.emit(this.alumno!.id);
  }
}
