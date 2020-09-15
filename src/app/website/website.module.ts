import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxGaugeModule } from 'ngx-gauge';
import { MaterialModule } from '../material/material.module';
import { DialogModule } from './../dialog/dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { WebsiteStatisticsComponent } from './website-statistics/website-statistics.component';
import { AccessibilityPlotComponent } from './accessibility-plot/accessibility-plot.component';
import { PracticesDetailsTableComponent } from './practices-details-table/practices-details-table.component';
import { PracticesDistributionComponent } from './practices-distribution/practices-distribution.component';
import { ScoreDistributionComponent } from './score-distribution/score-distribution.component';
import { PracticesDetailsComponent } from './practices-details/practices-details.component';
import { TopThreePracticesComponent } from './top-three-practices/top-three-practices.component';

@NgModule({
  declarations: [WebsiteComponent, WebsiteStatisticsComponent, AccessibilityPlotComponent, PracticesDetailsTableComponent, PracticesDistributionComponent, ScoreDistributionComponent, PracticesDetailsComponent, TopThreePracticesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxGaugeModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    DialogModule,
    PipesModule,
    WebsiteRoutingModule
  ],
  exports: [WebsiteComponent]
})
export class WebsiteModule { }
