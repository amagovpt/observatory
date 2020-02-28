import { Component, OnInit, Input } from '@angular/core';
import { Website } from '../../models/website';

@Component({
  selector: 'app-website-statistics',
  templateUrl: './website-statistics.component.html',
  styleUrls: ['./website-statistics.component.scss']
})
export class WebsiteStatisticsComponent implements OnInit {

  @Input() website: Website;

  thresholdConfig: any;

  pagesWithErrors: number;
  pagesWithErrorsPercentage: string;
  pagesWithoutErrors: number;
  pagesWithoutErrorsPercentage: string;
  pagesWithoutErrorsA: number;
  pagesWithoutErrorsAPercentage: string;
  pagesWithoutErrorsAA: number;
  pagesWithoutErrorsAAPercentage: string;
  pagesWithoutErrorsAAA: number;
  pagesWithoutErrorsAAAPercentage: string;

  constructor() {
    this.thresholdConfig = {
      0: {color: 'red'},
      2.5: {color: 'orange'},
      5: {color: 'yellow'},
      7.5: {color: 'green'}
    };

    this.pagesWithErrors = 0;
    this.pagesWithoutErrorsA = 0;
    this.pagesWithoutErrorsAA = 0;
    this.pagesWithoutErrorsAAA = 0;
  }

  ngOnInit(): void {
    const pages = this.website.pages;
    const size = pages.length;
    for (let i = 0 ; i < size ; i++) {
      if (pages[i].evaluation.A === 0) {
        if (pages[i].evaluation.AA === 0) {
          if (pages[i].evaluation.AAA === 0) {
            this.pagesWithoutErrorsAAA++;
          } else {
            this.pagesWithoutErrorsAA++;
          }
        } else {
          this.pagesWithoutErrorsA++;
        }
      } else {
        this.pagesWithErrors++;
      }
    }

    this.pagesWithoutErrors = size - this.pagesWithErrors;

    this.pagesWithErrorsPercentage = ((this.pagesWithErrors / size) * 100).toFixed(1) + '%';
    this.pagesWithoutErrorsPercentage = ((this.pagesWithoutErrors / size) * 100).toFixed(1) + '%';
    this.pagesWithoutErrorsAPercentage = ((this.pagesWithoutErrorsA / size) * 100).toFixed(1) + '%';
    this.pagesWithoutErrorsAAPercentage = ((this.pagesWithoutErrorsAA / size) * 100).toFixed(1) + '%';
    this.pagesWithoutErrorsAAAPercentage = ((this.pagesWithoutErrorsAAA / size) * 100).toFixed(1) + '%';
  }
}
