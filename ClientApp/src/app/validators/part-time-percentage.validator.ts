import { ValidatorFn, AbstractControl } from '@angular/forms';

export function partTimePercentValidator(_control: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value < 10 || control.value > 90) {
      return { error: 'Number has to be between 10 and 90' };
    }
    return null;
  };
}
