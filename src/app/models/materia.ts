import { Carrera } from "./carrera";

export interface Materia {
  id: number;
  nombre: string;
  carrerasAsignadas?: Carrera[]; // New field
}

export interface CreateMateriaRequest {
    nombre: string;
}
