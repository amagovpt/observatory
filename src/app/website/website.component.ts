import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from '../data.service';

import { Tag } from '../models/tag';
import { Website } from '../models/website';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit, OnDestroy {

  sub: Subscription;
  tag: Tag;
  website: Website;

  scoreDistributionData: any;
  errorDistributionData: any;
  topFiveErrorsData: any;
  accessibilityPlotData: any;
  tableData: any;

  loading: boolean;
  error: boolean;

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
      const listTags = this.data.getListTags();

      const multi = params.tag.includes('+');
      if (multi) {
        const tags = params.tag.split('+');
        let websiteExists = true;
        for (const id of tags || []) {
          websiteExists = websiteExists && listTags.getTag(parseInt(id, 0)) ? true : false;
        }
        if (websiteExists) {
          this.tag = listTags.getTag(parseInt(tags[0], 0));
        }
      } else {
        this.tag = listTags.getTag(parseInt(params.tag, 0));
      }

      if (this.tag) {
        this.website = this.tag.websites.find((w: Website) => w.id === parseInt(params.website, 0));

        if (this.website) {
          this.scoreDistributionData =  {
            number: this.website.pages.length,
            frequency: this.website.frequencies
          };
          this.errorDistributionData = {
            errors: this.website.getTopTenErrors(),
            isCat: false
          };
          this.topFiveErrorsData = this.website.errors;
          this.accessibilityPlotData = this.website.getAllScores();
          this.tableData = this.website;
        } else {
          this.error = true;
        }
      } else {
        this.error = true;
      }

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
