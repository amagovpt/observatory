import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Chart } from "chart.js";
import { Website } from "src/app/models/website";
import _tests from "../../tests";

@Component({
  selector: "app-practices-distribution",
  templateUrl: "./practices-distribution.component.html",
  styleUrls: ["./practices-distribution.component.scss"],
})
export class PracticesDistributionComponent implements OnInit, AfterViewInit {
  tests: any;

  @Input("type") type: string;
  @Input("color") color: string;
  @Input("website") website: any;
  @Input("data") data: any;

  @ViewChild("chartPractices", { static: true }) chartPractices: any;
  chart: any;

  errors: any;

  isCat: boolean;

  tabs: HTMLElement[] = [];
  panels: HTMLElement[] = [];
  tablist: HTMLElement;

  keys: any;
  direction: any;

  constructor(private translate: TranslateService) {
    this.tests = _tests;
  }

  ngOnInit() {
    this.isCat = this.data.isCat;
    this.errors = this.data.errors;

    const translations = {};

    this.errors.map((k: any) => {
      translations["RESULTS." + k["key"]] = this.translate.instant(
        "RESULTS." + k["key"],
        { value: k["n_occurrences"] }
      );
    });

    translations["DIALOGS.errors.common_errors"] = this.translate.instant(
      "DIALOGS.errors.common_errors"
    );
    translations["DIALOGS.errors.tests_label"] = this.translate.instant(
      "DIALOGS.errors.tests_label"
    );
    translations["DIALOGS.errors.situations_label"] = this.translate.instant(
      "DIALOGS.errors.situations_label"
    );

    const label = translations["DIALOGS.errors.common_errors"];
    const testsLabel = translations["DIALOGS.errors.tests_label"];
    const situationsLabel = translations["DIALOGS.errors.situations_label"];
    delete translations["DIALOGS.errors.common_errors"];
    delete translations["DIALOGS.errors.tests_label"];
    delete translations["DIALOGS.errors.situations_label"];

    const labels = Object.values(translations).map((s: string) => {
      s = s.replace(new RegExp("<code>", "g"), "");
      s = s.replace(new RegExp("</code>", "g"), "");
      s = s.replace(new RegExp("<mark>", "g"), "");
      s = s.replace(new RegExp("</mark>", "g"), "");
      s = s.length > 100 ? String(s).substr(0, 50) + "..." : s;
      return this.formatLabel(s, 50);
    });

    const labelsTooltips = Object.values(translations).map((s: string) => {
      s = s.replace(new RegExp("<code>", "g"), "");
      s = s.replace(new RegExp("</code>", "g"), "");
      s = s.replace(new RegExp("<mark>", "g"), "");
      s = s.replace(new RegExp("</mark>", "g"), "");
      return s;
    });

    const values = this.errors
      .map((error: any) => error.n_pages)
      .sort((a, b) => b - a);

    this.chart = new Chart(this.chartPractices.nativeElement, {
      type: "horizontalBar",
      data: {
        labels,
        datasets: [
          {
            label,
            data: values,
            backgroundColor: this.color,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            // to make the title appear entirely
            title: function (tooltipItem, data) {
              return labelsTooltips[tooltipItem[0]["index"]];
            },
          },
        },
        legend: {
          labels: {
            fontFamily: "Lato",
          },
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                maxTicksLimit: this.website.nPages === 1 ? 1 : 11,
                min: 0,
                max: this.website.nPages,
                //maxTicksLimit: this.calculateMax(Math.max(...values)) + 1,
                fontFamily: "Lato",
              },
              scaleLabel: {
                display: true,
                labelString: situationsLabel,
                fontFamily: "Lato",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                fontFamily: "Lato",
              },
              scaleLabel: {
                display: true,
                labelString: testsLabel,
                fontFamily: "Lato",
              },
            },
          ],
        },
      },
    });

    this.keys = {
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };
    this.direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1,
    };
  }

  ngAfterViewInit(): void {
    this.tablist = document.querySelector<HTMLElement>(
      "#" + this.type + '.distributionTabs [role="tablist"]'
    );

    this.generateArrays();
    this.bindListeners();
  }

  private calculateMax(max: number): number {
    const t = max + max / 3;
    return Math.ceil(t);
  }

  private formatLabel(str: string, maxwidth: number): any {
    const sections = [];
    const words = str.split(" ");
    let temp = "";

    words.forEach((item: any, index: number) => {
      if (temp.length > 0) {
        const concat = temp + " " + item;

        if (concat.length > maxwidth) {
          sections.push(temp);
          temp = "";
        } else {
          if (index === words.length - 1) {
            sections.push(concat);
            return;
          } else {
            temp = concat;
            return;
          }
        }
      }

      if (index === words.length - 1) {
        sections.push(item);
        return;
      }

      if (item.length < maxwidth) {
        temp = item;
      } else {
        sections.push(item);
      }
    });

    return sections;
  }

  generateArrays() {
    const tabs = document.querySelectorAll<HTMLElement>(
      "#" + this.type + '.distributionTabs [role="tab"]'
    );
    tabs.forEach((tab) => this.tabs.push(tab));
    const panels = document.querySelectorAll<HTMLElement>(
      "#" + this.type + '.distributionTabs [role="tabpanel"]'
    );
    panels.forEach((panel) => this.panels.push(panel));
  }

  bindListeners() {
    for (const tab of this.tabs) {
      tab.addEventListener("click", this.clickEventListener.bind(this));
      tab.addEventListener("keydown", this.keydownEventListener.bind(this));
      tab.addEventListener("keyup", this.keyupEventListener.bind(this));
    }
  }

  clickEventListener(event) {
    const tab = event.target;
    this.activateTab(tab, false);
  }

  keydownEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case this.keys.end:
        event.preventDefault();
        // Activate last tab
        this.activateTab(this.tabs[this.tabs.length - 1], true);
        break;
      case this.keys.home:
        event.preventDefault();
        // Activate first tab
        this.activateTab(this.tabs[0], true);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case this.keys.up:
      case this.keys.down:
        this.determineOrientation(event);
        break;
    }
  }

  keyupEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case this.keys.left:
      case this.keys.right:
        this.determineOrientation(event);
        break;
    }
  }

  determineOrientation(event) {
    const key = event.keyCode;
    const vertical =
      this.tablist.getAttribute("aria-orientation") == "vertical";
    let proceed = false;

    if (vertical) {
      if (key === this.keys.up || key === this.keys.down) {
        event.preventDefault();
        proceed = true;
      }
    } else {
      if (key === this.keys.left || key === this.keys.right) {
        proceed = true;
      }
    }
    if (proceed) {
      this.switchTabOnArrowPress(event);
    }
  }

  switchTabOnArrowPress(event) {
    const pressed = event.keyCode;

    for (const tab of this.tabs) {
      tab.addEventListener("focus", this.focusEventHandler.bind(this));
    }

    if (this.direction[pressed]) {
      const target = event.target;
      const index = this.tabs.indexOf(target);
      if (index !== undefined) {
        if (this.tabs[index + this.direction[pressed]]) {
          this.tabs[index + this.direction[pressed]].focus();
        } else if (pressed === this.keys.left || pressed === this.keys.up) {
          this.focusLastTab();
        } else if (pressed === this.keys.right || pressed === this.keys.down) {
          this.focusFirstTab();
        }
      }
    }
  }

  activateTab(tab: HTMLElement, setFocus: boolean) {
    setFocus = setFocus || true;
    // Deactivate all other tabs
    this.deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute("tabindex");

    // Set the tab as selected
    tab.setAttribute("aria-selected", "true");

    // Get the value of aria-controls (which is an ID)
    const controls = tab.getAttribute("aria-controls");

    // Remove is-hidden class from tab panel to make it visible
    document.getElementById(controls).classList.remove("is-hidden");

    // Set focus when required
    if (setFocus) {
      tab.focus();
    }
  }

  deactivateTabs() {
    for (const tab of this.tabs) {
      tab.setAttribute("tabindex", "-1");
      tab.setAttribute("aria-selected", "false");
      tab.removeEventListener("focus", this.focusEventHandler);
    }

    for (const panel of this.panels) {
      panel.classList.add("is-hidden");
    }
  }

  focusFirstTab() {
    this.tabs[0].focus();
  }

  focusLastTab() {
    this.tabs[this.tabs.length - 1].focus();
  }

  checkTabFocus(target) {
    const focused = document.activeElement;

    if (target === focused) {
      this.activateTab(target, false);
    }
  }

  focusEventHandler(event) {
    const target = event.target;
    const delay = 300;

    setTimeout(this.checkTabFocus.bind(this), delay, target);
  }
}
