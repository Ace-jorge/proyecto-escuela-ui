import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { CarreraListComponent } from './components/carrera/carrera-list.component';
import { AlumnoListComponent } from './components/alumno/alumno-list.component';
import { ProfesorListComponent } from './components/profesor/profesor-list.component';
import { MateriaListComponent } from './components/materia/materia-list.component';
import { CursoListComponent } from './components/curso/curso-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'carreras', component: CarreraListComponent },
      { path: 'alumnos', component: AlumnoListComponent },
      { path: 'profesores', component: ProfesorListComponent },
      { path: 'materias', component: MateriaListComponent },
      { path: 'cursos', component: CursoListComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
