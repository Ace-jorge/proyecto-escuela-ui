import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Carrera } from '../../models/carrera';
import { CarreraService } from '../../services/carrera.service';
import { carreraExistsValidator } from '../../validators/carrera-exists.validator';

@Component({
  selector: 'app-carrera-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent {
  form;

  constructor(
    private fb: FormBuilder,
    private carreraService: CarreraService,
    public dialogRef: MatDialogRef<CarreraFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { carrera?: Carrera }
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required]
    }, {
      asyncValidators: [carreraExistsValidator(this.carreraService)],
      updateOn: 'blur'
    });

    if (data?.carrera) {
      this.form.patchValue(data.carrera);
    }
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
