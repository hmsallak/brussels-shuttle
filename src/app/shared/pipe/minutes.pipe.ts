import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesPipe',
  standalone: true
})
export class MinutesPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }

}
