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
  directory: Directory;
  website: Website;

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
      const listDirectories = this.data.getListDirectories();

      this.directory = listDirectories.getDirectory(
        parseInt(params.directory, 0)
      );

      if (this.directory) {
        this.website = this.directory.websites.find(
          (w: Website) => w.id === parseInt(params.website, 0)
        );

        if (this.website) {
          this.scoreDistributionData = {
            number: this.website.pages.length,
            frequency: this.website.frequencies,
          };
          this.errorDistributionData = {
            errors: this.website.getTopTenErrors(),
            isCat: false,
          };
          this.topFiveErrorsData = this.website.errors;
          this.topFiveBestPractices = this.website.success;
          this.accessibilityPlotData = this.website.getAllScores();
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
