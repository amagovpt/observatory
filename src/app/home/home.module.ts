import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxGaugeModule } from 'ngx-gauge';
import { MaterialModule } from '../material/material.module';
import { DialogModule } from './../dialog/dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { HomeComponent } from './home.component';
import { TagsStatisticsComponent } from './tags-statistics/tags-statistics.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagsTopFiveComponent } from './tags-top-five/tags-top-five.component';

@NgModule({
  declarations: [HomeComponent, TagsStatisticsComponent, TagsListComponent, TagsTopFiveComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxGaugeModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    DialogModule,
    PipesModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
