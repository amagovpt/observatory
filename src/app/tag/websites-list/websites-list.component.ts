import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { Tag } from '../../models/tag';
import { Website } from '../../models/website';

@Component({
  selector: 'app-websites-list',
  templateUrl: './websites-list.component.html',
  styleUrls: ['./websites-list.component.scss']
})
export class WebsitesListComponent implements OnInit {

  @Input() tag: Tag;
  @Input() multi: boolean;

  sortedData: Array<Website>;
  websites: Array<Website>;

  indicator1:  number;
  indicator2: number;

  pageSize: number;

  constructor() { }

  ngOnInit(): void {
    let rank = 1;
    this.websites = this.tag.websites
      .slice()
      .sort((w: Website, w2: Website) => w.getScore() - w2.getScore())
      .reverse()
      .map((w: Website) => {
        w.rank = rank;
        rank++;
        return w;
      });

    this.pageSize = 2;
    
    this.sortedData = this.websites.slice(0, this.pageSize);
    
    this.indicator1 = 1;
    this.indicator2 = this.websites.length > this.pageSize ? this.pageSize : this.websites.length;
  }

  nextPage(): void {
    this.sortedData = this.websites.slice(this.indicator2, this.indicator2 + this.pageSize);
    this.indicator1 = this.indicator1 + this.pageSize;
    this.indicator2 = this.indicator2 + this.pageSize > this.websites.length ? this.websites.length : this.indicator2 + this.pageSize;
  }

  previousPage(): void {
    this.sortedData = this.websites.slice(this.indicator1 - this.pageSize - 1 < 0 ? 0 : this.indicator1 - this.pageSize - 1, this.indicator1 - 1);
    this.indicator2 = this.indicator1 - 1;
    this.indicator1 = this.indicator1 - this.pageSize < 1 ? 1 : this.indicator1 - this.pageSize;
  }

  firstPage(): void {
    this.sortedData = this.websites.slice(0, this.pageSize);
    this.indicator1 = 1;
    this.indicator2 = this.websites.length > this.pageSize ? this.pageSize : this.websites.length;
  }

  lastPage(): void {
    this.indicator2 = this.websites.length;
    this.indicator1 = this.indicator2 % this.pageSize === 0 ? this.indicator2 - this.pageSize + 1 : this.indicator2 - (this.indicator2 % this.pageSize) + 1;
    this.sortedData = this.websites.slice(this.indicator1 - 1, this.indicator2);
  }

  changeItemsPerPage(e): void {
    this.pageSize = parseInt(e.target.value);
    if (this.indicator1 + this.pageSize > this.websites.length) {
      this.lastPage();
    } else {
      this.indicator2 = this.indicator1 + this.pageSize - 1;
      this.sortedData = this.websites.slice(this.indicator1 - 1, this.indicator2);
    }
  }

  sortData(sort: Sort) {
    this.websites = this.websites.slice().reverse();

    if (this.indicator1 + this.pageSize > this.websites.length) {
      this.lastPage();
    } else {
      this.indicator2 = this.indicator1 + this.pageSize - 1;
      this.sortedData = this.websites.slice(this.indicator1 - 1, this.indicator2);
    }
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
