import { Page } from "./page";
import tests from "../tests";
import orderBy from "lodash.orderby";

export class Website {
  id: number;
  rank: number;
  entity: string;
  name: string;
  declaration: number | null;
  stamp: number | null;
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

  constructor(
    id: number,
    entity: string,
    name: string,
    declaration: number | null,
    stamp: number | null,
    domain: string,
    creationDate: Date
  ) {
    this.id = id;
    this.rank = -1;
    this.entity = entity;
    this.name = name;
    this.declaration = declaration;
    this.stamp = stamp;
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
  }

  addPage(
    pageId: number,
    uri: string,
    creationDate: Date,
    evaluationId: number,
    title: string,
    score: number,
    errors: any,
    tot: any,
    A: number,
    AA: number,
    AAA: number,
    evaluationDate: Date
  ): void {
    const page = new Page(pageId, uri, creationDate);
    page.addEvaluation(
      evaluationId,
      title,
      score,
      errors,
      tot,
      A,
      AA,
      AAA,
      evaluationDate
    );
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
    this.frequencies[floor >= 2 ? (floor === 10 ? floor - 2 : floor - 1) : 0]++;

    const pageErrors = page.evaluation.errors;

    for (const key in page.evaluation.tot.results || {}) {
      const test = tests[key]["test"];
      const elem = tests[key]["elem"];
      const occurrences =
        pageErrors[test] === undefined || pageErrors[test] < 1
          ? 1
          : pageErrors[test];
      const result = tests[key]["result"];

      if (result === "failed") {
        if (Object.keys(this.errors).includes(key)) {
          this.errors[key]["n_occurrences"] += occurrences;
          this.errors[key]["n_pages"]++;
        } else {
          this.errors[key] = {
            n_pages: 1,
            n_occurrences: occurrences,
            elem,
            test,
            result,
          };
        }
      } else if (result === "passed") {
        if (Object.keys(this.success).includes(key)) {
          this.success[key]["n_occurrences"] += occurrences;
          this.success[key]["n_pages"]++;
        } else {
          this.success[key] = {
            n_pages: 1,
            n_occurrences: occurrences,
            elem,
            test,
            result,
          };
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

  getTopTenBestPractices(): any {
    const practices = new Array<any>();
    for (const key in this.success || {}) {
      practices.push({
        key,
        n_occurrences: this.success[key].n_occurrences,
        n_pages: this.success[key].n_pages,
      });
    }

    return orderBy(
      practices,
      ["n_occurrences", "n_pages"],
      ["desc", "desc"]
    ).slice(0, 10);
  }

  getTopTenErrors(): any {
    const errors = new Array<any>();
    for (const key in this.errors || {}) {
      errors.push({
        key,
        n_occurrences: this.errors[key].n_occurrences,
        n_pages: this.errors[key].n_pages,
      });
    }

    return orderBy(
      errors,
      ["n_occurrences", "n_pages"],
      ["desc", "desc"]
    ).slice(0, 10);
  }

  getPassedOccurrencesByPage(test: string): Array<number> {
    const occurrences = new Array<number>();
    for (const page of this.pages || []) {
      const practice = page.evaluation.tot.elems[tests[test]["test"]];
      if (
        page.evaluation.tot.results[test] &&
        tests[test]["result"] === "passed"
      ) {
        if (!practice) {
          occurrences.push(1);
        } else {
          occurrences.push(practice);
        }
      }
    }
    return occurrences;
  }

  getErrorOccurrencesByPage(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const page of this.pages || []) {
      const error = page.evaluation.tot.elems[tests[test]["test"]];
      if (
        page.evaluation.tot.results[test] &&
        tests[test]["result"] === "failed"
      ) {
        if (!error) {
          occurrences.push(1);
        } else {
          occurrences.push(error);
        }
      }
    }
    return occurrences;
  }
}
