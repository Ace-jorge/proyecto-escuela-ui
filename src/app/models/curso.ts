export interface Curso {
  id: number;
  grupo: string;
  nombreMateria: string;
  nombreProfesor: string;
}

export interface CreateCursoRequest {
    grupo: string;
    materiaId: number;
    profesorId: number;
}
