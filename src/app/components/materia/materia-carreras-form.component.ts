import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectionList, MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Carrera } from '../../models/carrera';
import { Materia } from '../../models/materia';
import { CarreraService } from '../../services/carrera.service';
import { MateriaService } from '../../services/materia.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-materia-carreras-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectionList
  ],
  templateUrl: './materia-carreras-form.component.html',
})
export class MateriaCarrerasFormComponent implements OnInit {
  form;
  allCarreras: Carrera[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MateriaCarrerasFormComponent>,
    private carreraService: CarreraService,
    private materiaService: MateriaService,
    @Inject(MAT_DIALOG_DATA) public data: { materia: Materia }
  ) {
    this.form = this.fb.group({
      carreras: this.fb.array([])
    });
  }

  ngOnInit(): void {
    forkJoin({
      allCarreras: this.carreraService.getCarreras(),
      assignedCarreras: this.materiaService.getCarrerasForMateria(this.data.materia.id)
    }).subscribe(({ allCarreras, assignedCarreras }) => {
      this.allCarreras = allCarreras;
      const assignedCarreraIds = new Set(assignedCarreras.map(c => c.id));
      
      this.allCarreras.forEach(carrera => {
        const isAssigned = assignedCarreraIds.has(carrera.id);
        (this.form.get('carreras') as FormArray).push(new FormControl(isAssigned));
      });
    });
  }

  getCarreraControl(index: number): FormControl {
    return (this.form.get('carreras') as FormArray).at(index) as FormControl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const selectedCarreraIds = (this.form.value.carreras as boolean[])
      .map((checked, i) => checked ? this.allCarreras[i].id : null)
      .filter(id => id !== null);
      
    this.dialogRef.close(selectedCarreraIds);
  }
}
