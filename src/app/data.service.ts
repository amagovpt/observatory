import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators/";
import clone from "lodash.clone";

import { ListTags } from "./models/list-tags";
import { Tag } from "./models/tag";
import { Website } from "./models/website";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private readonly server: string;

  private listTags: ListTags;

  constructor(private readonly http: HttpClient) {
    const host = location.hostname;

    if (host === "localhost") {
      this.server = "http://localhost:3000";
      //this.server = "http://194.117.20.202/api";
    } else {
      this.server = "/api";
    }
  }

  getObservatoryData(): Observable<boolean> {
    return this.http
      .get<any>(this.server + "/observatory", { observe: "response" })
      .pipe(
        map((res) => {
          const response = res.body;
          const tags = new Array<Tag>();
          const tmpTags = this.createTemporaryTags(response);

          for (const tag of tmpTags || []) {
            const newTag = this.createTag(tag, clone(response));
            tags.push(newTag);
          }

          this.listTags = new ListTags(tags);
          return true;
        }),
        catchError((err: any) => {
          console.log(err);
          return of(false);
        })
      );
  }

  getListTags(): ListTags {
    return this.listTags;
  }

  private createTemporaryTags(response: any): Array<any> {
    const tmpTagsIds = new Array<number>();
    const tmpTags = new Array<any>();
    response.result.map((tag: any) => {
      if (!tmpTagsIds.includes(tag.TagId)) {
        tmpTagsIds.push(tag.TagId);
        tmpTags.push({
          id: tag.TagId,
          name: tag.Tag_Name,
          creation_date: tag.Tag_Creation_Date,
        });
      }
    });

    return tmpTags;
  }

  private createTag(tag: any, response: any): Tag {
    const newTag = new Tag(tag.id, tag.name, tag.creation_date);
    const tmpWebsitesIds = new Array<number>();
    const websites = new Array<any>();
    for (const wb of response.result || []) {
      if (wb.TagId === tag.id && !tmpWebsitesIds.includes(wb.WebsiteId)) {
        tmpWebsitesIds.push(wb.WebsiteId);
        websites.push({
          id: wb.WebsiteId,
          entity: wb.Entity_Name,
          name: wb.Website_Name,
          domain: wb.Url,
          creation_date: wb.Website_Creation_Date,
        });
      }
    }

    for (const website of websites || []) {
      const newWebsite = this.createWebsite(website, tag, response);
      newTag.addWebsite(newWebsite);
    }

    return newTag;
  }

  private createWebsite(website: any, tag: any, response: any): Website {
    const newWebsite = new Website(
      website.id,
      website.entity,
      website.name,
      website.domain,
      website.creation_date
    );

    const pages = new Array<any>();
    response.result.map((p: any) => {
      if (p.Website_Name === website.name && p.TagId === tag.id) {
        pages.push({
          pageId: p.PageId,
          uri: p.Uri,
          creation_date: p.Page_Creation_Date,
          evaluationId: p.EvaluationId,
          title: p.Title,
          score: parseFloat(p.Score),
          errors: p.Errors,
          tot: p.Tot,
          A: p.A,
          AA: p.AA,
          AAA: p.AAA,
          evaluation_date: p.Evaluation_Date,
        });
      }
    });

    for (const page of pages || []) {
      this.addPageToWebsite(newWebsite, page);
    }

    return newWebsite;
  }

  private addPageToWebsite(website: any, page: any): void {
    website.addPage(
      page.pageId,
      page.uri,
      page.creation_date,
      page.evaluationId,
      page.title,
      page.score,
      page.errors,
      page.tot,
      page.A,
      page.AA,
      page.AAA,
      page.evaluation_date
    );
  }
}
