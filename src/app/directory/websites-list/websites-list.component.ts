import { Component, OnInit, Input } from "@angular/core";
import { Sort } from "@angular/material/sort";

import { Directory } from "../../models/directory";
import { Website } from "../../models/website";

import orderBy from "lodash.orderby";

@Component({
  selector: "app-websites-list",
  templateUrl: "./websites-list.component.html",
  styleUrls: ["./websites-list.component.scss"],
})
export class WebsitesListComponent implements OnInit {
  @Input() directory: any;
  @Input() multi: boolean;

  sortedData: Array<any>;
  websites: Array<any>;

  indicator1: number;
  indicator2: number;

  pageSize: number;

  constructor() {}

  ngOnInit(): void {
    this.websites = this.directory.websitesList.slice();

    this.pageSize = 50;

    this.sortedData = this.websites.slice(0, this.pageSize);

    this.indicator1 = 1;
    this.indicator2 =
      this.websites.length > this.pageSize
        ? this.pageSize
        : this.websites.length;
  }

  nextPage(): void {
    this.sortedData = this.websites.slice(
      this.indicator2,
      this.indicator2 + this.pageSize
    );
    this.indicator1 = this.indicator1 + this.pageSize;
    this.indicator2 =
      this.indicator2 + this.pageSize > this.websites.length
        ? this.websites.length
        : this.indicator2 + this.pageSize;
  }

  previousPage(): void {
    this.sortedData = this.websites.slice(
      this.indicator1 - this.pageSize - 1 < 0
        ? 0
        : this.indicator1 - this.pageSize - 1,
      this.indicator1 - 1
    );
    this.indicator2 = this.indicator1 - 1;
    this.indicator1 =
      this.indicator1 - this.pageSize < 1 ? 1 : this.indicator1 - this.pageSize;
  }

  firstPage(): void {
    this.sortedData = this.websites.slice(0, this.pageSize);
    this.indicator1 = 1;
    this.indicator2 =
      this.websites.length > this.pageSize
        ? this.pageSize
        : this.websites.length;
  }

  lastPage(): void {
    this.indicator2 = this.websites.length;
    this.indicator1 =
      this.indicator2 % this.pageSize === 0
        ? this.indicator2 - this.pageSize + 1
        : this.indicator2 - (this.indicator2 % this.pageSize) + 1;
    this.sortedData = this.websites.slice(this.indicator1 - 1, this.indicator2);
  }

  changeItemsPerPage(e): void {
    this.pageSize = parseInt(e.target.value);
    if (this.indicator1 + this.pageSize > this.websites.length) {
      this.lastPage();
    } else {
      this.indicator2 = this.indicator1 + this.pageSize - 1;
      this.sortedData = this.websites.slice(
        this.indicator1 - 1,
        this.indicator2
      );
    }
  }

  sortData(sort: Sort): void {
    if (sort.active === "rank" || sort.active === "score") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.rank - b.rank).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.rank - a.rank).slice();
      }
    } else if (sort.active === "declaration") {
      if (sort.direction === "asc") {
        this.websites = this.websites
          .sort((a, b) => a.declaration - b.declaration)
          .slice();
      } else {
        this.websites = this.websites
          .sort((a, b) => b.declaration - a.declaration)
          .slice();
      }
    } else if (sort.active === "stamp") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.stamp - b.stamp).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.stamp - a.stamp).slice();
      }
    } else if (sort.active === "pages") {
      if (sort.direction === "asc") {
        this.websites = this.websites
          .sort((a, b) => a.nPages - b.nPages)
          .slice();
      } else {
        this.websites = this.websites
          .sort((a, b) => b.nPages - a.nPages)
          .slice();
      }
    } else if (sort.active === "A") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.A - b.A).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.A - a.A).slice();
      }
    } else if (sort.active === "AA") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.AA - b.AA).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.AA - a.AA).slice();
      }
    } else if (sort.active === "AAA") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => a.AAA - b.AAA).slice();
      } else {
        this.websites = this.websites.sort((a, b) => b.AAA - a.AAA).slice();
      }
    } else if (sort.active === "name") {
      if (sort.direction === "asc") {
        this.websites = this.websites.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      } else {
        this.websites = this.websites.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }

          return 0;
        });
      }
    }

    if (this.indicator1 + this.pageSize > this.websites.length) {
      this.lastPage();
    } else {
      this.indicator2 = this.indicator1 + this.pageSize - 1;
      this.sortedData = this.websites.slice(
        this.indicator1 - 1,
        this.indicator2
      );
    }
  }
}
