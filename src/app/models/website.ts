import { Page } from './page';

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
  }

  addPage(pageId: number, uri: string, creationDate: Date, evaluationId: number,
          title: string, score: number, errors: any, A: number, AA: number, AAA: number,
          evaluationDate: Date): void {

    const page = new Page(pageId, uri, creationDate);
    page.addEvaluation(evaluationId, title, score, errors, A, AA, AAA, evaluationDate);
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

    const elemStats = {'aImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'a': {'lev': 'AA', 't': 0, 'p': 0}, 'aAdjacentSame': {'lev': 'A', 't': 0, 'p': 0}, 'aSameText': {'lev': 'AAA', 't': 0, 'p': 0}, 'abbrNo': {'lev': 'AAA', 't': 0, 'p': 0}, 'acckeyRep': {'lev': 'A', 't': 0, 'p': 0}, 'appletAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'areaAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'blink': {'lev': 'A', 't': 0, 'p': 0}, 'cssBlink': {'lev': 'A', 't': 0, 'p': 0}, 'colorContrast': {'lev': 'AA', 't': 0, 'p': 0}, 'ehandMouse': {'lev': 'A', 't': 0, 'p': 0}, 'ehandBothNo': {'lev': 'A', 't': 0, 'p': 0}, 'ehandTagNo': {'lev': 'A', 't': 0, 'p': 0}, 'embedAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldLegNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldNoForm': {'lev': 'A', 't': 0, 'p': 0}, 'fontHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'fontAbsVal': {'lev': 'AA', 't': 0, 'p': 0}, 'formSubmitNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameDtdNo': {'lev': 'A', 't': 0, 'p': 0}, 'hx': {'lev': 'A', 't': 0, 'p': 0}, 'hxNo': {'lev': 'AA', 't': 0, 'p': 0}, 'hxSkip': {'lev': 'AAA', 't': 0, 'p': 0}, 'idRep': {'lev': 'A', 't': 0, 'p': 0}, 'iframeTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNot': {'lev': 'A', 't': 0, 'p': 0}, 'inpImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'inputIdTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'justifiedTxt': {'lev': 'AAA', 't': 0, 'p': 0}, 'justifiedCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'labelForNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelPosNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelTextNo': {'lev': 'A', 't': 0, 'p': 0}, 'langCodeNo': {'lev': 'A', 't': 0, 'p': 0}, 'langNo': {'lev': 'A', 't': 0, 'p': 0}, 'langMatchNo': {'lev': 'A', 't': 0, 'p': 0}, 'langExtra': {'lev': 'A', 't': 0, 'p': 0}, 'layoutElem': {'lev': 'A', 't': 0, 'p': 0}, 'layoutAttr': {'lev': 'A', 't': 0, 'p': 0}, 'liNoList': {'lev': 'A', 't': 0, 'p': 0}, 'longDNo': {'lev': 'A', 't': 0, 'p': 0}, 'marquee': {'lev': 'A', 't': 0, 'p': 0}, 'metaRefresh': {'lev': 'A', 't': 0, 'p': 0}, 'metaRedir': {'lev': 'A', 't': 0, 'p': 0}, 'objectAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'scopeNo': {'lev': 'A', 't': 0, 'p': 0}, 'tableLayoutCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableDataCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableCaptionSummary': {'lev': 'A', 't': 0, 'p': 0}, 'titleVrs': {'lev': 'A', 't': 0, 'p': 0}, 'titleNo': {'lev': 'A', 't': 0, 'p': 0}, 'titleNull': {'lev': 'A', 't': 0, 'p': 0}, 'titleSame': {'lev': 'A', 't': 0, 'p': 0}, 'valueAbsHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'valueAbsCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'w3cValidatorErrors': {'lev': 'A', 't': 0, 'p': 0}, 'newWinOnLoad': {'lev': 'A', 't': 0, 'p': 0}};

    const perrors = page.evaluation.errors;
    const keys = Object.keys(elemStats);
    const size = keys.length;

    for (let i = 0 ; i < size ; i++) {
      const k = keys[i];
      if (k === 'a' || k === 'hx') {
        continue;
      }
      if (perrors[k]) {
        let n = 0;
        if (k === 'langNo' || k === 'langCodeNo' || k === 'langExtra' || k === 'titleNo') {
          n = 1;
        } else {
          n = parseInt(perrors[k], 0);
        }
        if (Object.keys(this.errors).includes(k)) {
          this.errors[k].n_elems += n;
          this.errors[k].n_pages++;
        } else {
          this.errors[k] = { n_elems: n, n_pages: 1 };
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

    return errors.sort((a: any, b: any) => a.n_elems - b.n_elems).slice(0, 10);
  }

  getErrorOccurrencesByPage(error: string): Array<number> {
    const occurrences = new Array<number>();

    for (const p of this.pages) {
      if (p.evaluation.errors[error] && (error === 'langNo' || error === 'titleNo')) {
        occurrences.push(1);
      } else {
        occurrences.push(p.evaluation.errors[error]);
      }

    }
    return occurrences;
  }
}
