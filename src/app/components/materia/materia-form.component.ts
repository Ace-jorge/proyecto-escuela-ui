import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Materia } from '../../models/materia';

@Component({
  selector: 'app-materia-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.css']
})
export class MateriaFormComponent {
  form;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MateriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { materia?: Materia }
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });

    if (data?.materia) {
      this.form.patchValue(data.materia);
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
