import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toFixed",
})
export class ToFixedPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    value = parseFloat(value)
      .toFixed(args?.places ? args.places : 1)
      .toString();

    if (args?.comma) {
      value = value.replace(".", ",");
    }

    return value;
  }
}
