import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICurso, INotas } from '../../interfaces/alumnos';

@Component({
  selector: 'app-curso-item',
  templateUrl: './curso-item.component.html',
  styleUrls: ['./curso-item.component.css'],
})
export class CursoItemComponent implements OnInit {
  @Input() curso?: ICurso;
  @Output() editar = new EventEmitter<number>();

  notas: { label: string; nota: number | null }[] = [];

  constructor() {}

  itemClass() {
    return `item ${this.curso!.obligatorio ? 'obligatorio' : ''}`;
  }

  ngOnInit(): void {
    this.transformNotas();
  }

  editarHandler() {
    this.editar.emit(this.curso!.id);
  }

  transformNotas() {
    const notas: { label: string; nota: number | null }[] = [];
    for (const nota in this.curso!.notas) {
      const key: keyof INotas = nota as any;
      notas.push({ label: nota, nota: this.curso!.notas[key] });
    }
    this.notas = [...notas];
  }
}
