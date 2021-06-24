import { Component, OnInit, Input } from "@angular/core";
import { Website } from "../../models/website";

@Component({
  selector: "app-website-statistics",
  templateUrl: "./website-statistics.component.html",
  styleUrls: ["./website-statistics.component.scss"],
})
export class WebsiteStatisticsComponent implements OnInit {
  @Input() website: any;

  thresholdConfig: any;

  pagesWithErrors: number;
  pagesWithErrorsPercentage: string;
  pagesWithoutErrors: number;
  pagesWithoutErrorsPercentage: string;
  pagesWithoutErrorsA: number;
  pagesWithoutErrorsAPercentage: string;
  pagesWithoutErrorsAA: number;
  pagesWithoutErrorsAAPercentage: string;
  pagesWithoutErrorsAAA: number;
  pagesWithoutErrorsAAAPercentage: string;

  constructor() {
    this.thresholdConfig = {
      0: { color: "red" },
      2.5: { color: "orange" },
      5: { color: "yellow" },
      7.5: { color: "green" },
    };

    this.pagesWithErrors = 0;
    this.pagesWithoutErrorsA = 0;
    this.pagesWithoutErrorsAA = 0;
    this.pagesWithoutErrorsAAA = 0;
  }

  ngOnInit(): void {
    const size = this.website.nPages;

    this.pagesWithErrors = this.website.pagesWithErrors;

    this.pagesWithoutErrorsA = this.website.pagesWithoutErrorsA;
    this.pagesWithoutErrorsAA = this.website.pagesWithoutErrorsAA;
    this.pagesWithoutErrorsAAA = this.website.pagesWithoutErrorsAAA;

    this.pagesWithoutErrors = this.website.pagesWithoutErrors;

    this.pagesWithErrorsPercentage =
      ((this.pagesWithErrors / size) * 100).toFixed(1) + "%";
    this.pagesWithoutErrorsPercentage =
      ((this.pagesWithoutErrors / size) * 100).toFixed(1) + "%";
    this.pagesWithoutErrorsAPercentage =
      ((this.pagesWithoutErrorsA / size) * 100).toFixed(1) + "%";
    this.pagesWithoutErrorsAAPercentage =
      ((this.pagesWithoutErrorsAA / size) * 100).toFixed(1) + "%";
    this.pagesWithoutErrorsAAAPercentage =
      ((this.pagesWithoutErrorsAAA / size) * 100).toFixed(1) + "%";
  }
}
