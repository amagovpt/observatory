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
import { AllErrorsListComponent } from './all-errors-list/all-errors-list.component';
import { ErrorDistributionComponent } from './error-distribution/error-distribution.component';
import { ScoreDistributionComponent } from './score-distribution/score-distribution.component';
import { TopFiveErrorsComponent } from './top-five-errors/top-five-errors.component';

@NgModule({
  declarations: [WebsiteComponent, WebsiteStatisticsComponent, AccessibilityPlotComponent, AllErrorsListComponent, ErrorDistributionComponent, ScoreDistributionComponent, TopFiveErrorsComponent],
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
