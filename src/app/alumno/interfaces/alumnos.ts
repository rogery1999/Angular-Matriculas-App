export interface IAlumno {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: string;
}

export interface IAlumnoCreateData {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: string;
}

export interface ICurso {
  id: number;
  nombre: string;
  descripcion: string;
  obligatorio: number;
  notas: INotas;
}

export interface INotas {
  practica_1: number | null;
  practica_2: number | null;
  practica_3: number | null;
  parcial: number | null;
  final: number | null;
}

export interface IAlumnoDetail extends IAlumno {
  cursos?: ICurso[];
}
