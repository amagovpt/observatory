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

  loading: boolean;
  error: boolean;

  topFiveErrorsData: any;
  topFiveBestPractices: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {
    this.loading = false;
    this.error = false;
  }

  ngOnInit() {
    this.loading = true;
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.tag = this.data.getListTags().getTag(parseInt(params.tag, 0));

      if (!this.tag) {
        this.error = true;
      } else {
        this.topFiveErrorsData = this.tag.errors;
        this.topFiveBestPractices = this.tag.success;
      }

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
