import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ListDirectories } from "../../models/list-directories";

import { ScoreDistributionDialogComponent } from "../../dialog/score-distribution-dialog/score-distribution-dialog.component";
import { ErrorDistributionDialogComponent } from "../../dialog/error-distribution-dialog/error-distribution-dialog.component";
import { CorrectionDistributionDialogComponent } from "../../dialog/correction-distribution-dialog/correction-distribution-dialog.component";
//import { ElementCorrectionDistributionDialogComponent } from "../../dialog/element-correction-distribution-dialog/element-correction-distribution-dialog.component";

@Component({
  selector: "app-directories-statistics",
  templateUrl: "./directories-statistics.component.html",
  styleUrls: ["./directories-statistics.component.scss"],
})
export class DirectoriesStatisticsComponent {
  @Input("listDirectories") listDirectories: ListDirectories;

  thresholdConfig: any;

  constructor(private readonly dialog: MatDialog) {
    this.thresholdConfig = {
      0: { color: "red" },
      2.5: { color: "orange" },
      5: { color: "yellow" },
      7.5: { color: "green" },
    };
  }

  openScoreDistributionDialog(): void {
    this.dialog.open(ScoreDistributionDialogComponent, {
      data: {
        number: this.listDirectories.directories.length,
        frequency: this.listDirectories.frequencies,
      },
      width: "60vw",
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        directories: this.listDirectories,
        inDirectoriesPage: true,
      },
      width: "60vw",
    });
  }

  openCorrectionDistributionDialog(): void {
    this.dialog.open(CorrectionDistributionDialogComponent, {
      data: {
        directories: this.listDirectories,
        inDirectoriesPage: true,
      },
      width: "60vw",
    });
  }
}
