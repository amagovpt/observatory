import { Component, OnInit, Input } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Directory } from "../../models/directory";

@Component({
  selector: "app-directories-list",
  templateUrl: "./directories-list.component.html",
  styleUrls: ["./directories-list.component.scss"],
})
export class DirectoriesListComponent implements OnInit {
  @Input() globalData: any;

  sortedData: Array<Directory>;

  constructor() {}

  ngOnInit(): void {
    this.sortedData = this.globalData.directoriesList.slice();
  }

  sortData(sort: Sort): void {
    if (sort.active === "rank" || sort.active === "score") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.rank - b.rank)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.rank - a.rank)
          .slice();
      }
    } else if (sort.active === "declaration") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.declarations - b.declarations)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.declarations - a.declarations)
          .slice();
      }
    } else if (sort.active === "stamp") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.stamps - b.stamps)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.stamps - a.stamps)
          .slice();
      }
    } else if (sort.active === "websites") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.nWebsites - b.nWebsites)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.nWebsites - a.nWebsites)
          .slice();
      }
    } else if (sort.active === "A") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.A - b.A)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.A - a.A)
          .slice();
      }
    } else if (sort.active === "AA") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.AA - b.AA)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.AA - a.AA)
          .slice();
      }
    } else if (sort.active === "AAA") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => a.AAA - b.AAA)
          .slice();
      } else {
        this.sortedData = this.globalData.directoriesList
          .sort((a, b) => b.AAA - a.AAA)
          .slice();
      }
    } else if (sort.active === "name") {
      if (sort.direction === "asc") {
        this.sortedData = this.globalData.directoriesList.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      } else {
        this.sortedData = this.globalData.directoriesList.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }

          return 0;
        });
      }
    }
  }
}
