import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { ListDirectories } from "../models/list-directories";

@Component({
  selector: "app-observatory-numbers",
  templateUrl: "./observatory-numbers.component.html",
  styleUrls: ["./observatory-numbers.component.scss"],
})
export class ObservatoryNumbersComponent implements OnInit {
  listDirectories: ListDirectories;
  globalData: any;

  currentYear: number;
  declarations: any;
  badges: any;

  constructor(private readonly data: DataService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    //this.listDirectories = this.data.getListDirectories();
    this.globalData = this.data.getGlobalData();
    this.declarations = this.globalData.declarations;
    this.badges = this.globalData.badges;

    const totalDeclarations =
      this.declarations.total.websites.conform +
      this.declarations.total.websites.partial +
      this.declarations.total.websites.not_conform +
      this.declarations.total.apps.conform +
      this.declarations.total.apps.partial +
      this.declarations.total.apps.not_conform;

    const declarationBars = document.querySelectorAll(".declaration .bar");

    this.fillBar(<HTMLElement>declarationBars[0], "#15ac51", 100);
    this.fillBar(
      <HTMLElement>declarationBars[1],
      "#15ac51",
      ((this.declarations.currentYear.websites.conform +
        this.declarations.currentYear.apps.conform) /
        totalDeclarations) *
        100
    );
    this.fillBar(<HTMLElement>declarationBars[2], "#f3d609", 100);
    this.fillBar(
      <HTMLElement>declarationBars[3],
      "#f3d609",
      ((this.declarations.currentYear.websites.partial +
        this.declarations.currentYear.apps.partial) /
        totalDeclarations) *
        100
    );
    this.fillBar(<HTMLElement>declarationBars[4], "#e90018", 100);
    this.fillBar(
      <HTMLElement>declarationBars[5],
      "#e90018",
      ((this.declarations.currentYear.websites.not_conform +
        this.declarations.currentYear.apps.not_conform) /
        totalDeclarations) *
        100
    );

    this.fillBar(<HTMLElement>declarationBars[6], "#15ac51", 100);
    this.fillBar(
      <HTMLElement>declarationBars[7],
      "#15ac51",
      (this.declarations.currentYear.websites.conform / totalDeclarations) * 100
    );
    this.fillBar(<HTMLElement>declarationBars[8], "#f3d609", 100);
    this.fillBar(
      <HTMLElement>declarationBars[9],
      "#f3d609",
      (this.declarations.currentYear.websites.partial / totalDeclarations) * 100
    );
    this.fillBar(<HTMLElement>declarationBars[10], "#e90018", 100);
    this.fillBar(
      <HTMLElement>declarationBars[11],
      "#e90018",
      (this.declarations.currentYear.websites.not_conform / totalDeclarations) *
        100
    );

    this.fillBar(<HTMLElement>declarationBars[12], "#15ac51", 100);
    this.fillBar(
      <HTMLElement>declarationBars[13],
      "#15ac51",
      (this.declarations.currentYear.apps.conform / totalDeclarations) * 100
    );
    this.fillBar(<HTMLElement>declarationBars[14], "#f3d609", 100);
    this.fillBar(
      <HTMLElement>declarationBars[15],
      "#f3d609",
      (this.declarations.currentYear.apps.partial / totalDeclarations) * 100
    );
    this.fillBar(
      <HTMLElement>declarationBars[16],
      "#e90018",

      100
    );
    this.fillBar(
      <HTMLElement>declarationBars[17],
      "#e90018",
      (this.declarations.currentYear.apps.not_conform / totalDeclarations) * 100
    );

    const totalBadges =
      this.badges.total.websites.gold +
      this.badges.total.websites.silver +
      this.badges.total.websites.bronze +
      this.badges.total.apps.gold +
      this.badges.total.apps.silver +
      this.badges.total.apps.bronze;

    const badgesBars = document.querySelectorAll(".stamp .bar");

    this.fillBar(
      <HTMLElement>badgesBars[0],
      "#a87d00",

      100
    );
    this.fillBar(
      <HTMLElement>badgesBars[1],
      "#a87d00",
      ((this.badges.currentYear.websites.gold +
        this.badges.currentYear.apps.gold) /
        totalBadges) *
        100
    );
    this.fillBar(
      <HTMLElement>badgesBars[2],
      "#75797b",

      100
    );
    this.fillBar(
      <HTMLElement>badgesBars[3],
      "#75797b",
      ((this.badges.currentYear.websites.silver +
        this.badges.currentYear.apps.silver) /
        totalBadges) *
        100
    );
    this.fillBar(
      <HTMLElement>badgesBars[4],
      "#bc7448",

      100
    );
    this.fillBar(
      <HTMLElement>badgesBars[5],
      "#bc7448",
      ((this.badges.currentYear.websites.bronze +
        this.badges.currentYear.apps.bronze) /
        totalBadges) *
        100
    );

    this.fillBar(<HTMLElement>badgesBars[6], "#a87d00", 100);
    this.fillBar(
      <HTMLElement>badgesBars[7],
      "#a87d00",
      (this.badges.currentYear.websites.gold / totalBadges) * 100
    );
    this.fillBar(<HTMLElement>badgesBars[8], "#75797b", 100);
    this.fillBar(
      <HTMLElement>badgesBars[9],
      "#75797b",
      (this.badges.currentYear.websites.silver / totalBadges) * 100
    );
    this.fillBar(<HTMLElement>badgesBars[10], "#bc7448", 100);
    this.fillBar(
      <HTMLElement>badgesBars[11],
      "#bc7448",
      (this.badges.currentYear.websites.bronze / totalBadges) * 100
    );

    this.fillBar(<HTMLElement>badgesBars[12], "#a87d00", 100);
    this.fillBar(
      <HTMLElement>badgesBars[13],
      "#a87d00",
      (this.badges.currentYear.apps.gold / totalBadges) * 100
    );
    this.fillBar(<HTMLElement>badgesBars[14], "#75797b", 100);
    this.fillBar(
      <HTMLElement>badgesBars[15],
      "#75797b",
      (this.badges.currentYear.apps.silver / totalBadges) * 100
    );
    this.fillBar(<HTMLElement>badgesBars[16], "#bc7448", 100);
    this.fillBar(
      <HTMLElement>badgesBars[17],
      "#bc7448",
      (this.badges.currentYear.apps.bronze / totalBadges) * 100
    );
  }

  private fillBar(
    element: HTMLElement,
    color: string,
    percentage: number
  ): void {
    element.style.background = `-webkit-linear-gradient(left, ${color}, ${color} ${percentage}%, #dcdcdb ${percentage}%, #dcdcdb ${
      100 - percentage
    }%)`;

    element.style.background = `-moz-linear-gradient(left, ${color}, ${color} ${percentage}%, #dcdcdb ${percentage}%, #dcdcdb ${
      100 - percentage
    }%)`;

    element.style.background = `-ms-linear-gradient(left, ${color}, ${color} ${percentage}%, #dcdcdb ${percentage}%, #dcdcdb ${
      100 - percentage
    }%)`;

    element.style.background = `-linear-gradient(left, ${color}, ${color} ${percentage}%, #dcdcdb ${percentage}%, #dcdcdb ${
      100 - percentage
    }%)`;
  }
}
