import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxGaugeModule } from "ngx-gauge";
import { MaterialModule } from "../material/material.module";
import { DialogModule } from "./../dialog/dialog.module";
import { PipesModule } from "../pipes/pipes.module";
import { DirectoriesComponent } from "./directories.component";
import { DirectoriesRoutingModule } from "./directories-routing.module";
import { DirectoriesStatisticsComponent } from "./directories-statistics/directories-statistics.component";
import { DirectoriesListComponent } from "./directories-list/directories-list.component";
import { WebsiteSearchComponent } from './website-search/website-search.component';

@NgModule({
  declarations: [
    DirectoriesComponent,
    DirectoriesStatisticsComponent,
    DirectoriesListComponent,
    WebsiteSearchComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxGaugeModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    DialogModule,
    PipesModule,
    DirectoriesRoutingModule,
  ],
  exports: [DirectoriesComponent],
})
export class DirectoriesModule {}
