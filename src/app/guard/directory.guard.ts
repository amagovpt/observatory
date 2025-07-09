import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class DirectoryGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const directoryId = route.firstChild.params.directory;
    let directories = this.dataService.getGlobalData().directories;
    if (!directories) {
      this.dataService.getObservatoryData().subscribe(() => {
        directories = this.dataService.getGlobalData().directories;
        this.validateAndRedirect(directories, directoryId)

      })
    } else {
      this.validateAndRedirect(directories, directoryId);
    }
    return true;
  }

  validateAndRedirect(directories: any, directoryId: any) {
    const validDirectory = !!directories[directoryId];
    if (!validDirectory)
      this.router.navigate([''])
  }

}
