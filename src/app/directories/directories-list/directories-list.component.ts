import { Component, OnInit, Input } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";

import { ListDirectories } from "../../models/list-directories";
import { Directory } from "../../models/directory";

@Component({
  selector: "app-directories-list",
  templateUrl: "./directories-list.component.html",
  styleUrls: ["./directories-list.component.scss"],
})
export class DirectoriesListComponent implements OnInit {
  @Input() listDirectories: ListDirectories;

  sortedData: Array<Directory>;
  selection: SelectionModel<string>;

  constructor() {
    this.selection = new SelectionModel<string>(true, []);
  }

  ngOnInit(): void {
    let rank = 1;
    this.sortedData = this.listDirectories.directories
      .slice()
      .sort((a: Directory, b: Directory) => a.getScore() - b.getScore())
      .reverse()
      .map((d: Directory) => {
        d.rank = rank;
        rank++;
        return d;
      });
  }

  sortData(sort: Sort) {
    const data = this.listDirectories.directories.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "rank":
          return compare(a.rank, b.rank, isAsc);
        case "name":
          return compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
