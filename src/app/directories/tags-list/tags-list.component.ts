import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

import { ListTags } from '../../models/list-tags';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

  @Input() listTags: ListTags;

  sortedData: Array<Tag>;
  selection: SelectionModel<string>;

  constructor() {
    this.selection = new SelectionModel<string>(true, []);
  }

  ngOnInit(): void {
    let rank = 1;
    this.sortedData = this.listTags.tags
      .slice()
      .sort((a: Tag, b: Tag) => a.getScore() - b.getScore())
      .reverse()
      .map((t: Tag) => {
        t.rank = rank;
        rank++;
        return t;
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
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
