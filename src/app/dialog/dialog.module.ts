import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ScoreDistributionDialogComponent } from './score-distribution-dialog/score-distribution-dialog.component';
import { ErrorDistributionDialogComponent } from './error-distribution-dialog/error-distribution-dialog.component';

@NgModule({
  declarations: [
    ScoreDistributionDialogComponent,
    ErrorDistributionDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    PipesModule
  ],
  exports: [
    ScoreDistributionDialogComponent,
    ErrorDistributionDialogComponent
  ],
  entryComponents: [
    ScoreDistributionDialogComponent,
    ErrorDistributionDialogComponent
  ]
})
export class DialogModule { }
