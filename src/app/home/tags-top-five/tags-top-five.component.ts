import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

import { ListTags } from '../../models/list-tags';
import { Tag } from '../../models/tag';
import tests from "../../tests";

@Component({
  selector: 'app-tags-top-five',
  templateUrl: './tags-top-five.component.html',
  styleUrls: ['./tags-top-five.component.scss']
})
export class TagsTopFiveComponent implements OnInit {

  @Input('listTags') listTags: ListTags;

  sortedData: Array<Tag>;
  selection: SelectionModel<string>;
  testsFile: any;

  constructor() {
    this.selection = new SelectionModel<string>(true, []);
  }

  ngOnInit(): void {

    this.testsFile = tests;

    let rank = 1;
    this.sortedData = this.listTags.tags.slice().sort((a, b) => a.getScore() - b.getScore()).reverse().map((t: Tag) => {
      t.rank = rank;
      if (rank <= 5) {
        rank++;
        return t;
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.listTags.tags.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'rank': return compare(a.rank, b.rank, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'score': return compare(a.getScore(), b.getScore(), isAsc);
        case 'websites': return compare(a.websites, b.websites, isAsc);
        case 'pages': return compare(a.nPages, b.nPages, isAsc);
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
