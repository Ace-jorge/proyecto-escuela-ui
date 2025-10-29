import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, formatDate } from '@angular/common';
import { Profesor, CreateProfesorRequest } from '../../models/profesor';

@Component({
  selector: 'app-profesor-form',
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
  ],
  templateUrl: './profesor-form.component.html',
  styleUrls: ['./profesor-form.component.css']
})
export class ProfesorFormComponent implements OnInit {
  form;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProfesorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { profesor?: Profesor }
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      matricula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      fechaNacimiento: [null as Date | null, Validators.required],
      genero: ['', Validators.required],
      profesion: ['', Validators.required]
    });

    if (data?.profesor) {
      this.form.patchValue({
        ...data.profesor,
        fechaNacimiento: new Date(data.profesor.fechaNacimiento)
      });
      this.form.get('password')?.clearValidators();
    } else {
      this.form.get('password')?.setValidators(Validators.required);
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const rawValue = this.form.getRawValue();
      const output: Partial<CreateProfesorRequest> = {
        nombre: rawValue.nombre ?? undefined,
        apellido: rawValue.apellido ?? undefined,
        matricula: rawValue.matricula ?? undefined,
        email: rawValue.email ?? undefined,
        password: rawValue.password ?? undefined,
        fechaNacimiento: rawValue.fechaNacimiento ? formatDate(rawValue.fechaNacimiento, 'yyyy-MM-dd', 'en-US') : '',
        genero: rawValue.genero ?? undefined,
        profesion: rawValue.profesion ?? undefined,
      };

      if (!output.password) {
        delete output.password;
      }
      
      this.dialogRef.close(output);
    }
  }
}
