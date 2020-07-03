import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validateRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    if (
      control.value !== undefined &&
      (isNaN(control.value) || control.value <= min || control.value > max)
    ) {
      return { range: `Should be between ${min} and ${max}` };
    }
    return null;
  };
}

export function validateChange(c: AbstractControl) {
  if (c.value.date) {
    // Only run when the form has a date
    const existingHours = this.user.Hours;
    if (c.value.project.name in existingHours) {
      // The user has registered hours on project before
      if (this.hoursKey in existingHours[c.value.project.name]) {
        // The user has hours on this date on the project
        this.displayInfoMessage = true;
        const oldEntry = existingHours[c.value.project.name][this.hoursKey];
        if (c.value.hours === oldEntry.Hours) {
          // These hours already exist for the project on this date
          this.infoMessage = 'These hours have already been registered';
          return { entryExists: true };
        } else if (!this.edit) {
          // Trying to add new hours to existing project on this date
          this.infoMessage = `Registering will overwrite ${oldEntry.Hours} hours
          registered on ${c.value.project.name} for ${this.hoursKey}`;
          return;
        }
      }
    }
  }
  this.displayInfoMessage = false;
}
