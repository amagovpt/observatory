import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxGaugeModule } from 'ngx-gauge';
import { MaterialModule } from '../material/material.module';
import { DialogModule } from './../dialog/dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { TagRoutingModule } from './tag-routing.module';
import { TagComponent } from './tag.component';
import { TagStatisticsComponent } from './tag-statistics/tag-statistics.component';
import { WebsitesListComponent } from './websites-list/websites-list.component';

@NgModule({
  declarations: [TagComponent, TagStatisticsComponent, WebsitesListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxGaugeModule,
    MaterialModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    DialogModule,
    PipesModule,
    TagRoutingModule
  ],
  exports: [TagComponent]
})
export class TagModule { }
