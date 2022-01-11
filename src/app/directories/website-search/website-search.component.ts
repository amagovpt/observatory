import { Component, Input, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";

@Component({
  selector: "app-website-search",
  templateUrl: "./website-search.component.html",
  styleUrls: ["./website-search.component.scss"],
})
export class WebsiteSearchComponent implements OnInit {
  @Input("globalData") globalData: any;

  searchResults: any;
  noResults: boolean;

  constructor() {
    this.searchResults = new Array<any>();
    this.noResults = false;
  }

  ngOnInit(): void {}

  search(text: string): void {
    this.searchResults = new Array<any>();

    if (text && text.trim() !== "" && text.trim().length > 2) {
      for (const directoryId in this.globalData.directories ?? {}) {
        const directory = this.globalData.directories[directoryId];
        for (const websiteId in directory.websites ?? {}) {
          const website = directory.websites[websiteId];
          if (this._search(website, text)) {
            const data = directory.websitesList.find(
              (w: any) => w.id === website.id
            );

            this.searchResults.push({
              directoryName: directory.name,
              directoryId,
              name: website.name,
              id: websiteId,
              stamp: data.stamp,
              declaration: data.declaration,
              score: website.score,
              nPages: website.nPages,
            });
          }
        }
      }
      if (this.searchResults.length === 0) {
        this.noResults = true;
      }
    }

    if (
      !text ||
      text.trim() === "" ||
      text.trim().length <= 2 ||
      this.searchResults.length > 0
    ) {
      this.noResults = false;
    }
  }

  private _search(website: any, text: string): boolean {
    const parts = text.trim().toLowerCase().split(" ");

    /*let hasName = true;
    let hasDomain = true;
    let hasEntity = true;*/

    let hasText = true;

    const totalText = (
      website.name +
      " " +
      website.domain +
      " " +
      (website.entity ?? "")
    )
      .trim()
      .toLowerCase()
      .normalize("NFD");

    for (const part of parts ?? []) {
      const normalizedText = part.normalize("NFD");

      if (!totalText.includes(normalizedText)) {
        hasText = false;
      }

      /*if (
        !website.name.toLowerCase().normalize("NFD").includes(normalizedText)
      ) {
        hasName = false;
      }

      if (
        !website.domain.toLowerCase().normalize("NFD").includes(normalizedText)
      ) {
        hasDomain = false;
      }

      if (
        !website.entity ||
        !website.entity.toLowerCase().normalize("NFD").includes(normalizedText)
      ) {
        hasEntity = false;
      }*/
    }

    return hasText; //hasName || hasDomain || hasEntity;
  }

  sortData(sort: Sort): void {
    if (sort.active === "score") {
      if (sort.direction === "asc") {
        this.searchResults = this.searchResults
          .sort((a, b) => a.score - b.score)
          .slice();
      } else {
        this.searchResults = this.searchResults
          .sort((a, b) => b.score - a.score)
          .slice();
      }
    } else if (sort.active === "nPages") {
      if (sort.direction === "asc") {
        this.searchResults = this.searchResults
          .sort((a, b) => a.nPages - b.nPages)
          .slice();
      } else {
        this.searchResults = this.searchResults
          .sort((a, b) => b.nPages - a.nPages)
          .slice();
      }
    } else if (sort.active === "declaration") {
      if (sort.direction === "asc") {
        this.searchResults = this.searchResults
          .sort((a, b) => a.declaration - b.declaration)
          .slice();
      } else {
        this.searchResults = this.searchResults
          .sort((a, b) => b.declaration - a.declaration)
          .slice();
      }
    } else if (sort.active === "stamp") {
      if (sort.direction === "asc") {
        this.searchResults = this.searchResults
          .sort((a, b) => a.stamp - b.stamp)
          .slice();
      } else {
        this.searchResults = this.searchResults
          .sort((a, b) => b.stamp - a.stamp)
          .slice();
      }
    } else if (sort.active === "website") {
      if (sort.direction === "asc") {
        this.searchResults = this.searchResults.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      } else {
        this.searchResults = this.searchResults.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }

          return 0;
        });
      }
    } else if (sort.active === "directory") {
      if (sort.direction === "asc") {
        this.searchResults = this.searchResults.sort((a, b) => {
          if (a.directoryName.toLowerCase() < b.directoryName.toLowerCase()) {
            return -1;
          } else if (
            a.directoryName.toLowerCase() > b.directoryName.toLowerCase()
          ) {
            return 1;
          }

          return 0;
        });
      } else {
        this.searchResults = this.searchResults.sort((a, b) => {
          if (a.directoryName.toLowerCase() < b.directoryName.toLowerCase()) {
            return 1;
          } else if (
            a.directoryName.toLowerCase() > b.directoryName.toLowerCase()
          ) {
            return -1;
          }

          return 0;
        });
      }
    }
  }
}
