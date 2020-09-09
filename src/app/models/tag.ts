import orderBy from 'lodash.orderby';
import { Website } from './website';
import tests from "../tests";

export class Tag {
  id: number;
  rank: number;
  name: string;
  creationDate: Date;
  websites: Array<Website>;
  nPages: number;
  entities: Array<string>;
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

  constructor(id: number, name: string, creationDate: Date) {
    this.id = id;
    this.rank = -1;
    this.name = name;
    this.creationDate = creationDate;
    this.websites = new Array<Website>();
    this.nPages = 0;
    this.entities = new Array<string>();
    this.score = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
    this.success = {};
    this.tot = {};
  }

  addWebsite(website: Website): void {
    this.websites.push(website);
    this.nPages += website.pages.length;
    this.score += website.getScore();

    if (website.AAA === website.pages.length) {
      this.AAA++;
    } else if (website.AAA + website.AA === website.pages.length) {
      this.AA++;
    } else if (website.AAA + website.AA + website.A === website.pages.length) {
      this.A++;
    }

    this.frequencies = this.frequencies.map((v: number, i: number) => {
      return v + website.frequencies[i];
    });

    const perrors = website.errors;
    const wSuccess = website.success;

    for (const key in website.tot || {}) {
      const value = website.tot[key];
      if (Object.keys(this.tot).includes(key)) {
        this.tot[key]['n_pages'] += value['n_pages'];
        this.tot[key]['n_times'] += value['n_times'];
        this.tot[key]['n_websites']++;
      } else {
        this.tot[key] = {n_pages: value['n_pages'], n_websites: 1, n_times: value['n_times'], elem: value['elem'], test: value['test'], result: value['result']};
      }

      if (tests[key]['result'] === 'failed') {
        const k = tests[key]['test'];
        if (k === 'a' || k === 'hx') {
          if (perrors[key]) {
            if (Object.keys(this.errors).includes(key)) {
              this.errors[key]['n_elems']++;
              this.errors[key]['n_pages']++;
              this.errors[key]['n_websites']++;
            } else {
              this.errors[key] = {n_elems: 1, n_pages: 1, n_websites: 1};
            }
          }
        } else {
          if (perrors[key]) {
            let n = 0;
            if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
              n = 1;
            } else {
              n = parseInt(perrors[key]['n_elems'], 0);
            }
            if (Object.keys(this.errors).includes(key)) {
              this.errors[key]['n_elems'] += n;
              this.errors[key]['n_pages'] += perrors[key]['n_pages'];
              this.errors[key]['n_websites']++;
            } else {
              this.errors[key] = {n_elems: n, n_pages: perrors[key]['n_pages'], n_websites: 1};
            }
          }
        }
      } else if (tests[key]['result'] === 'passed') {
        const t = tests[key]['test'];
        if (t === 'a' || t === 'hx') {
          if (wSuccess[key]) {
            if (Object.keys(this.success).includes(key)) {
              this.success[key]['n_pages']++;
              this.success[key]['n_websites']++;
            } else {
              this.success[key] = {key: key, test: t, elem: tests[key]['elem'], n_pages: 1, n_websites: 1};
            }
          }
        } else {
          if (wSuccess[key]) {
            if (Object.keys(this.success).includes(key)) {
              this.success[key]['n_pages'] += wSuccess[key]['n_pages'];
              this.success[key]['n_websites']++;
            } else {
              this.success[key] = {key: key, test: t, elem: tests[key]['elem'], n_pages: wSuccess[key]['n_pages'], n_websites: 1};
            }
          }
        }
      }
    }

    if (!this.recentPage) {
      this.recentPage = website.recentPage;
    }

    if (!this.oldestPage) {
      this.oldestPage = website.oldestPage;
    }

    if (website.recentPage > this.recentPage) {
      this.recentPage = website.recentPage;
    } else if (website.oldestPage < this.oldestPage) {
      this.oldestPage = website.oldestPage;
    }

    if (website.entity && !this.entities.includes(website.entity)) {
      this.entities.push(website.entity);
    }
  }

  getScore(): number {
    return this.score / this.websites.length;
  }

  getTopTenErrors(): any {
    const errors = new Array<any>();
    for (const key in this.errors || {}) {
      if (this.errors[key]) {
        errors.push({
          key,
          n_elems: this.errors[key].n_elems,
          n_pages: this.errors[key].n_pages,
          n_websites: this.errors[key].n_websites
        });
      }
    }
    return orderBy(errors, ['n_elems', 'n_pages', 'n_websites'], ['desc', 'desc', 'desc']).slice(0, 10);
  }

  getPassedAndWarningOccurrenceByWebsite(occur: string): Array<number> {
    const occurrences = new Array<number>();

    for (const w of this.websites || []) {
      if (w.tot[occur] && (w.tot[occur]['result'] === 'passed' || w.tot[occur]['result'] === 'warning')) {
        if (occur === 'langNo' || occur === 'langCodeNo' || occur === 'langExtra' || occur === 'titleNo' || occur === 'titleOk' || occur === 'lang' || occur === 'aSkipFirst') {
          occurrences.push(1);
        } else {
          occurrences.push(w.tot[occur]['n_times']);
        }
      }
    }
    return occurrences;
  }

  getErrorOccurrenceByWebsite(occur: string): Array<number> {
    const occurrences = new Array<number>();

    for (const w of this.websites) {
      if (w.tot[occur] && w.tot[occur]['result'] === 'failed') {
        if((occur === 'langNo' || occur === 'titleNo')){
          occurrences.push(1);
        } else {
          occurrences.push(w.tot[occur]['n_times']);
        }
      }
    }
    return occurrences;
  }
}
