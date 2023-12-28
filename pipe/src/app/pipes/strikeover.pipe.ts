import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strikeover',
})
export class StrikeoverPipe implements PipeTransform {

  transform(value: string, checked:boolean ): string {
    if(checked){
      return value.split('').reverse().join('');
    }
    return value
  }

}
