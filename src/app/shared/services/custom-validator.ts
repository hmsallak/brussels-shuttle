import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TuiDay, TuiValidationError} from "@taiga-ui/cdk";
import {getTomorrowDate} from "../utils/date.utils";



export function dateMinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const dateDay: TuiDay = value;
    const date = new Date(dateDay.year, dateDay.month, dateDay.day);
    const tomorrow = getTomorrowDate();
    if(date < tomorrow) {
      return { invalidMinDate: true };
    }
    return null;
  };
}

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const { hours, minutes, seconds, ms } = value;

    if (hours === undefined || hours < 0 || hours > 23) {
      return { invalidHour: true };
    }

    if (minutes === undefined || minutes < 0 || minutes > 59) {
      return { invalidMinute: true };
    }

    if (seconds === undefined || seconds < 0 || seconds > 59) {
      return { invalidSecond: true };
    }

    if (ms === undefined || ms < 0 || ms > 999) {
      return { invalidMillisecond: true };
    }

    return null;
  };

}

// export function placeValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     console.log(value)
//     return {
//       placeValidator:  new TuiValidationError('Place is required')
//     };
//     if (!value?.name) {
//       console.log('erreur')
//
//       return {
//         placeValidator: new TuiValidationError('Place is required')
//       };
//     }
//
//     return null;
//   };
// }
