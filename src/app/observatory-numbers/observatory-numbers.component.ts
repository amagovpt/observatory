import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListTags } from '../models/list-tags';

@Component({
  selector: 'app-observatory-numbers',
  templateUrl: './observatory-numbers.component.html',
  styleUrls: ['./observatory-numbers.component.scss']
})
export class ObservatoryNumbersComponent implements OnInit {

  listTags: ListTags;

  previousYear: number;
  currentYear: number;
  declarations: any;
  badges: any;

  constructor(private readonly data: DataService) {
    this.currentYear = new Date().getFullYear();
    this.previousYear = this.currentYear - 1;

    this.declarations = {
      previousYear: {
        websites: {
          conform: 1,
          partial: 0,
          not_conform: 0
        },
        apps: {
          conform: 0,
          partial: 0,
          not_conform: 0
        }
      },
      currentYear: {
        websites: {
          conform: 14,
          partial: 7,
          not_conform: 7
        },
        apps: {
          conform: 0,
          partial: 0,
          not_conform: 0
        }
      }
    };
    this.badges = {
      previousYear: {
        websites: {
          gold: 0,
          silver: 1,
          bronze: 0
        },
        apps: {
          gold: 0,
          silver: 0,
          bronze: 0
        }
      },
      currentYear: {
        websites: {
          gold: 4,
          silver: 2,
          bronze: 0
        },
        apps: {
          gold: 0,
          silver: 0,
          bronze: 0
        }
      }
    };
  }

  ngOnInit(): void {
    this.listTags = this.data.getListTags();

    const totalDeclarations = this.declarations.currentYear.websites.conform + this.declarations.currentYear.websites.partial + this.declarations.currentYear.websites.not_conform +
    this.declarations.currentYear.apps.conform + this.declarations.currentYear.apps.partial + this.declarations.currentYear.apps.not_conform;

    const declarationBars = document.querySelectorAll('.declaration .bar');
    
    this.fillBar(<HTMLElement>declarationBars[0], '#15ac51', ((this.declarations.previousYear.websites.conform + this.declarations.previousYear.apps.conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[1], '#15ac51', ((this.declarations.currentYear.websites.conform + this.declarations.currentYear.apps.conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[2], '#f3d609', ((this.declarations.previousYear.websites.partial + this.declarations.previousYear.apps.partial) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[3], '#f3d609', ((this.declarations.currentYear.websites.partial + this.declarations.currentYear.apps.partial) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[4], '#e90018', ((this.declarations.previousYear.websites.not_conform + this.declarations.previousYear.apps.not_conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[5], '#e90018', ((this.declarations.currentYear.websites.not_conform + this.declarations.currentYear.apps.not_conform) / totalDeclarations) * 100);

    this.fillBar(<HTMLElement>declarationBars[6], '#15ac51', ((this.declarations.previousYear.websites.conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[7], '#15ac51', ((this.declarations.currentYear.websites.conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[8], '#f3d609', ((this.declarations.previousYear.websites.partial) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[9], '#f3d609', ((this.declarations.currentYear.websites.partial) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[10], '#e90018', ((this.declarations.previousYear.websites.not_conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[11], '#e90018', ((this.declarations.currentYear.websites.not_conform) / totalDeclarations) * 100);

    this.fillBar(<HTMLElement>declarationBars[12], '#15ac51', ((this.declarations.previousYear.apps.conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[13], '#15ac51', ((this.declarations.currentYear.apps.conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[14], '#f3d609', ((this.declarations.previousYear.apps.partial) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[15], '#f3d609', ((this.declarations.currentYear.apps.partial) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[16], '#e90018', ((this.declarations.previousYear.apps.not_conform) / totalDeclarations) * 100);
    this.fillBar(<HTMLElement>declarationBars[17], '#e90018', ((this.declarations.currentYear.apps.not_conform) / totalDeclarations) * 100);

    const totalBadges = this.badges.currentYear.websites.gold + this.badges.currentYear.websites.silver + this.badges.currentYear.websites.bronze +
    this.badges.currentYear.apps.gold + this.badges.currentYear.apps.silver + this.badges.currentYear.apps.bronze;

    const badgesBars = document.querySelectorAll('.stamp .bar');

    this.fillBar(<HTMLElement>badgesBars[0], '#a87d00', ((this.badges.previousYear.websites.gold + this.badges.previousYear.apps.gold) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[1], '#a87d00', ((this.badges.currentYear.websites.gold + this.badges.currentYear.apps.gold) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[2], '#75797b', ((this.badges.previousYear.websites.silver + this.badges.previousYear.apps.silver) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[3], '#75797b', ((this.badges.currentYear.websites.silver + this.badges.currentYear.apps.silver) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[4], '#bc7448', ((this.badges.previousYear.websites.bronze + this.badges.previousYear.apps.bronze) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[5], '#bc7448', ((this.badges.currentYear.websites.bronze + this.badges.currentYear.apps.bronze) / totalBadges) * 100);

    this.fillBar(<HTMLElement>badgesBars[6], '#a87d00', ((this.badges.previousYear.websites.gold) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[7], '#a87d00', ((this.badges.currentYear.websites.gold) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[8], '#75797b', ((this.badges.previousYear.websites.silver) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[9], '#75797b', ((this.badges.currentYear.websites.silver) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[10], '#bc7448', ((this.badges.previousYear.websites.bronze) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[11], '#bc7448', ((this.badges.currentYear.websites.bronze) / totalBadges) * 100);

    this.fillBar(<HTMLElement>badgesBars[12], '#a87d00', ((this.badges.previousYear.apps.gold) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[13], '#a87d00', ((this.badges.currentYear.apps.gold) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[14], '#75797b', ((this.badges.previousYear.apps.silver) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[15], '#75797b', ((this.badges.currentYear.apps.silver) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[16], '#bc7448', ((this.badges.previousYear.apps.bronze) / totalBadges) * 100);
    this.fillBar(<HTMLElement>badgesBars[17], '#bc7448', ((this.badges.currentYear.apps.bronze) / totalBadges) * 100);
  }

  private fillBar(element: HTMLElement, color: string, percentage: number): void {
    element.style.background = `-webkit-linear-gradient(left, ${color}, ${color} ${
        percentage
      }%, #dcdcdb ${
        percentage
      }%, #dcdcdb ${
        100 - percentage
      }%)`;
    
    element.style.background = `-moz-linear-gradient(left, ${color}, ${color} ${
        percentage
      }%, #dcdcdb ${
        percentage
      }%, #dcdcdb ${
        100 - percentage
      }%)`;
    
    element.style.background = `-ms-linear-gradient(left, ${color}, ${color} ${
        percentage
      }%, #dcdcdb ${
        percentage
      }%, #dcdcdb ${
        100 - percentage
      }%)`;
    
    element.style.background = `-linear-gradient(left, ${color}, ${color} ${
        percentage
      }%, #dcdcdb ${
        percentage
      }%, #dcdcdb ${
        100 - percentage
      }%)`;
  }
}
