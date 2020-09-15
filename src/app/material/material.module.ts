import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
  ],
  exports: [
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule
  ],
  declarations: []
})
export class MaterialModule { }
