import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "html",
})
export class HtmlPipe implements PipeTransform {
  constructor() {}

  transform(value: string): string {
    value = value.replace(new RegExp("<code>", "g"), "");
    value = value.replace(new RegExp("</code>", "g"), "");
    value = value.replace(new RegExp("<mark>", "g"), "");
    value = value.replace(new RegExp("</mark>", "g"), "");
    value = value.replace(/</g, "&#60;").replace(/>/g, "&#62;");
    return value;
  }
}
