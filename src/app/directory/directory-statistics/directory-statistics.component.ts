import { Component, Input, HostListener } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Directory } from "../../models/directory";

import { ScoreDistributionDialogComponent } from "../../dialog/score-distribution-dialog/score-distribution-dialog.component";
import { ErrorDistributionDialogComponent } from "../../dialog/error-distribution-dialog/error-distribution-dialog.component";
import { CorrectionDistributionDialogComponent } from "../../dialog/correction-distribution-dialog/correction-distribution-dialog.component";
//import {ElementCorrectionDistributionDialogComponent} from "../../dialog/element-correction-distribution-dialog/element-correction-distribution-dialog.component";

@Component({
  selector: "app-directory-statistics",
  templateUrl: "./directory-statistics.component.html",
  styleUrls: ["./directory-statistics.component.scss"],
})
export class DirectoryStatisticsComponent {
  @Input() directory: any;

  dialogWidth: string;

  newestPage: string;
  oldestPage: string;

  thresholdConfig: any;

  constructor(private dialog: MatDialog) {
    this.thresholdConfig = {
      0: { color: "red" },
      2.5: { color: "orange" },
      5: { color: "yellow" },
      7.5: { color: "green" },
    };

    if (window.innerWidth < 960) {
      this.dialogWidth = "100vw";
    } else {
      this.dialogWidth = "60vw";
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    if (event.target.innerWidth < 960) {
      this.dialogWidth = "100vw";
    } else {
      this.dialogWidth = "60vw";
    }
  }

  openScoreDistributionDialog(): void {
    this.dialog.open(ScoreDistributionDialogComponent, {
      data: {
        number: this.directory.websites.length,
        frequency: this.directory.scoreDistributionFrequency,
      },
      width: this.dialogWidth,
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        nPages: this.directory.nPages,
        errors: this.directory.errorDistribution,
        inDirectoriesPage: false,
      },
      width: this.dialogWidth,
    });
  }

  openCorrectionDistributionDialog(): void {
    this.dialog.open(CorrectionDistributionDialogComponent, {
      data: {
        nPages: this.directory.nPages,
        success: this.directory.bestPracticesDistribution,
        inDirectoriesPage: false,
      },
      width: this.dialogWidth,
    });
  }
}
