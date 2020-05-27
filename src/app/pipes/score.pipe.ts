import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    return value.replace(',', ' ');
  }

}
