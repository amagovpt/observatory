import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule
  ],
  exports: [
    MatSelectModule,
    MatSortModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
