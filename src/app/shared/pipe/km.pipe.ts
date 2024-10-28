import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'km',
  standalone: true
})
export class KmPipe implements PipeTransform {

  transform(value: number): string {
    return `${Math.floor(value)} km`;
  }

}
