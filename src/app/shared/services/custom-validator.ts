import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TuiDay} from "@taiga-ui/cdk";



export function dateMinTomorrowValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    const dateDay: TuiDay = value;
    const date = new Date(dateDay.year, dateDay.month, dateDay.day);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date <= tomorrow) {
      return { invalidDate: true };
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

