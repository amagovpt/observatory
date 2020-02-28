import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListTags } from '../models/list-tags';

import { DataService } from '../data.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private tags: ListTags;

  tag: string;
  tagId: number;
  website: string;
  websiteId: number;

  constructor(
    private readonly router: Router,
    private readonly data: DataService
  ) {
    this.tag = null;
    this.website = null;
    this.tags = this.data.getListTags();
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.tag = null;
        this.website = null;

        const path = location.pathname;
        console.log(path)
        const segments = path.split('/');

        switch (segments.length) {
          case 3:
            this.tagId = parseInt(segments[1], 0);
            this.websiteId = parseInt(segments[2], 0);
            this.website = this.tags.getWebsite(parseInt(segments[1], 0), parseInt(segments[2], 0))?.name;
            this.tag = this.tags.getTag(parseInt(segments[1], 0))?.name;
            break;
          case 2:
            this.tagId = parseInt(segments[1], 0);
            this.tag = this.tags.getTag(parseInt(segments[1], 0))?.name;
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
