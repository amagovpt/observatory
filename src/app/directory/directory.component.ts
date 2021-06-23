import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { DataService } from "../data.service";

import { Directory } from "../models/directory";

@Component({
  selector: "app-directory",
  templateUrl: "./directory.component.html",
  styleUrls: ["./directory.component.scss"],
})
export class DirectoryComponent implements OnInit, OnDestroy {
  sub: Subscription;
  directory: any;

  loading: boolean;
  error: boolean;

  topFiveErrorsData: any;
  topFiveBestPractices: any;

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
      this.directory = this.data.getGlobalData().directories[params.directory];

      if (!this.directory) {
        this.error = true;
      } else {
        this.topFiveErrorsData = this.directory.errors;
        this.topFiveBestPractices = this.directory.success;
      }

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
