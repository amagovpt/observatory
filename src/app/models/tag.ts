import orderBy from 'lodash.orderby';
import { Website } from './website';

export class Tag {
  id: number;
  rank: number;
  name: string;
  creationDate: Date;
  websites: Array<Website>;
  nPages: number;
  score: number;
  A: number;
  AA: number;
  AAA: number;
  frequencies: Array<number>;
  errors: any;
  recentPage: Date;
  oldestPage: Date;

  constructor(id: number, name: string, creationDate: Date) {
    this.id = id;
    this.rank = -1;
    this.name = name;
    this.creationDate = creationDate;
    this.websites = new Array<Website>();
    this.nPages = 0;
    this.score = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
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

    const elemStats = {'aImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'a': {'lev': 'AA', 't': 0, 'p': 0}, 'aAdjacentSame': {'lev': 'A', 't': 0, 'p': 0}, 'aSameText': {'lev': 'AAA', 't': 0, 'p': 0}, 'abbrNo': {'lev': 'AAA', 't': 0, 'p': 0}, 'acckeyRep': {'lev': 'A', 't': 0, 'p': 0}, 'appletAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'areaAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'blink': {'lev': 'A', 't': 0, 'p': 0}, 'cssBlink': {'lev': 'A', 't': 0, 'p': 0}, 'colorContrast': {'lev': 'AA', 't': 0, 'p': 0}, 'ehandMouse': {'lev': 'A', 't': 0, 'p': 0}, 'ehandBothNo': {'lev': 'A', 't': 0, 'p': 0}, 'ehandTagNo': {'lev': 'A', 't': 0, 'p': 0}, 'embedAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldLegNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldNoForm': {'lev': 'A', 't': 0, 'p': 0}, 'fontHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'fontAbsVal': {'lev': 'AA', 't': 0, 'p': 0}, 'formSubmitNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameDtdNo': {'lev': 'A', 't': 0, 'p': 0}, 'hx': {'lev': 'A', 't': 0, 'p': 0}, 'hxNo': {'lev': 'AA', 't': 0, 'p': 0}, 'hxSkip': {'lev': 'AAA', 't': 0, 'p': 0}, 'idRep': {'lev': 'A', 't': 0, 'p': 0}, 'iframeTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNot': {'lev': 'A', 't': 0, 'p': 0}, 'inpImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'inputIdTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'justifiedTxt': {'lev': 'AAA', 't': 0, 'p': 0}, 'justifiedCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'labelForNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelPosNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelTextNo': {'lev': 'A', 't': 0, 'p': 0}, 'langCodeNo': {'lev': 'A', 't': 0, 'p': 0}, 'langNo': {'lev': 'A', 't': 0, 'p': 0}, 'langMatchNo': {'lev': 'A', 't': 0, 'p': 0}, 'langExtra': {'lev': 'A', 't': 0, 'p': 0}, 'layoutElem': {'lev': 'A', 't': 0, 'p': 0}, 'layoutAttr': {'lev': 'A', 't': 0, 'p': 0}, 'liNoList': {'lev': 'A', 't': 0, 'p': 0}, 'longDNo': {'lev': 'A', 't': 0, 'p': 0}, 'marquee': {'lev': 'A', 't': 0, 'p': 0}, 'metaRefresh': {'lev': 'A', 't': 0, 'p': 0}, 'metaRedir': {'lev': 'A', 't': 0, 'p': 0}, 'objectAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'scopeNo': {'lev': 'A', 't': 0, 'p': 0}, 'tableLayoutCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableDataCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableCaptionSummary': {'lev': 'A', 't': 0, 'p': 0}, 'titleVrs': {'lev': 'A', 't': 0, 'p': 0}, 'titleNo': {'lev': 'A', 't': 0, 'p': 0}, 'titleNull': {'lev': 'A', 't': 0, 'p': 0}, 'titleSame': {'lev': 'A', 't': 0, 'p': 0}, 'valueAbsHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'valueAbsCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'w3cValidatorErrors': {'lev': 'A', 't': 0, 'p': 0}, 'newWinOnLoad': {'lev': 'A', 't': 0, 'p': 0}};

    const perrors = website.errors;
    const keys = Object.keys(elemStats);
    const size = keys.length;

    for (let i = 0 ; i < size ; i++) {
      const k = keys[i];
      if (k === 'a' || k === 'hx') {
        if (perrors[k]) {
          if (Object.keys(this.errors).includes(k)) {
            this.errors[k].n_elems++;
            this.errors[k].n_pages++;
            this.errors[k].n_websites++;
          } else {
            this.errors[k] = { n_elems: 1, n_pages: 1, n_websites: 1 };
          }
        }
      } else {
        if (perrors[k]) {
          let n = 0;
          if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
            n = 1;
          } else {
            n = perrors[k].n_elems;
          }
          if (Object.keys(this.errors).includes(k)) {
            this.errors[k].n_elems += n;
            this.errors[k].n_pages += perrors[k].n_pages;
            this.errors[k].n_websites++;
          } else {
            this.errors[k] = { n_elems: n, n_pages: perrors[k].n_pages, n_websites: 1 };
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
  }

  getScore(): number {
    return this.score / this.websites.length;
  }

  getTopTenErrors(): any {
    const errors = this.errors.map((v: any, k: number) => {
      return {
        key: k,
        n_elems: this.errors[k].n_elems,
        n_pages: this.errors[k].n_pages,
        n_websites: this.errors[k].n_websites
      };
    });
    return orderBy(errors, ['n_elems', 'n_pages', 'n_websites'], ['desc', 'desc', 'desc']).slice(0, 10);
  }
}
