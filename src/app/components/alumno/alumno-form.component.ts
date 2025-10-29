import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, formatDate } from '@angular/common';
import { Alumno, CreateAlumnoRequest } from '../../models/alumno';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {
  form;
  carreras$!: Observable<Carrera[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AlumnoFormComponent>,
    private carreraService: CarreraService,
    @Inject(MAT_DIALOG_DATA) public data: { alumno?: Alumno }
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      matricula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Password is not required for update
      fechaNacimiento: [null as Date | null, Validators.required],
      genero: ['', Validators.required],
      semestre: [1, Validators.required],
      carreraId: [null]
    });

    if (data?.alumno) {
      this.form.patchValue({
        ...data.alumno,
        fechaNacimiento: new Date(data.alumno.fechaNacimiento)
      });
      this.form.get('password')?.clearValidators();
    } else {
      this.form.get('password')?.setValidators(Validators.required);
    }
  }

  ngOnInit(): void {
    this.carreras$ = this.carreraService.getCarreras();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();
      
      const output: Partial<CreateAlumnoRequest> = {
        nombre: rawValue.nombre ?? undefined,
        apellido: rawValue.apellido ?? undefined,
        matricula: rawValue.matricula ?? undefined,
        email: rawValue.email ?? undefined,
        password: rawValue.password ?? undefined,
        fechaNacimiento: rawValue.fechaNacimiento ? formatDate(rawValue.fechaNacimiento, 'yyyy-MM-dd', 'en-US') : '',
        genero: rawValue.genero ?? undefined,
        semestre: rawValue.semestre ?? undefined,
        carreraId: rawValue.carreraId ?? undefined,
      };

      if (!output.password) {
        delete output.password;
      }
      
      this.dialogRef.close(output);
    }
  }
}
