import { Component, OnInit, Input } from "@angular/core";
import orderBy from "lodash.orderby";
import clone from "lodash.clone";
import _tests from "../../tests";
import { Website } from "src/app/models/website";

@Component({
  selector: "app-practices-details-table",
  templateUrl: "./practices-details-table.component.html",
  styleUrls: ["./practices-details-table.component.scss"],
})
export class PracticesDetailsTableComponent implements OnInit {
  @Input("type") type: string;
  @Input("website") website: any;

  practices: any;
  practicesKeys: any;

  constructor() {
    this.practicesKeys = new Array<any>();
  }

  ngOnInit() {
    const iterable =
      this.type === "good"
        ? this.website.successDetailsTable
        : this.website.errorsDetailsTable;

    this.practices = iterable.practicesData;
    this.practicesKeys = iterable.practicesKeys;
  }

  private calculateQuartiles(practices: any): Array<any> {
    const values = practices
      .filter((e: any) => e !== undefined)
      .sort((a: number, b: number) => a - b);

    let q1: number;
    let q2: number;
    let q3: number;
    let q4: number;

    q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

    if (values.length % 2 === 0) {
      q2 = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
    } else {
      q2 = values[(values.length + 1) / 2];
    }

    q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
    q4 = values[values.length - 1];

    const tmp = {
      q1: new Array<number>(),
      q2: new Array<number>(),
      q3: new Array<number>(),
      q4: new Array<number>(),
    };

    let q: string;
    for (const v of values || []) {
      if (v <= q1) {
        q = "q1";
      } else {
        if (v <= q2) {
          q = "q2";
        } else {
          if (v <= q3) {
            q = "q3";
          } else {
            q = "q4";
          }
        }
      }

      tmp[q].push(v);
    }

    const final = new Array<any>();

    for (const k in tmp) {
      if (k) {
        const v = tmp[k];
        const sum = v.length;
        if (sum > 0) {
          const test = {
            tot: sum,
            por: Math.round((sum * 100) / values.length),
            int: {
              lower: v[0],
              upper: v[sum - 1],
            },
          };

          final.push(clone(test));
        }
      }
    }

    return final;
  }
}
