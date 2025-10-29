import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarreraService } from '../../services/carrera.service';
import { Carrera } from '../../models/carrera';
import { Observable } from 'rxjs';
import { CarreraFormComponent } from './carrera-form.component';

@Component({
  selector: 'app-carrera-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './carrera-list.component.html',
  styleUrls: ['./carrera-list.component.css']
})
export class CarreraListComponent implements OnInit {
  carreras$!: Observable<Carrera[]>;
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'actions'];

  constructor(
    private carreraService: CarreraService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCarreras();
  }

  loadCarreras(): void {
    this.carreras$ = this.carreraService.getCarreras();
  }

  openDialog(carrera?: Carrera): void {
    const dialogRef = this.dialog.open(CarreraFormComponent, {
      width: '400px',
      data: { carrera }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (carrera) {
          // Update
          this.carreraService.updateCarrera(carrera.id, result).subscribe(() => this.loadCarreras());
        } else {
          // Create
          this.carreraService.createCarrera(result).subscribe(() => this.loadCarreras());
        }
      }
    });
  }

  deleteCarrera(id: number): void {
    if (confirm('Are you sure you want to delete this carrera?')) {
      this.carreraService.deleteCarrera(id).subscribe(() => this.loadCarreras());
    }
  }
}
