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
  if (c.value.Date) {
    // Only run when the form has a date
    const existingHours = this.user.Hours;
    if (c.value.Project.name in existingHours) {
      // The user has registered hours on project before
      if (this.hoursKey in existingHours[c.value.Project.name]) {
        // The user has hours on this date on the project
        this.displayInfoMessage = true;
        const oldEntry = existingHours[c.value.Project.name][this.hoursKey];
        console.log(c.value.Hours);
        const oldHours = Math.round(oldEntry.Hours / 100);
        if (c.value.Hours === oldHours) {
          // These hours already exist for the project on this date
          this.infoMessage = 'These hours have already been registered';
          return { entryExists: true };
        } else if (!this.edit) {
          // Trying to add new hours to existing project on this date
          this.infoMessage = `Registering will overwrite ${oldEntry.Hours} hours
          registered on ${c.value.Project.name} for ${this.hoursKey}`;
          return;
        }
      }
    }
  }
  this.displayInfoMessage = false;
}
