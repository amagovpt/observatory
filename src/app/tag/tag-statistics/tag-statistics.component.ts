import { Component, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Tag } from '../../models/tag';

import { ScoreDistributionDialogComponent } from '../../dialog/score-distribution-dialog/score-distribution-dialog.component';
import { ErrorDistributionDialogComponent } from '../../dialog/error-distribution-dialog/error-distribution-dialog.component';

@Component({
  selector: 'app-tag-statistics',
  templateUrl: './tag-statistics.component.html',
  styleUrls: ['./tag-statistics.component.scss']
})
export class TagStatisticsComponent {

  @Input() tag: Tag;

  dialogWidth: string;

  newestPage: string;
  oldestPage: string;

  thresholdConfig: any;

  constructor(private dialog: MatDialog) {
    this.thresholdConfig = {
      0: {color: 'red'},
      2.5: {color: 'orange'},
      5: {color: 'yellow'},
      7.5: {color: 'green'}
    };

    if (window.innerWidth < 960) {
      this.dialogWidth = '100vw';
    } else {
      this.dialogWidth = '60vw';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 960) {
      this.dialogWidth = '100vw';
    } else {
      this.dialogWidth = '60vw';
    }
  }

  openScoreDistributionDialog(): void {
    this.dialog.open(ScoreDistributionDialogComponent, {
      data: {
        number: this.tag.websites.length,
        frequency: this.tag.frequencies
      },
      width: this.dialogWidth
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        errors: this.tag.getTopTenErrors(),
        isCat: true
      },
      width: this.dialogWidth
    });
  }
}
