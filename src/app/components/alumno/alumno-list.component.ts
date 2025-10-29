import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { Observable } from 'rxjs';
import { AlumnoFormComponent } from './alumno-form.component';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos$!: Observable<Alumno[]>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'matricula', 'email', 'semestre', 'nombreCarrera', 'actions'];

  constructor(
    private alumnoService: AlumnoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadAlumnos();
  }

  loadAlumnos(): void {
    this.alumnos$ = this.alumnoService.getAlumnos();
  }

  openDialog(alumno?: Alumno): void {
    const dialogRef = this.dialog.open(AlumnoFormComponent, {
      width: '500px',
      data: { alumno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (alumno) {
          // Update
          this.alumnoService.updateAlumno(alumno.id, result).subscribe(() => this.loadAlumnos());
        } else {
          // Create
          this.alumnoService.createAlumno(result).subscribe(() => this.loadAlumnos());
        }
      }
    });
  }

  deleteAlumno(id: number): void {
    if (confirm('Are you sure you want to delete this alumno?')) {
      this.alumnoService.deleteAlumno(id).subscribe(() => this.loadAlumnos());
    }
  }
}
