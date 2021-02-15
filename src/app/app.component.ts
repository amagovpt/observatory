import {
  OnInit,
  OnDestroy,
  Component,
  Injectable,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { ThemeService } from "./theme.service";

import { DataService } from "./data.service";
import { ListDirectories } from "./models/list-directories";

@Injectable()
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("sidenav", { static: true }) sidenav: ElementRef;

  routerSub: Subscription;
  langSub: Subscription;
  serverSub: Subscription;

  selectedLang: string;
  langs: any = {
    pt: "Portuguese",
    en: "English",
  };

  langCodes: any = {
    English: "en",
    Portuguese: "pt",
  };

  directories: ListDirectories;

  directory: string;
  directoryId: number;
  website: string;
  websiteId: number;

  showGoToTop: boolean;
  loading: boolean;
  error: boolean;

  constructor(
    public readonly el: ElementRef,
    private readonly data: DataService,
    public readonly translate: TranslateService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef,
    private readonly theme: ThemeService
  ) {
    this.translate.addLangs(Object.values(this.langs));
    this.translate.setDefaultLang("Portuguese");

    const lang = localStorage.getItem("language");

    if (!lang) {
      const browserLang = translate.getBrowserLang();
      const use = Object.keys(this.langs).includes(browserLang)
        ? this.langs[browserLang]
        : "Portuguese";

      this.translate.use(use);
      localStorage.setItem("language", use);
    } else {
      this.translate.use(lang);
    }

    this.selectedLang = this.translate.currentLang;

    const currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme !== "dark") {
      this.theme.setLightTheme();
    } else {
      this.theme.setDarkTheme();
    }

    this.showGoToTop = false;
    this.loading = true;
    this.error = false;

    this.serverSub = this.data
      .getObservatoryData()
      .subscribe((success: boolean) => {
        if (!success) {
          this.error = true;
        }

        this.loading = false;
        this.directories = this.data.getListDirectories();
        this.cd.detectChanges();
      });
  }

  ngOnInit(): void {
    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.directories) {
          this.directory = null;
          this.directoryId = null;
          this.website = null;
          this.websiteId = null;

          const path = location.pathname;
          const segments = path.split("/");

          switch (segments.length) {
            case 4:
              this.directoryId = parseInt(segments[2], 0);
              this.websiteId = parseInt(segments[3], 0);
              this.website = this.directories.getWebsite(
                parseInt(segments[2], 0),
                parseInt(segments[3], 0)
              )?.name;
              this.directory = this.directories.getDirectory(
                parseInt(segments[2], 0)
              )?.name;
              break;
            case 3:
              this.directoryId = parseInt(segments[2], 0);
              this.directory = this.directories.getDirectory(
                parseInt(segments[2], 0)
              )?.name;
              break;
          }
        }

        document.getElementById("top").scrollIntoView();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.langSub.unsubscribe();
    this.serverSub.unsubscribe();
  }

  /**
   * Update the language in the lang attribute of the html element.
   */
  updateLanguage(): void {
    const lang = document.createAttribute("lang");
    lang.value = this.langCodes[this.translate.currentLang];
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(
      lang
    );
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem("language", this.selectedLang);
    this.updateLanguage();
  }

  goToTop(): void {
    document.getElementById("top").scrollIntoView();
  }
}
