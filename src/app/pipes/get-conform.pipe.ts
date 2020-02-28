import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getConform'
})
export class GetConformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const conform = value.split('@');
    switch (args) {
      case 'A':
        return conform[0];
      case 'AA':
        return conform[1];
      case 'AAA':
        return conform[2];
    }
  }
}
