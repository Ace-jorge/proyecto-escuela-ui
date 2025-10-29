import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { Observable } from 'rxjs';
import { CursoFormComponent } from './curso-form.component';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos$!: Observable<Curso[]>;
  displayedColumns: string[] = ['id', 'grupo', 'nombreMateria', 'nombreProfesor', 'actions'];

  constructor(
    private cursoService: CursoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursos$ = this.cursoService.getCursos();
  }

  openDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursoFormComponent, {
      width: '400px',
      data: { curso }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (curso) {
          // Update
          this.cursoService.updateCurso(curso.id, result).subscribe(() => this.loadCursos());
        } else {
          // Create
          this.cursoService.createCurso(result).subscribe(() => this.loadCursos());
        }
      }
    });
  }

  deleteCurso(id: number): void {
    if (confirm('Are you sure you want to delete this curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => this.loadCursos());
    }
  }
}
