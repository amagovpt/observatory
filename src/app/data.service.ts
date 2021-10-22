import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs";
import { map, catchError } from "rxjs";

import { ListDirectories } from "./models/list-directories";
import { Directory } from "./models/directory";
import { Website } from "./models/website";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private readonly server: string;

  private listDirectories: ListDirectories;
  private globalData: any;
  public declarations: any;
  public badges: any;
  private currentYear: number;

  constructor(private readonly http: HttpClient) {
    const host = location.hostname;

    if (host === "localhost") {
      this.server = "http://localhost:3000";
    } else {
      this.server = "/api";
    }

    this.declarations = {
      total: {
        websites: {
          conform: 0,
          partial: 0,
          not_conform: 0,
        },
        apps: {
          conform: 0,
          partial: 0,
          not_conform: 0,
        },
      },
      currentYear: {
        websites: {
          conform: 0,
          partial: 0,
          not_conform: 0,
        },
        apps: {
          conform: 0,
          partial: 0,
          not_conform: 0,
        },
      },
    };
    this.badges = {
      total: {
        websites: {
          gold: 0,
          silver: 0,
          bronze: 0,
        },
        apps: {
          gold: 0,
          silver: 0,
          bronze: 0,
        },
      },
      currentYear: {
        websites: {
          gold: 0,
          silver: 0,
          bronze: 0,
        },
        apps: {
          gold: 0,
          silver: 0,
          bronze: 0,
        },
      },
    };

    this.currentYear = new Date().getFullYear();
    this.globalData = {};
  }

  getObservatoryData(): Observable<boolean> {
    return this.http
      .get<any>(this.server + "/observatory", { observe: "response" })
      .pipe(
        map((res) => {
          const response = res.body;
          /*const directories = new Array<Directory>();
          const tmpDirectories = this.createTemporaryDirectories(response);

          for (const directory of tmpDirectories || []) {
            const newDirectory = this.createDirectory(
              directory,
              clone(response)
            );
            directories.push(newDirectory);
          }

          this.listDirectories = new ListDirectories(
            response.result,
            directories
          );

          this.countDeclarationsAndStamps();*/

          this.globalData = response.result;

          return true;
        }),
        catchError((err: any) => {
          console.log(err);
          return of(false);
        })
      );
  }

  getListDirectories(): ListDirectories {
    return this.listDirectories;
  }

  getGlobalData(): any {
    return this.globalData;
  }

  private createTemporaryDirectories(response: any): Array<any> {
    const tmpDirectoriesIds = new Array<number>();
    const tmpDirectories = new Array<any>();
    response.result.map((directory: any) => {
      if (!tmpDirectoriesIds.includes(directory.DirectoryId)) {
        tmpDirectoriesIds.push(directory.DirectoryId);
        tmpDirectories.push({
          id: directory.DirectoryId,
          name: directory.Directory_Name,
          creation_date: directory.Directory_Creation_Date,
        });
      }
    });

    return tmpDirectories;
  }

  private createDirectory(directory: any, response: any): Directory {
    const newDirectory = new Directory(
      directory.id,
      directory.name,
      directory.creation_date
    );
    const tmpWebsitesIds = new Array<number>();
    const websites = new Array<any>();
    for (const wb of response.result || []) {
      if (
        wb.DirectoryId === directory.id &&
        !tmpWebsitesIds.includes(wb.WebsiteId)
      ) {
        tmpWebsitesIds.push(wb.WebsiteId);
        websites.push({
          id: wb.WebsiteId,
          entity: wb.Entity_Name,
          name: wb.Website_Name,
          declaration: wb.Website_Declaration,
          declarationDate: wb.Declaration_Date,
          stamp: wb.Website_Stamp,
          stampDate: wb.Stamp_Date,
          domain: wb.Url,
          creation_date: wb.Website_Creation_Date,
        });
      }
    }

    for (const website of websites || []) {
      const newWebsite = this.createWebsite(website, directory, response);
      newDirectory.addWebsite(newWebsite);
    }

    return newDirectory;
  }

  private createWebsite(website: any, directory: any, response: any): Website {
    const newWebsite = new Website(
      website.id,
      website.entity,
      website.name,
      website.declaration,
      website.declarationDate,
      website.stamp,
      website.stampDate,
      website.domain,
      website.creation_date
    );

    const pages = new Array<any>();
    response.result.map((p: any) => {
      if (p.Website_Name === website.name && p.DirectoryId === directory.id) {
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

  private countDeclarationsAndStamps(): void {
    const websitesDeclarationsInList = new Array<number>();
    const websitesStampsInList = new Array<number>();

    for (const directory of this.listDirectories.directories) {
      for (const website of directory.websites) {
        if (
          !websitesDeclarationsInList.includes(website.id) &&
          website.declaration &&
          website.declarationDate
        ) {
          switch (website.declaration) {
            case 1:
              this.declarations.total.websites.not_conform++;
              break;
            case 2:
              this.declarations.total.websites.partial++;
              break;
            case 3:
              this.declarations.total.websites.conform++;
              break;
          }

          if (website.declarationDate.getFullYear() === this.currentYear) {
            switch (website.declaration) {
              case 1:
                this.declarations.currentYear.websites.not_conform++;
                break;
              case 2:
                this.declarations.currentYear.websites.partial++;
                break;
              case 3:
                this.declarations.currentYear.websites.conform++;
                break;
            }
          }
          websitesDeclarationsInList.push(website.id);
        }
        if (
          !websitesStampsInList.includes(website.id) &&
          website.stamp &&
          website.stampDate
        ) {
          switch (website.stamp) {
            case 1:
              this.badges.total.websites.bronze++;
              break;
            case 2:
              this.badges.total.websites.silver++;
              break;
            case 3:
              this.badges.total.websites.gold++;
              break;
          }

          if (website.stampDate.getFullYear() === this.currentYear) {
            switch (website.declaration) {
              case 1:
                this.badges.currentYear.websites.bronze++;
                break;
              case 2:
                this.badges.currentYear.websites.silver++;
                break;
              case 3:
                this.badges.currentYear.websites.gold++;
                break;
            }
          }
          websitesStampsInList.push(website.id);
        }
      }
    }
  }
}
