import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxGaugeModule } from "ngx-gauge";
import { MaterialModule } from "../material/material.module";
import { DialogModule } from "../dialog/dialog.module";
import { PipesModule } from "../pipes/pipes.module";
import { DirectoryRoutingModule } from "./directory-routing.module";
import { DirectoryComponent } from "./directory.component";
import { DirectoryStatisticsComponent } from "./directory-statistics/directory-statistics.component";
import { WebsitesListComponent } from "./websites-list/websites-list.component";

@NgModule({
  declarations: [
    DirectoryComponent,
    DirectoryStatisticsComponent,
    WebsitesListComponent,
  ],
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
    DirectoryRoutingModule,
  ],
  exports: [DirectoryComponent],
})
export class DirectoryModule {}
