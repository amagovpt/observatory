import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
