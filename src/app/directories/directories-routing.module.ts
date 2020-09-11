import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoriesComponent } from './directories.component';

const routes: Routes = [
  { path: '', component: DirectoriesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoriesRoutingModule { }
