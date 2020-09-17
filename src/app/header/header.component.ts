import { Component, ChangeDetectorRef } from "@angular/core";
import { ThemeService } from "../theme.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  selectedLang: string;

  constructor(
    private readonly theme: ThemeService,
    private readonly cd: ChangeDetectorRef,
    public readonly translate: TranslateService
  ) {
    this.selectedLang = this.translate.currentLang;
  }

  toggleLightDarkTheme(): void {
    const themeSwitchLabel = document.getElementById("mode_switch");

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
  }
}
