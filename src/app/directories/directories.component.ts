import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { ListDirectories } from "../models/list-directories";

@Component({
  selector: "app-directories",
  templateUrl: "./directories.component.html",
  styleUrls: ["./directories.component.scss"],
})
export class DirectoriesComponent implements OnInit {
  listDirectories: ListDirectories;
  globalData: any;

  constructor(private readonly data: DataService) {}

  ngOnInit(): void {
    //this.listDirectories = this.data.getListDirectories();
    this.globalData = this.data.getGlobalData();
  }
}
