import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetConformPipe } from './get-conform.pipe';
import { ToFixedPipe } from './to-fixed.pipe';
import { HtmlPipe } from './html.pipe';
import { CustomDatePipe } from './custom-date.pipe';

@NgModule({
  declarations: [GetConformPipe, ToFixedPipe, HtmlPipe, CustomDatePipe],
  providers: [GetConformPipe, ToFixedPipe, HtmlPipe],
  imports: [CommonModule],
  exports: [GetConformPipe, ToFixedPipe, HtmlPipe, CustomDatePipe]
})
export class PipesModule { }
