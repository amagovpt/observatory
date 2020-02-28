import { OnInit, OnDestroy, Component, Injectable, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  routerSub: Subscription;
  langSub: Subscription;
  serverSub: Subscription;

  selectedLang: string;
  langs: any = {
    pt: 'Portuguese',
    en: 'English'
  };

  langCodes: any = {
    English: 'en',
    Portuguese: 'pt'
  };

  tag: string;
  website: string;

  showGoToTop: boolean;
  loading: boolean;
  error: boolean;

  constructor(
    public readonly el: ElementRef,
    private readonly data: DataService,
    public readonly translate: TranslateService,
    private readonly router: Router
  ) {
    this.translate.addLangs(Object.values(this.langs));
    this.translate.setDefaultLang('Portuguese');

    const lang = localStorage.getItem('language');

    if (!lang) {
      const browserLang = translate.getBrowserLang();
      const use = Object.keys(this.langs).includes(browserLang) ? this.langs[browserLang] : 'Portuguese';

      this.translate.use(use);
      localStorage.setItem('language', use);
    } else {
      this.translate.use(lang);
    }

    this.selectedLang = this.translate.currentLang;

    this.showGoToTop = false;
    this.loading = true;
    this.error = false;
  }

  ngOnInit(): void {
    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tag = null;
        this.website = null;

        const path = location.pathname;
        const segments = path.split('/');

        switch (segments.length) {
          case 3:
            this.website = decodeURIComponent(segments[2]);
          case 2:
            this.tag = decodeURIComponent(segments[1]);
            break;
        }

        document.getElementById('main').scrollIntoView();
      }
    });
    this.serverSub = this.data.getObservatoryData()
      .subscribe((success: boolean) => {
        if (!success) {
          this.error = true;
        }

        this.loading = false;
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
    const lang = document.createAttribute('lang');
    lang.value = this.langCodes[this.translate.currentLang];
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLang);
    localStorage.setItem('language', this.selectedLang);
    this.updateLanguage();
  }

  goToTop(): void {
    document.getElementById('main').scrollIntoView();
  }

  onScroll(e): void {
    if (e.srcElement.scrollTop > 300) {
      this.showGoToTop = true;
    } else {
      this.showGoToTop = false;
    }
  }
}
