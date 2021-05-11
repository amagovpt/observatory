import orderBy from "lodash.orderby";
import { Website } from "./website";
import tests from "../tests";

export class Directory {
  id: number;
  rank: number;
  name: string;
  creationDate: Date;
  websites: Array<Website>;
  nPages: number;
  nPagesWithoutErrors: number;
  entities: Array<string>;
  declarations: number;
  stamps: number;
  score: number;
  A: number;
  AA: number;
  AAA: number;
  frequencies: Array<number>;
  errors: any;
  recentPage: Date;
  oldestPage: Date;
  success: any;

  constructor(id: number, name: string, creationDate: Date) {
    this.id = id;
    this.rank = -1;
    this.name = name;
    this.creationDate = creationDate;
    this.websites = new Array<Website>();
    this.nPages = 0;
    this.nPagesWithoutErrors = 0;
    this.entities = new Array<string>();
    this.declarations = 0;
    this.stamps = 0;
    this.score = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
    this.success = {};
  }

  addWebsite(website: Website): void {
    this.websites.push(website);
    this.nPages += website.pages.length;
    this.score += website.getScore();

    if (website.declaration) {
      this.declarations++;
    }

    if (website.stamp) {
      this.stamps++;
    }

    this.nPagesWithoutErrors += website.AAA;

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

    const websiteErrors = website.errors;

    for (const error in websiteErrors || {}) {
      if (Object.keys(this.errors).includes(error)) {
        this.errors[error]["n_occurrences"] +=
          websiteErrors[error]["n_occurrences"];
        this.errors[error]["n_pages"] += websiteErrors[error]["n_pages"];
        this.errors[error]["n_websites"]++;
      } else {
        this.errors[error] = {
          n_occurrences: websiteErrors[error]["n_occurrences"],
          n_pages: websiteErrors[error]["n_pages"],
          n_websites: 1,
        };
      }
    }

    const websiteSuccess = website.success;

    for (const practice in websiteSuccess || {}) {
      if (Object.keys(this.success).includes(practice)) {
        this.success[practice]["n_occurrences"] +=
          websiteSuccess[practice]["n_occurrences"];
        this.success[practice]["n_pages"] +=
          websiteSuccess[practice]["n_pages"];
        this.success[practice]["n_websites"]++;
      } else {
        this.success[practice] = {
          n_occurrences: websiteSuccess[practice]["n_occurrences"],
          n_pages: websiteSuccess[practice]["n_pages"],
          n_websites: 1,
        };
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

    if (website.entity) {
      if (website.entity.includes("@,@")) {
        for (const entity of website.entity.split("@,@")) {
          if (!this.entities.includes(entity.trim())) {
            this.entities.push(entity.trim());
          }
        }
      } else if (!this.entities.includes(website.entity.trim())) {
        this.entities.push(website.entity.trim());
      }
    }
  }

  getScore(): number {
    return this.score / this.websites.length;
  }

  getTopTenErrors(): any {
    const errors = new Array<any>();
    for (const key in this.errors || {}) {
      errors.push({
        key,
        n_occurrences: this.errors[key].n_occurrences,
        n_pages: this.errors[key].n_pages,
        n_websites: this.errors[key].n_websites,
      });
    }

    return orderBy(
      errors,
      ["n_occurrences", "n_pages", "n_websites"],
      ["desc", "desc", "desc"]
    ).slice(0, 10);
  }

  getPassedOccurrenceByWebsite(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const website of this.websites || []) {
      if (website.success[test] && tests[test]["result"] === "passed") {
        occurrences.push(website.success[test]["n_occurrences"]);
      }
    }
    return occurrences;
  }

  getErrorOccurrencesByWebsite(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const website of this.websites || []) {
      if (website.errors[test] && tests[test]["result"] === "failed") {
        occurrences.push(website.errors[test]["n_occurrences"]);
      }
    }
    return occurrences;
  }
}
