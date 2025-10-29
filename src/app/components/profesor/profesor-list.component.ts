import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor';
import { Observable } from 'rxjs';
import { ProfesorFormComponent } from './profesor-form.component';

@Component({
  selector: 'app-profesor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css']
})
export class ProfesorListComponent implements OnInit {
  profesores$!: Observable<Profesor[]>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'matricula', 'email', 'profesion', 'actions'];

  constructor(
    private profesorService: ProfesorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProfesores();
  }

  loadProfesores(): void {
    this.profesores$ = this.profesorService.getProfesores();
  }

  openDialog(profesor?: Profesor): void {
    const dialogRef = this.dialog.open(ProfesorFormComponent, {
      width: '500px',
      data: { profesor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (profesor) {
          // Update
          this.profesorService.updateProfesor(profesor.id, result).subscribe(() => this.loadProfesores());
        } else {
          // Create
          this.profesorService.createProfesor(result).subscribe(() => this.loadProfesores());
        }
      }
    });
  }

  deleteProfesor(id: number): void {
    if (confirm('Are you sure you want to delete this profesor?')) {
      this.profesorService.deleteProfesor(id).subscribe(() => this.loadProfesores());
    }
  }
}
