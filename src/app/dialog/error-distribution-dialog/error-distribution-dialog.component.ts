import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Chart } from "chart.js";
import tests from "../../tests";
import * as includes from "lodash.includes";
import * as forEach from "lodash.foreach";
import * as slice from "lodash.slice";
import * as without from "lodash.without";
import * as size from "lodash.size";
import * as clone from "lodash.clone";

@Component({
  selector: "app-error-distribution-dialog",
  templateUrl: "./error-distribution-dialog.component.html",
  styleUrls: ["./error-distribution-dialog.component.scss"],
})
export class ErrorDistributionDialogComponent implements OnInit {
  elemGroups: any = {
    a: "link",
    all: "other",
    id: "other",
    img: "image",
    longDImg: "graphic",
    area: "area",
    inpImg: "graphic",
    //graphic buttons
    applet: "object",
    hx: "heading",
    label: "form",
    inputLabel: "form",
    form: "form",
    tableData: "table",
    table: "table",
    tableLayout: "table",
    tableComplex: "table",
    frameset: "frame",
    iframe: "frame",
    frame: "frame",
    embed: "object",
    //embedded object
    object: "object",
    fontValues: "other",
    ehandler: "ehandler",
    w3cValidator: "validator",
  };

  @ViewChild("chartErrors", { static: true }) chartErrors: any;

  chart: any;
  errors: any;
  tests: any;
  nPages: number;
  inDirectoriesPage: boolean;
  isCat: boolean;

  graphData: any;
  tableData: Array<ErrorData>;
  showTableData: Array<ErrorData>;
  columnDefinitions: any[];
  columnDefinitionsMobile: any[];
  existingElemGroups: any;

  tabs: HTMLElement[] = [];
  panels: HTMLElement[] = [];
  tablist: HTMLElement;

  keys: any;
  direction: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {
    this.tests = tests;
    this.inDirectoriesPage = this.data.inDirectoriesPage;
    this.isCat = this.data.isCat;
    this.errors = this.data.errors;
    this.nPages = this.data.nPages;

    this.existingElemGroups = [];

    this.columnDefinitions = [
      { def: "level", hide: false },
      { def: "element", hide: false },
      { def: "description", hide: false },
      { def: "websites", hide: !this.inDirectoriesPage },
      { def: "pages", hide: false },
      { def: "elems", hide: false },
      { def: "quartiles", hide: false },
    ];

    this.columnDefinitionsMobile = [
      { def: "level", hide: false },
      { def: "description", hide: false },
      { def: "websites", hide: !this.inDirectoriesPage },
      { def: "pages", hide: false },
    ];

    /*this.graphData = [];
    this.tableData = new Array<ErrorData>();d

    forEach(this.data.errors, (v, k) => {
      if (this.tests[k]["result"] === "failed") {
        let key = k;
        let elem = this.tests[key]["elem"];
        let n_pages = v["n_pages"];
        let n_websites = v["n_websites"];
        let result = this.tests[key]["result"];

        let quartiles = calculateQuartiles(this.data, k);
        if (!includes(this.existingElemGroups, this.elemGroups[elem])) {
          this.existingElemGroups.push(this.elemGroups[elem]);
        }
        // description, element name
        let translations: string[] = ["RESULTS." + k, "TEST_ELEMENTS." + elem];
        this.tableData.push(this.addToTableData(k, v, translations, quartiles));
        this.graphData.push({ key, elem, n_pages, n_websites, result });
      }
    });

    this.graphData.sort(function (a, b) {
      //return a.elem === b.elem ? (b.n_pages === a.n_pages ? b.n_elems - a.n_elems : b.n_pages - a.n_pages) : a.elem.localeCompare(b.elem);
      return b.n_pages === a.n_pages
        ? a.key.localeCompare(b.key)
        : b.n_pages - a.n_pages;
    });

    // because we only want the top 10
    this.graphData = slice(this.graphData, 0, 10);

    this.showTableData = clone(this.tableData);*/

    this.graphData = this.errors.graphData;

    for (const d of this.errors.showTableData) {
      if (!includes(this.existingElemGroups, this.elemGroups[d.elem])) {
        this.existingElemGroups.push(this.elemGroups[d.elem]);
      }

      d.element = this.translate.instant("TEST_ELEMENTS." + d.elem);
      d.description = this.translate.instant("RESULTS." + d.key);
    }

    this.showTableData = this.tableData = this.errors.showTableData;
  }

  ngOnInit(): void {
    const translations = this.graphData.map((key: any) => {
      return "RESULTS." + key["key"];
    });
    translations.push("DIALOGS.errors.common_errors");
    translations.push("DIALOGS.errors.tests_label");
    translations.push("DIALOGS.errors.situations_label");

    const values = this.graphData.map((error: any) => error.n_pages);

    this.translate.get(translations).subscribe((res: any) => {
      const label = res["DIALOGS.errors.common_errors"];
      const testsLabel = res["DIALOGS.errors.tests_label"];
      const situationsLabel = res["DIALOGS.errors.situations_label"];
      delete res["DIALOGS.errors.common_errors"];
      delete res["DIALOGS.errors.tests_label"];
      delete res["DIALOGS.errors.situations_label"];

      const labels = Object.values(res).map((s: string) => {
        s = s.replace(new RegExp("<code>", "g"), '"');
        s = s.replace(new RegExp("</code>", "g"), '"');
        s = s.replace(new RegExp("<mark>", "g"), "");
        s = s.replace(new RegExp("</mark>", "g"), "");
        s = s.replace(new RegExp("{{value}}", "g"), "");
        s = s.length > 100 ? String(s).substr(0, 97) + "..." : s;
        return this.formatLabel(s, 50);
      });

      const labelsTooltips = Object.values(res).map((s: string) => {
        s = s.replace(new RegExp("<code>", "g"), '"');
        s = s.replace(new RegExp("</code>", "g"), '"');
        s = s.replace(new RegExp("<mark>", "g"), "");
        s = s.replace(new RegExp("</mark>", "g"), "");
        //s = s.replace(new RegExp("{{value}}", "g"), "X");
        return s;
      });

      this.chart = new Chart(this.chartErrors.nativeElement, {
        type: "horizontalBar",
        data: {
          labels,
          datasets: [
            {
              label,
              data: values,
              backgroundColor: "red",
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
                  maxTicksLimit: this.nPages === 1 ? 1 : 11,
                  min: 0,
                  max: this.nPages, //this.calculateMax(Math.max(...values)),
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
                scaleLabel: {
                  display: true,
                  labelString: testsLabel,
                  fontFamily: "Lato",
                },
                ticks: {
                  autoSkip: false,
                  fontFamily: "Lato",
                },
              },
            ],
          },
        },
      });
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
    this.tablist = document.querySelectorAll<HTMLElement>(
      '.practicesTabs [role="tablist"]'
    )[0];

    this.generateArrays();
    this.bindListeners();
  }

  applyFilter(event: any) {
    if (event.target.value !== "null") {
      this.showTableData = this.tableData.filter((td) => {
        return td.elemGroup === event.target.value.trim().toLowerCase();
      });
    } else {
      this.showTableData = this.tableData;
    }
  }

  private calculateMax(max: number): number {
    const t = max + max / 4;
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

  private addToTableData(
    key: string,
    tot: any,
    translations: string[],
    quartiles: any
  ): ErrorData {
    let descr, elemName;
    this.translate.get(translations).subscribe((res: any) => {
      descr = res["RESULTS." + key];
      elemName = res["TEST_ELEMENTS." + this.tests[key]["elem"]];
    });

    return {
      key: key,
      level: tests[key]["level"].toUpperCase(),
      elem: this.tests[key]["elem"],
      element: elemName,
      description: descr,
      websites: tot["n_websites"],
      pages: tot["n_pages"],
      elems: this.tests[key]["result"] === "passed" ? -1 : tot["n_occurrences"],
      quartiles: quartiles,
      elemGroup: this.elemGroups[this.tests[key]["elem"]],
    };
  }

  getDisplayedColumns() {
    return this.columnDefinitions.filter((cd) => !cd.hide).map((cd) => cd.def);
  }

  getDisplayedColumnsMobile() {
    return this.columnDefinitionsMobile
      .filter((cd) => !cd.hide)
      .map((cd) => cd.def);
  }

  generateArrays() {
    const tabs = document.querySelectorAll<HTMLElement>(
      '.practicesTabs [role="tab"]'
    );
    tabs.forEach((tab) => this.tabs.push(tab));
    const panels = document.querySelectorAll<HTMLElement>(
      '.practicesTabs [role="tabpanel"]'
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

function calculateQuartiles(d: any, test: any): Array<any> {
  let data;
  if (d.inDirectoriesPage) {
    data = d.directories.getErrorOccurrenceByDirectory(test);
  } else {
    data = d.directories.getErrorOccurrencesByWebsite(test);
  }

  const values = without(data, undefined).sort((a, b) => a - b);

  let q1, q2, q3, q4;

  q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

  if (values.length % 2 === 0) {
    q2 = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
  } else {
    q2 = values[(values.length + 1) / 2];
  }

  q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
  q4 = values[values.length - 1];

  const tmp = {
    q1: new Array<number>(),
    q2: new Array<number>(),
    q3: new Array<number>(),
    q4: new Array<number>(),
  };

  let q;
  for (const v of values) {
    if (v <= q1) {
      q = "q1";
    } else {
      if (v <= q2) {
        q = "q2";
      } else {
        if (v <= q3) {
          q = "q3";
        } else {
          q = "q4";
        }
      }
    }

    tmp[q].push(v);
  }

  const final = new Array<any>();

  for (const k in tmp) {
    if (k) {
      const v = tmp[k];
      const sum = size(v);

      if (sum > 0) {
        const test = {
          tot: sum,
          por: Math.round((sum * 100) / values.length),
          int: {
            lower: v[0],
            upper: v[sum - 1],
          },
        };

        final.push(clone(test));
      }
    }
  }
  return final;
}

export interface ErrorData {
  key: string;
  level: string;
  elem: string;
  element: string;
  description: string;
  websites: number;
  pages: number;
  elems: number;
  quartiles: any;
  elemGroup: string;
}
