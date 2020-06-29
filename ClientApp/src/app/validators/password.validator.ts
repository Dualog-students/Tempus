import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(
  passwordControl: AbstractControl,
  passwordLength = 6,
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.pristine || control.value.length < passwordLength) {
      return {
        error: 'Password must have atleast ' + passwordLength + ' characters',
      };
    }
    return null;
  };
}

export function confirmPasswordValidator(
  confirmPasswordControl: AbstractControl,
  passwordControl: AbstractControl,
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value !== passwordControl.value) {
      return { error: 'Passwords do not match' };
    }
    return null;
  };
}
