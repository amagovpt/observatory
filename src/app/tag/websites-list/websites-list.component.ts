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

  constructor() { }

  ngOnInit(): void {
    let rank = 1;
    this.sortedData = this.tag.websites
      .slice()
      .sort((w: Website, w2: Website) => w.getScore() - w2.getScore())
      .reverse()
      .map((w: Website) => {
        w.rank = rank;
        rank++;
        return w;
      });
  }

  sortData(sort: Sort) {
    const data = this.tag.websites.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'rank': return compare(a.rank, b.rank, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'score': return compare(a.getScore(), b.getScore(), isAsc);
        case 'pages': return compare(a.pages.length, b.pages.length, isAsc);
        case 'A': return compare(a.A, b.A, isAsc);
        case 'AA': return compare(a.AA, b.AA, isAsc);
        case 'AAA': return compare(a.AAA, b.AAA, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
