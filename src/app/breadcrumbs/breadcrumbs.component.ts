import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  tag: string;
  website: string;

  constructor(
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.tag = null;
    this.website = null;
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.tag = null;
        this.website = null;

        const path = this.location.path();
        const segments = path.split('/');

        switch (segments.length) {
          case 3:
            this.website = decodeURIComponent(segments[2]);

          case 2:
            this.tag = decodeURIComponent(segments[1]);
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
