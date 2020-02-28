import orderBy from 'lodash.orderby';
import { Tag } from './tag';
import { Website } from './website';

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

    let score = 0;
    const size = tags.length;

    const elemStats = {'aImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'a': {'lev': 'AA', 't': 0, 'p': 0}, 'aAdjacentSame': {'lev': 'A', 't': 0, 'p': 0}, 'aSameText': {'lev': 'AAA', 't': 0, 'p': 0}, 'abbrNo': {'lev': 'AAA', 't': 0, 'p': 0}, 'acckeyRep': {'lev': 'A', 't': 0, 'p': 0}, 'appletAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'areaAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'blink': {'lev': 'A', 't': 0, 'p': 0}, 'cssBlink': {'lev': 'A', 't': 0, 'p': 0}, 'colorContrast': {'lev': 'AA', 't': 0, 'p': 0}, 'ehandMouse': {'lev': 'A', 't': 0, 'p': 0}, 'ehandBothNo': {'lev': 'A', 't': 0, 'p': 0}, 'ehandTagNo': {'lev': 'A', 't': 0, 'p': 0}, 'embedAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldLegNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldNoForm': {'lev': 'A', 't': 0, 'p': 0}, 'fontHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'fontAbsVal': {'lev': 'AA', 't': 0, 'p': 0}, 'formSubmitNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameDtdNo': {'lev': 'A', 't': 0, 'p': 0}, 'hx': {'lev': 'A', 't': 0, 'p': 0}, 'hxNo': {'lev': 'AA', 't': 0, 'p': 0}, 'hxSkip': {'lev': 'AAA', 't': 0, 'p': 0}, 'idRep': {'lev': 'A', 't': 0, 'p': 0}, 'iframeTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNot': {'lev': 'A', 't': 0, 'p': 0}, 'inpImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'inputIdTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'justifiedTxt': {'lev': 'AAA', 't': 0, 'p': 0}, 'justifiedCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'labelForNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelPosNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelTextNo': {'lev': 'A', 't': 0, 'p': 0}, 'langCodeNo': {'lev': 'A', 't': 0, 'p': 0}, 'langNo': {'lev': 'A', 't': 0, 'p': 0}, 'langMatchNo': {'lev': 'A', 't': 0, 'p': 0}, 'langExtra': {'lev': 'A', 't': 0, 'p': 0}, 'layoutElem': {'lev': 'A', 't': 0, 'p': 0}, 'layoutAttr': {'lev': 'A', 't': 0, 'p': 0}, 'liNoList': {'lev': 'A', 't': 0, 'p': 0}, 'longDNo': {'lev': 'A', 't': 0, 'p': 0}, 'marquee': {'lev': 'A', 't': 0, 'p': 0}, 'metaRefresh': {'lev': 'A', 't': 0, 'p': 0}, 'metaRedir': {'lev': 'A', 't': 0, 'p': 0}, 'objectAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'scopeNo': {'lev': 'A', 't': 0, 'p': 0}, 'tableLayoutCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableDataCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableCaptionSummary': {'lev': 'A', 't': 0, 'p': 0}, 'titleVrs': {'lev': 'A', 't': 0, 'p': 0}, 'titleNo': {'lev': 'A', 't': 0, 'p': 0}, 'titleNull': {'lev': 'A', 't': 0, 'p': 0}, 'titleSame': {'lev': 'A', 't': 0, 'p': 0}, 'valueAbsHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'valueAbsCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'w3cValidatorErrors': {'lev': 'A', 't': 0, 'p': 0}, 'newWinOnLoad': {'lev': 'A', 't': 0, 'p': 0}};

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


      const errors = tag.errors;
      const keys = Object.keys(elemStats);

      for (const k in elemStats || {}) {
        if (k === 'a' || k === 'hx') {
          if (errors[k]) {
            if (Object.keys(this.errors).includes(k)) {
              this.errors[k].n_elems++;
              this.errors[k].n_pages++;
              this.errors[k].n_websites++;
            } else {
              this.errors[k] = { n_elems: 1, n_pages: 1, n_websites: 1 };
            }
          }
        } else {
          if (errors[k]) {
            let n = 0;
            if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
              n = 1;
            } else {
              n = errors[k].n_elems;
            }
            if (Object.keys(this.errors).includes(k)) {
              this.errors[k].n_elems += n;
              this.errors[k].n_pages += errors[k].n_pages;
              this.errors[k].n_websites += errors[k].n_websites;
            } else {
              this.errors[k] = { n_elems: n, n_pages: errors[k].n_pages, n_websites: errors[k].n_websites };
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

  getTag(id: number): Tag {
    return this.tags.find((tag: Tag) => tag.id === id);
  }

  getWebsite(tagId: number, websiteId: number): Website {
    return this.tags
      .find((tag: Tag) => tag.id = tagId).websites
      .find((website: Website) => website.id === websiteId);
  }
}
