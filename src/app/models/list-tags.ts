import orderBy from "lodash.orderby";
import { Tag } from "./tag";
import { Website } from "./website";
import tests from "../tests";

export class ListTags {
  tags: Array<Tag>;
  nEntities: number;
  nWebsites: number;
  nPages: number;
  nPagesWithoutErrors: number;
  score: number;
  A: number;
  AA: number;
  AAA: number;
  frequencies: Array<number>;
  errors: any;
  success: any;
  recentPage: Date;
  oldestPage: Date;

  constructor(tags: Array<Tag>) {
    this.tags = tags;
    this.nEntities = tags.reduce((n: number, t: Tag) => {
      return n + t.entities.length;
    }, 0);
    this.nWebsites = 0;
    this.nPages = 0;
    this.nPagesWithoutErrors = 0;
    this.A = 0;
    this.AA = 0;
    this.AAA = 0;
    this.frequencies = new Array<number>(9).fill(0);
    this.errors = {};
    this.success = {};

    let score = 0;
    const size = tags.length;

    for (const tag of tags || []) {
      score += tag.getScore();
      this.nWebsites += tag.websites.length;
      this.nPages += tag.nPages;
      this.nPagesWithoutErrors += tag.nPagesWithoutErrors;
      this.A += tag.A;
      this.AA += tag.AA;
      this.AAA += tag.AAA;
      this.frequencies = this.frequencies.map((v: number, j: number) => {
        return v + tag.frequencies[j];
      });

      const tagErrors = tag.errors;

      for (const error in tagErrors || {}) {
        if (Object.keys(this.errors).includes(error)) {
          this.errors[error]["n_occurrences"] +=
            tagErrors[error]["n_occurrences"];
          this.errors[error]["n_pages"] += tagErrors[error]["n_pages"];
          this.errors[error]["n_websites"] += tagErrors[error]["n_websites"];
          this.errors[error]["n_tags"]++;
        } else {
          this.errors[error] = {
            n_occurrences: tagErrors[error]["n_occurrences"],
            n_pages: tagErrors[error]["n_pages"],
            n_websites: tagErrors[error]["n_websites"],
            n_tags: 1,
          };
        }
      }

      const tagSuccess = tag.success;

      for (const practice in tagSuccess || {}) {
        if (Object.keys(this.success).includes(practice)) {
          this.success[practice]["n_occurrences"] +=
            tagSuccess[practice]["n_occurrences"];
          this.success[practice]["n_pages"] += tagSuccess[practice]["n_pages"];
          this.success[practice]["n_websites"] +=
            tagSuccess[practice]["n_websites"];
          this.success[practice]["n_tags"]++;
        } else {
          this.success[practice] = {
            n_occurrences: tagSuccess[practice]["n_occurrences"],
            n_pages: tagSuccess[practice]["n_pages"],
            n_websites: tagSuccess[practice]["n_websites"],
            n_tags: 1,
          };
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

  getTopFiveErrors(): any {
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
    ).slice(0, 5);
  }

  getTopFiveBestPractices(): any {
    const practices = new Array<any>();
    for (const key in this.success || {}) {
      practices.push({
        key,
        n_occurrences: this.success[key].n_occurrences,
        n_pages: this.success[key].n_pages,
        n_websites: this.success[key].n_websites,
      });
    }

    return orderBy(
      practices,
      ["n_occurrences", "n_pages", "n_websites"],
      ["desc", "desc", "desc"]
    ).slice(0, 5);
  }

  getPassedAndWarningOccurrenceByTag(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const tag of this.tags || []) {
      if (tag.success[test] && tests[test]["result"] !== "failed") {
        occurrences.push(tag.success[test]["n_occurrences"]);
      }
    }
    return occurrences;
  }

  getErrorOccurrenceByTag(test: string): Array<number> {
    const occurrences = new Array<number>();

    for (const tag of this.tags || []) {
      if (tag.errors[test] && tests[test]["result"] === "failed") {
        occurrences.push(tag.errors[test]["n_occurrences"]);
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
    const website = websites.find(
      (website: Website) => website.id === websiteId
    );
    return website;
  }
}
