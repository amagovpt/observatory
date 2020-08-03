import { Page } from './page';
import tests from '../tests';
import orderBy from 'lodash.orderby';
import { error } from '@angular/compiler/src/util';

export class Website {
  id: number;
  rank: number;
  entity: string;
  name: string;
  domain: string;
  creationDate: Date;
  pages: Array<Page>;
  score: number;
  A: number;
  AA: number;
  AAA: number;
  frequencies: Array<number>;
  errors: any;
  recentPage: Date;
  oldestPage: Date;
  success: any;
  tot: any;

  constructor(id: number, entity: string, name: string, domain: string, creationDate: Date) {
    this.id = id;
    this.rank = -1;
    this.entity = entity;
    this.name = name;
    this.domain = domain;
    this.creationDate = creationDate;
    this.pages = new Array<Page>();
    this.score = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
    this.success = {};
    this.tot = {};
  }

  addPage(pageId: number, uri: string, creationDate: Date, evaluationId: number,
          title: string, score: number, errors: any, tot: any, A: number, AA: number, AAA: number,
          evaluationDate: Date): void {

    const page = new Page(pageId, uri, creationDate);
    page.addEvaluation(evaluationId, title, score, errors, tot, A, AA, AAA, evaluationDate);
    this.pages.push(page);

    this.score += score;

    if (A === 0) {
      if (AA === 0) {
        if (AAA === 0) {
          this.AAA++;
        } else {
          this.AA++;
        }
      } else {
        this.A++;
      }
    }

    const floor = Math.floor(score);
    this.frequencies[ floor >= 2 ? floor === 10 ? floor - 2 : floor - 1 : 0 ]++;

    const perrors = page.evaluation.errors;

    for (const key in page.evaluation.tot.results || {}) {

      let tnum;
      let test = tests[key]['test'];
      let elem = tests[key]['elem'];
      if (key === 'layout_01a' || key === 'layout_02a' || key === 'a_01a' || key === 'a_01b' || key.includes('title_')) {
        tnum = 1;
      } else {
        if (page.evaluation.tot.elems[test]) {
          if (test === 'langNo' || test === 'langCodeNo' || test === 'langExtra' || test === 'titleNo' || test === 'titleOk' || test === 'lang' || test === 'aSkipFirst') {
            tnum = 1;
          } else {
            tnum = page.evaluation.tot['elems'][test];
          }
        } else {
          tnum = page.evaluation.tot['elems'][elem];
        }
      }

      if (Object.keys(this.tot).includes(key)) {
        this.tot[key]['n_times'] += tnum;
        this.tot[key]['n_pages']++;
      } else {
        this.tot[key] = {
          n_pages: 1,
          n_times: tnum,
          elem: tests[key]['elem'],
          test: tests[key]['test'],
          result: tests[key]['result']
        };
      }

      const k = tests[key]['test'];

      if (tests[key]['result'] === 'failed') {
        if (k === 'a' || k === 'hx') {
          return;
        }

        if (perrors[k]) {
          let n = 0;
          if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
            n = 1;
          } else {
            n = parseInt(perrors[k], 0);
          }
          if (Object.keys(this.errors).includes(key)) {
            this.errors[key]['n_elems'] += n;
            this.errors[key]['n_pages']++;
          } else {
            this.errors[key] = {n_elems: n, elem: tests[key]['elem'], n_pages: 1};
          }
        }
      } else if (tests[key]['result'] === 'passed') {
        if (k === 'a' || k === 'hx') {
          return;
        }
        if (Object.keys(this.success).includes(key)) {
          this.success[key]['n_pages']++;
        } else {
          this.success[key] = {key: key, test: k, elem: tests[key]['elem'], n_pages: 1};
        }
      }
    }

    if (!this.recentPage) {
      this.recentPage = evaluationDate;
    }

    if (!this.oldestPage) {
      this.oldestPage = evaluationDate;
    }

    if (evaluationDate > this.recentPage) {
      this.recentPage = evaluationDate;
    } else if (evaluationDate < this.oldestPage) {
      this.oldestPage = evaluationDate;
    }
  }

  getScore(): number {
    return this.score / this.pages.length;
  }

  getAllScores(): Array<number> {
    return this.pages.map((page: Page) => page.evaluation.score);
  }

  getTopTenErrors(): any {
    const errors = new Array<any>();
    for (const key in this.errors || {}) {
      if (this.errors[key]) {
        errors.push({
          key,
          n_elems: this.errors[key].n_elems,
          n_pages: this.errors[key].n_pages,
        });
      }
    }

    return orderBy(errors, ['n_elems', 'n_pages'], ['desc', 'desc']).slice(0, 10);
  }

  getErrorOccurrencesByPage(test: string): Array<number> {
    const occurrences = new Array<number>();
    
    for (const p of this.pages) {
      const error = p.evaluation.tot['elems'][tests[test]['test']];
      if (error && tests[test]['result'] === 'failed') {
        if (error === 'langNo' || error === 'titleNo') {
          occurrences.push(1);
        } else {
          occurrences.push(error);
        }
      }
    }
    return occurrences;
  }
}
