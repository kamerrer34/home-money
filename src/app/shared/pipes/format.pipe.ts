import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'format',
  standalone: true
})
export class FormatPipe implements PipeTransform {

  transform(value: string, formatFrom: string, formatTo: string = 'DD.MM.YYYY'): string {
    return moment(value, formatFrom).format(formatTo);
  }

}
