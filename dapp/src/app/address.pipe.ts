import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform(value: string): string {
    console.log('AddressPipe value', value);
    if (!value) return '';
    value = value.toLowerCase();
    return value.substring(0, 2) === '0x'
      ? value
      : '0x' + value;
  }
}
