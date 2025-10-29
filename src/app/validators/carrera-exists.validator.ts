import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CarreraService } from '../services/carrera.service';

export function carreraExistsValidator(carreraService: CarreraService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const nombre = control.get('nombre')?.value;
    const codigo = control.get('codigo')?.value;

    if (!nombre || !codigo) {
      return of(null);
    }

    return carreraService.checkIfExists(nombre, codigo).pipe(
      map(exists => (exists ? { carreraExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
