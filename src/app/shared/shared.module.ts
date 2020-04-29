import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';
import { TopFiveErrorsComponent } from './/top-five-errors/top-five-errors.component';
import { TopFiveBestPracticesComponent } from './top-five-best-practices/top-five-best-practices.component';

@NgModule({
  declarations: [
    TopFiveErrorsComponent,
    TopFiveBestPracticesComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule
  ],
  exports: [
    TopFiveErrorsComponent,
    TopFiveBestPracticesComponent
  ]
})
export class SharedModule { }
