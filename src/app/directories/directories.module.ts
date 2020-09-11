import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxGaugeModule } from 'ngx-gauge';
import { MaterialModule } from '../material/material.module';
import { DialogModule } from './../dialog/dialog.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { DirectoriesComponent } from './directories.component';
import { DirectoriesRoutingModule } from './directories-routing.module';
import { TagsStatisticsComponent } from './tags-statistics/tags-statistics.component';
import { TagsListComponent } from './tags-list/tags-list.component';

@NgModule({
  declarations: [DirectoriesComponent, TagsStatisticsComponent, TagsListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxGaugeModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    DialogModule,
    PipesModule,
    SharedModule,
    DirectoriesRoutingModule
  ],
  exports: [DirectoriesComponent]
})
export class DirectoriesModule { }
