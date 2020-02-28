import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagComponent } from './tag.component';

const routes: Routes = [
  { path: '', component: TagComponent, pathMatch: 'full' },
  //{ path: ':tag/:website', component: WebsiteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
