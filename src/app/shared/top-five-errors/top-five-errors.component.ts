import { Component, OnInit, Input } from '@angular/core';
import orderBy from 'lodash.orderby';
import _tests from '../../tests';

@Component({
  selector: 'app-top-five-errors',
  templateUrl: './top-five-errors.component.html',
  styleUrls: ['./top-five-errors.component.scss']
})
export class TopFiveErrorsComponent implements OnInit {

  @Input('data') data: any;

  tests: any;

  errorsA: any;
  errorsAA: any;
  errorsAAA: any;

  constructor() {
    this.tests = _tests;
  }

  ngOnInit() {
    const errors = new Array<any>();
    for (const key in this.data || {}) {
      if (this.data[key]) {
        errors.push({
          key,
          n_elems: this.data[key].n_elems,
          n_pages: this.data[key].n_pages,
          lvl: this.tests[key].level.toUpperCase()
        });
      }
    }

    this.errorsA = errors.filter((e: any) => e.lvl === 'A');
    this.errorsAA = errors.filter((e: any) => e.lvl === 'AA');
    this.errorsAAA = errors.filter((e: any) => e.lvl === 'AAA');

    this.errorsA = orderBy(this.errorsA, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
    this.errorsAA = orderBy(this.errorsAA, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
    this.errorsAAA = orderBy(this.errorsAAA, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
  }
}
