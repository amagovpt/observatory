import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from '../data.service';

import { Tag } from '../models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {

  sub: Subscription;
  tag: Tag;
  multi: boolean;

  loading: boolean;
  error: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {
    this.loading = false;
    this.error = false;
    this.multi = false;
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.multi = params.tag.includes('+');
      if (this.multi) {
        this.tag = new Tag(-1, params.tag.split('+').join(', '), new Date());
        const tags = params.tag.split('+');
        const websites = {};

        for (const name of tags || []) {
          const tag = this.data.getListTags().tags.find((t: Tag) => t.name === name);
          for (const website of tag.websites || []) {
            if (websites[website.id]) {
              websites[website.id].count++;
            } else {
              websites[website.id] = {
                count: 1,
                clone: website
              };
            }
          }
        }

        for (const id in websites || {}) {
          if (id && websites[id].count === tags.length) {
            const website = websites[id].clone;
            this.tag.addWebsite(website);
          }
        }
      } else {
        this.tag = this.data.getListTags().tags.find((tag: Tag) => tag.name === params.tag);
      }

      if (!this.tag) {
        this.error = true;
      }

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
