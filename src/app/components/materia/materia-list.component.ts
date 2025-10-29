import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models/materia';
import { Observable } from 'rxjs';
import { MateriaFormComponent } from './materia-form.component';
import { MateriaCarrerasFormComponent } from './materia-carreras-form.component';
import { Carrera } from '../../models/carrera';

@Component({
  selector: 'app-materia-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './materia-list.component.html',
  styleUrls: ['./materia-list.component.css']
})
export class MateriaListComponent implements OnInit {
  materias$!: Observable<Materia[]>;
  displayedColumns: string[] = ['id', 'nombre', 'carrerasAsignadas', 'actions', 'assign_carreras'];

  constructor(
    private materiaService: MateriaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMaterias();
  }

  loadMaterias(): void {
    this.materias$ = this.materiaService.getMaterias();
  }

  openDialog(materia?: Materia): void {
    const dialogRef = this.dialog.open(MateriaFormComponent, {
      width: '400px',
      data: { materia }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (materia) {
          // Update
          this.materiaService.updateMateria(materia.id, result).subscribe(() => this.loadMaterias());
        } else {
          // Create
          this.materiaService.createMateria(result).subscribe(() => this.loadMaterias());
        }
      }
    });
  }

  openCarrerasDialog(materia: Materia): void {
    const dialogRef = this.dialog.open(MateriaCarrerasFormComponent, {
      width: '400px',
      data: { materia }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && materia.id) {
        this.materiaService.updateCarrerasForMateria(materia.id, result).subscribe(() => {
          this.loadMaterias(); // Reload to reflect changes if any
        });
      }
    });
  }

  deleteMateria(id: number): void {
    if (confirm('Are you sure you want to delete this materia?')) {
      this.materiaService.deleteMateria(id).subscribe(() => this.loadMaterias());
    }
  }

  formatCarreras(carreras: Carrera[] | undefined): string {
    if (!carreras || carreras.length === 0) {
      return 'No asignada';
    }
    return carreras.map(c => c.nombre).join(', ');
  }
}
