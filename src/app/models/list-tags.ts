import orderBy from 'lodash.orderby';
import { Tag } from './tag';
import { Website } from './website';
import tests from '../tests';

export class ListTags {
  tags: Array<Tag>;
  nWebsites: number;
  nPages: number;
  score: number;
  A: number;
  AA: number;
  AAA: number;
  frequencies: Array<number>;
  errors: any;
  success: any;
  tot: any;
  recentPage: Date;
  oldestPage: Date;

  constructor(tags: Array<Tag>) {
    this.tags = tags;
    this.nWebsites = 0;
    this.nPages = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
    this.success = {};
    this.tot = {};

    let score = 0;
    const size = tags.length;

    for (const tag of tags || []) {
      score += tag.getScore();
      this.nWebsites += tag.websites.length;
      this.nPages += tag.nPages;
      this.A += tag.A;
      this.AA += tag.AA;
      this.AAA += tag.AAA;
      this.frequencies = this.frequencies.map((v: number, j: number) => {
        return v + tag.frequencies[j];
      });

      const perrors = tag.errors;
      const tSuccess = tag.success;

      for (const key in tag.tot || {}) {
        const value = tag.tot[key];

        if (Object.keys(this.tot).includes(key)) {
          this.tot[key]['n_pages'] += value['n_pages'];
          this.tot[key]['n_times'] += value['n_times'];
          this.tot[key]['n_websites'] += value['n_websites'];
        } else {
          this.tot[key] = {n_pages: value['n_pages'], n_websites: value['n_websites'], n_times: value['n_times'], elem: value['elem'], test: value['test'], result: value['result']};
        }

        const k = tests[key]['test'];

        if (tests[key]['result'] === 'failed') {
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
                this.errors[key]['n_websites'] += perrors[key]['n_websites'];
              } else {
                this.errors[key] = {
                  n_elems: n,
                  n_pages: perrors[key]['n_pages'],
                  n_websites: perrors[key]['n_websites']
                };
              }
            }
          }
        } else if (tests[key]['result'] === 'passed') {
          if (k === 'a' || k === 'hx') {
            if (tSuccess[key]) {
              if (Object.keys(this.success).includes(key)) {
                this.success[key]['n_pages']++;
                this.success[key]['n_websites']++;
              } else {
                this.success[key] = {key: key, test: k, elem: tests[key]['elem'], n_pages: 1, n_websites: 1};
              }
            }
          } else {
            if (tSuccess[key]) {
              const n = parseInt(tSuccess[key]['n_elems'], 0);
              if (Object.keys(this.success).includes(key)) {
                this.success[key]['n_pages'] += tSuccess[key]['n_pages'];
                this.success[key]['n_websites']++;
              } else {
                this.success[key] = {key: key, test: k, elem: tests[key]['elem'], n_pages: tSuccess[key]['n_pages'], n_websites: 1};
              }
            }
          }
        }
      }

      if (!this.recentPage) {
        this.recentPage = tag.recentPage;
      }

      if (!this.oldestPage) {
        this.oldestPage = tag.oldestPage;
      }

      if (tag.recentPage > this.recentPage) {
        this.recentPage = tag.recentPage;
      } else if (tag.oldestPage < this.oldestPage) {
        this.oldestPage = tag.oldestPage;
      }
    }

    this.score = score / size;
  }

  getScore(): number {
    return this.score;
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

  getPassedAndWarningOccurrenceByTag(occur: string): Array<number> {
    const occurrences = new Array<number>();

    for (const t of this.tags) {
      if (t.tot[occur] && (t.tot[occur]['result'] === 'passed' || t.tot[occur]['result'] === 'warning')) {
        if (occur === 'langNo' || occur === 'langCodeNo' || occur === 'langExtra' || occur === 'titleNo' || occur === 'titleOk' || occur === 'lang' || occur === 'aSkipFirst') {
          occurrences.push(1);
        } else {
          occurrences.push(t.tot[occur]['n_times']);
        }
      }
    }
    return occurrences;
  }

  getErrorOccurrenceByTag(occur: string): Array<number> {
    const occurrences = new Array<number>();

    for (const t of this.tags) {
      if (t.tot[occur] && t.tot[occur]['result'] === 'failed') {
        if((occur === 'langNo' || occur === 'titleNo')){
          occurrences.push(1);
        } else {
          occurrences.push(t.tot[occur]['n_times']);
        }
      }
    }
    return occurrences;
  }

  getTag(id: number): Tag {
    return this.tags.find((tag: Tag) => tag.id === id);
  }

  getWebsite(tagId: number, websiteId: number): Website {
    const tag = this.tags.find((tag: Tag) => tag.id === tagId);
    const websites = tag.websites;
    const website = websites.find((website: Website) => website.id === websiteId);
    return website;
  }
}
