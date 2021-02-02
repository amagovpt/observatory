import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  exports: [MatSelectModule, MatSortModule, MatDialogModule, MatTooltipModule],
  declarations: [],
})
export class MaterialModule {}
