import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ObservatoryNumbersComponent } from './observatory-numbers/observatory-numbers.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'numbers', component: ObservatoryNumbersComponent },
  { path: 'directories', loadChildren: () => import('./directories/directories.module').then(m => m.DirectoriesModule) },
  { path: 'directories/:tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule) },
  { path: 'directories/:tag/:website', loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
