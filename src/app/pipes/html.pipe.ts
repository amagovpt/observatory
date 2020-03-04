import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform {

  constructor(private readonly sanitizer: DomSanitizer) { }

  transform(value: string): string {
    value = value.replace(/</g, '&#60;').replace(/>/g, '&#62;');
    return value;
  }
}
