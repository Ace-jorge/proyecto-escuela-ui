import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Curso } from '../../models/curso';
import { Materia } from '../../models/materia';
import { Profesor } from '../../models/profesor';
import { MateriaService } from '../../services/materia.service';
import { ProfesorService } from '../../services/profesor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.css']
})
export class CursoFormComponent implements OnInit {
  form;
  materias$!: Observable<Materia[]>;
  profesores$!: Observable<Profesor[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CursoFormComponent>,
    private materiaService: MateriaService,
    private profesorService: ProfesorService,
    @Inject(MAT_DIALOG_DATA) public data: { curso?: Curso }
  ) {
    this.form = this.fb.group({
      grupo: ['', Validators.required],
      materiaId: [null, Validators.required],
      profesorId: [null, Validators.required]
    });

    if (data?.curso) {
      this.form.patchValue(data.curso);
    }
  }

  ngOnInit(): void {
    this.materias$ = this.materiaService.getMaterias();
    this.profesores$ = this.profesorService.getProfesores();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
