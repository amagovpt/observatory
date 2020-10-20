import { Component, ChangeDetectorRef, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "../theme.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  selectedLang: string;

  constructor(
    private readonly theme: ThemeService,
    private readonly cd: ChangeDetectorRef,
    public readonly translate: TranslateService
  ) {
    this.selectedLang = this.translate.currentLang;
  }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    const themeSwitchLabel = document.getElementById('mode_switch');

    if (theme === 'dark') {
      this.theme.setDarkTheme();
      localStorage.setItem("theme", "dark");
      this.translate.get("HEADER.light_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    } else {
      this.theme.setLightTheme();
      localStorage.setItem("theme", "light");
      this.translate.get("HEADER.dark_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    }
  }

  ngAfterViewInit(): void {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const menu = document.getElementById('experience_menu');
        const style = window.getComputedStyle(menu);
        menu.style.display = 'none';
        document.getElementById('experience_menu_arrow')
          .style.transform = 'rotate(360deg)';
        document.body.style.overflow = 'auto';
      }
    });

    document.getElementById('experience_menu_button')
      .addEventListener('click', function() {
        const menu = document.getElementById('experience_menu');
        const style = window.getComputedStyle(menu);
        if (style.display === 'none') {
          menu.style.display = 'flex';
          document.getElementById('experience_menu_arrow')
            .style.transform = 'rotate(180deg)';
          document.body.style.overflow = 'hidden';
        } else {
          menu.style.display = 'none';
          document.getElementById('experience_menu_arrow')
            .style.transform = 'rotate(360deg)';
          document.body.style.overflow = 'auto';
        }

      });

    const menu = document.getElementById('experience_menu');
    menu.style.display = 'none';
    document.getElementById('experience_menu_arrow')
      .style.transform = 'rotate(360deg)';
    document.body.style.overflow = 'auto';
  }

  toggleLightDarkTheme(): void {
    const themeSwitchLabel = document.getElementById('mode_switch');

    if (this.theme.isDarkTheme()) {
      this.theme.setLightTheme();
      localStorage.setItem("theme", "light");
      this.translate.get("HEADER.dark_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    } else {
      this.theme.setDarkTheme();
      localStorage.setItem("theme", "dark");
      this.translate.get("HEADER.light_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    }

    this.cd.detectChanges();
  }

  changeLanguage(): void {
    if (this.selectedLang === "Portuguese") {
      this.selectedLang = "English";
    } else {
      this.selectedLang = "Portuguese";
    }

    this.translate.use(this.selectedLang);
    localStorage.setItem("language", this.selectedLang);

    const themeSwitchLabel = document.getElementById("mode_switch");

    if (this.theme.isDarkTheme()) {
      localStorage.setItem("theme", "light");
      this.translate.get("HEADER.dark_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    } else {
      localStorage.setItem("theme", "dark");
      this.translate.get("HEADER.light_mode").subscribe((res: string) => {
        themeSwitchLabel.innerHTML = res;
      });
    }
  }
}
