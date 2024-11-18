import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TuiDay, TuiValidationError} from "@taiga-ui/cdk";
import {getDateTimeFromTui, getTodayDate, getTomorrowDate} from "../utils/date.utils";


export function timeMinDifferenceValidator(numberHour: number): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    if (!(group instanceof FormGroup)) return null;

    const dateControl = group.get('date');
    const timeControl = group.get('time');

    if (!dateControl || !timeControl || !dateControl.value || !timeControl.value) {
      return null; // Pas de validation si les champs sont vides
    }

    const selectedDate = getDateTimeFromTui(dateControl.value, timeControl.value);
    const currentTime = new Date();
    const timeDifference = (selectedDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60); // Différence en heures

    return timeDifference >= numberHour ? null : { timeTooClose: true };
  };
}

export function dateMinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const dateDay: TuiDay = value;
    const date = new Date(dateDay.year, dateDay.month, dateDay.day);
    const today = getTodayDate();
    if(date < today) {
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
