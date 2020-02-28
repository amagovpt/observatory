import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetConformPipe } from './get-conform.pipe';
import { ToFixedPipe } from './to-fixed.pipe';



@NgModule({
  declarations: [GetConformPipe, ToFixedPipe],
  providers: [GetConformPipe, ToFixedPipe],
  imports: [CommonModule],
  exports: [GetConformPipe, ToFixedPipe]
})
export class PipesModule { }
