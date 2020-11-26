import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  constructor(private readonly translate: TranslateService) {}

  transform(value: string): string {
    const split = value.split("/");
    split[1] = this.translate.instant("MONTHS." + this.fixMonth(split[1]));
    return split[0] + " " + split[1] + ", " + split[2];
  }

  private fixMonth(month: string): string {
    if (month[0] === "0") {
      month = month.substring(1, 2);
    }

    return month;
  }
}
