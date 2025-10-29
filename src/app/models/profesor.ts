export interface Profesor {
  id: number;
  nombre: string;
  apellido: string;
  matricula: string;
  email: string;
  fechaNacimiento: string;
  genero: string;
  profesion: string;
}

export interface CreateProfesorRequest {
    nombre: string;
    apellido: string;
    matricula: string;
    email: string;
    password?: string;
    fechaNacimiento: string;
    genero: string;
    profesion: string;
}
