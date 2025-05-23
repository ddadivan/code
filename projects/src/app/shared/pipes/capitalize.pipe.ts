import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, maxLength: number, minLength: number): string {
    // return `${value[0].toUpperCase()}${value.slice(1)}`;

    // return value.split('').map((letter: string, index: number) => {
    //   return !(index % 2) ? letter.toLowerCase() : letter.toUpperCase();
    // }).join('');

    return value.length > maxLength ? `${value.slice(minLength, maxLength)}...` : value;
  }

}
