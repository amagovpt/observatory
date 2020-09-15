import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ListTags } from '../../models/list-tags';

import { ScoreDistributionDialogComponent } from '../../dialog/score-distribution-dialog/score-distribution-dialog.component';
import { ErrorDistributionDialogComponent } from '../../dialog/error-distribution-dialog/error-distribution-dialog.component';
import { CorrectionDistributionDialogComponent } from '../../dialog/correction-distribution-dialog/correction-distribution-dialog.component';
//import { ElementCorrectionDistributionDialogComponent } from "../../dialog/element-correction-distribution-dialog/element-correction-distribution-dialog.component";

@Component({
  selector: 'app-tags-statistics',
  templateUrl: './tags-statistics.component.html',
  styleUrls: ['./tags-statistics.component.scss']
})
export class TagsStatisticsComponent {

  @Input('listTags') listTags: ListTags;

  thresholdConfig: any;

  constructor(private readonly dialog: MatDialog) {
    this.thresholdConfig = {
      0: {color: 'red'},
      2.5: {color: 'orange'},
      5: {color: 'yellow'},
      7.5: {color: 'green'}
    };
  }

  openScoreDistributionDialog(): void {
    this.dialog.open(ScoreDistributionDialogComponent, {
      data: {
        number: this.listTags.tags.length,
        frequency: this.listTags.frequencies
      },
      width: '60vw'
    });
  }

  openErrorDistributionDialog(): void {
    this.dialog.open(ErrorDistributionDialogComponent, {
      data: {
        tags: this.listTags,
        inTagsPage: true
      },
      width: '60vw'
    });
  }
  
  openCorrectionDistributionDialog(): void {
    this.dialog.open(CorrectionDistributionDialogComponent, {
      data: {
        tags: this.listTags,
        inTagsPage: true
      },
      width: '60vw'
    });
  }
}
