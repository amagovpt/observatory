import { Component, OnInit, Input } from "@angular/core";
import orderBy from "lodash.orderby";
import _tests from "../../tests";

@Component({
  selector: "app-top-three-practices",
  templateUrl: "./top-three-practices.component.html",
  styleUrls: ["./top-three-practices.component.scss"],
})
export class TopThreePracticesComponent implements OnInit {
  @Input("type") type: string;
  @Input("data") data: any;

  practices: any;

  constructor() {
    this.practices = {
      A: {},
      AA: {},
      AAA: {},
    };
  }

  ngOnInit() {
    const errors = new Array<any>();
    for (const key in this.data || {}) {
      if (this.data[key]) {
        errors.push({
          key,
          n_occurrences: this.data[key].n_occurrences,
          n_pages: this.data[key].n_pages,
          lvl: _tests[key].level.toUpperCase(),
        });
      }
    }

    this.practices.A = errors.filter((e: any) => e.lvl === "A");
    this.practices.AA = errors.filter((e: any) => e.lvl === "AA");
    this.practices.AAA = errors.filter((e: any) => e.lvl === "AAA");

    this.practices.A = orderBy(
      this.practices.A,
      ["n_pages", "n_occurrences"],
      ["desc", "desc"]
    ).slice(0, 3);
    this.practices.AA = orderBy(
      this.practices.AA,
      ["n_pages", "n_occurrences"],
      ["desc", "desc"]
    ).slice(0, 3);
    this.practices.AAA = orderBy(
      this.practices.AAA,
      ["n_pages", "n_occurrences"],
      ["desc", "desc"]
    ).slice(0, 3);
  }

  getPractices(lvl: string): any {
    return this.practices[lvl];
  }
}
