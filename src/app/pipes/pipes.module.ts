import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetConformPipe } from './get-conform.pipe';
import { ToFixedPipe } from './to-fixed.pipe';
import { HtmlPipe } from './html.pipe';



@NgModule({
  declarations: [GetConformPipe, ToFixedPipe, HtmlPipe],
  providers: [GetConformPipe, ToFixedPipe, HtmlPipe],
  imports: [CommonModule],
  exports: [GetConformPipe, ToFixedPipe, HtmlPipe]
})
export class PipesModule { }
