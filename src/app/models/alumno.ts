export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  matricula: string;
  email: string;
  fechaNacimiento: string; // Assuming string for simplicity, can be Date
  genero: string;
  semestre: number;
  nombreCarrera?: string;
}

export interface CreateAlumnoRequest {
    nombre: string;
    apellido: string;
    matricula: string;
    email: string;
    password?: string; // Password is optional on update
    fechaNacimiento: string;
    genero: string;
    semestre: number;
    carreraId?: number;
}
