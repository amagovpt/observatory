import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { DataService } from "../data.service";

import { Directory } from "../models/directory";
import { Website } from "../models/website";

@Component({
  selector: "app-website",
  templateUrl: "./website.component.html",
  styleUrls: ["./website.component.scss"],
})
export class WebsiteComponent implements OnInit, OnDestroy {
  sub: Subscription;
  directory: any;
  website: any;

  scoreDistributionData: any;
  errorDistributionData: any;
  topFiveErrorsData: any;
  topFiveBestPractices: any;
  accessibilityPlotData: any;
  tableData: any;

  loading: boolean;
  error: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {
    this.loading = false;
    this.error = false;
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.activatedRoute.params.subscribe((params) => {
      const globalData = this.data.getGlobalData();

      this.directory = globalData.directories[params.directory];

      if (this.directory) {
        this.website = this.directory.websites[params.website];

        if (this.website) {
          this.scoreDistributionData = {
            number: this.website.nPages,
            frequency: this.website.scoreDistributionFrequency,
          };
          this.accessibilityPlotData = this.website.accessibilityPlotData;
          this.tableData = this.website;
        } else {
          this.error = true;
        }
      } else {
        this.error = true;
      }

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
