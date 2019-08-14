import {AbstractControl} from '@angular/forms';

export function NoLRWhitespaceValidator(control: AbstractControl) {
  if (control.value.startsWith(' ') || control.value.endsWith(' ')) {
    return { whitespace: true };
  }
  return null;
}
