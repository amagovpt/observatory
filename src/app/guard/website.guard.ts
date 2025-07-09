import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const params = route.firstChild.params;
    const directory = params.directory;
    const website = params.website;
    let directories = this.dataService.getGlobalData().directories;
    if (!directories) {
      this.dataService.getObservatoryData().subscribe(() => {
        directories = this.dataService.getGlobalData().directories;
        this.validateAndRedirect(directories, directory, website)

      })
    }else{
    this.validateAndRedirect(directories, directory, website)}
    return true;
  }

  validateAndRedirect(directories: any, directoryId: any,websiteId:any) {
    console.log({ directoryId, websiteId,directories})
    const validDirectory = !!directories[directoryId]?.websites[websiteId];
    console.log(directories[directoryId]);
    if (!validDirectory)
      this.router.navigate([''])
  }
  
}
