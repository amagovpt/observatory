import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ObservatoryNumbersComponent } from './observatory-numbers.component';

@NgModule({
  declarations: [ObservatoryNumbersComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    PipesModule,
    RouterModule
  ],
  exports: [ObservatoryNumbersComponent]
})
export class ObservatoryNumbersModule { }
