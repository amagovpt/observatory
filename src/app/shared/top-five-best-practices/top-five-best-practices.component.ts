import { Component, OnInit, Input } from '@angular/core';
import orderBy from 'lodash.orderby';
import _tests from '../../tests';

@Component({
  selector: 'app-top-five-best-practices',
  templateUrl: './top-five-best-practices.component.html',
  styleUrls: ['./top-five-best-practices.component.scss']
})
export class TopFiveBestPracticesComponent implements OnInit {

  @Input('data') data: any;
  tests: any;

  success: any;

  constructor() {
    this.tests = _tests;
  }

  ngOnInit(): void {
    const success = new Array<any>();
    for (const key in this.data || {}) {
      if (this.data[key]) {
        success.push({
          key,
          n_elems: this.data[key].n_elems,
          n_pages: this.data[key].n_pages,
          lvl: this.tests[key].level.toUpperCase()
        });
      }
    }

    this.success = orderBy(success, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
  }

}
