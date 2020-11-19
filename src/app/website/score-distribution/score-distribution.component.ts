import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-score-distribution",
  templateUrl: "./score-distribution.component.html",
  styleUrls: ["./score-distribution.component.scss"],
})
export class ScoreDistributionComponent implements OnInit {
  @Input() data: any;

  @ViewChild("chartDomains", { static: true }) chartDomains: any;
  chart: any;

  labels: string[];
  values: number[];
  percentageValues: number[];
  freq: number[];
  freqPer: number[];

  tabs: HTMLElement[] = [];
  panels: HTMLElement[] = [];
  tablist: HTMLElement;

  keys: any;
  direction: any;

  constructor(private translate: TranslateService) {
    this.labels = [
      "[1 - 2[",
      "[2 - 3[",
      "[3 - 4[",
      "[4 - 5[",
      "[5 - 6[",
      "[6 - 7[",
      "[7 - 8[",
      "[8 - 9[",
      "[9 - 10]",
    ];
    this.values = [];
    this.freq = [];
    this.freqPer = [];
  }

  ngOnInit() {
    this.translate
      .get([
        "DIALOGS.scores.percentage",
        "DIALOGS.scores.frequency",
        "DIALOGS.scores.percentage_label",
        "DIALOGS.scores.range",
      ])
      .subscribe((res) => {
        this.values = this.data.frequency;
        const total = this.values.reduce(
          (sum: number, value: number) => sum + value,
          0
        );

        this.percentageValues = this.values.map((v: number) => {
          return (v / total) * 100;
        });

        let tmp = 0;
        for (let i = 0; i < 10; i++) {
          this.freq[i] = tmp += this.values[i];
        }

        let tmpPer = 0;
        for (let i = 0; i < 10; i++) {
          this.freqPer[i] = tmpPer += this.percentageValues[i];
        }

        this.chart = new Chart(this.chartDomains.nativeElement, {
          type: "bar",
          responsive: true,
          data: {
            labels: this.labels,
            datasets: [
              {
                label: res["DIALOGS.scores.percentage"],
                data: this.freqPer,
                type: "line",
                lineTension: 0,
                fill: false,
                pointBackgroundColor: "#e90018",
                pointBorderColor: "#e90018",
                borderColor: getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--statistics-score-line"),
              },
              {
                label: res["DIALOGS.scores.frequency"],
                data: this.percentageValues,
                backgroundColor: [
                  "#e90018",
                  "#e90018",
                  "#f38e10",
                  "#f38e10",
                  "#f3d609",
                  "#f3d609",
                  "#f3d609",
                  "#15ac51",
                  "#15ac51",
                  "#15ac51",
                ],
              },
            ],
          },
          options: {
            maintainAspectRatio: true,
            legend: {
              labels: {
                // This more specific font property overrides the global property
                fontColor: getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--statistics-text"),
                fontFamily: "Lato",
              },
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    beginAtZero: true,
                    steps: 1,
                    stepValue: 1,
                    max: 100,
                    fontFamily: "Lato",
                  },
                  scaleLabel: {
                    display: true,
                    labelString: res["DIALOGS.scores.percentage_label"],
                    fontColor: getComputedStyle(
                      document.documentElement
                    ).getPropertyValue("--statistics-text"),
                    fontFamily: "Lato",
                  },
                },
              ],
              xAxes: [
                {
                  display: true,
                  ticks: {
                    fontFamily: "Lato",
                  },
                  scaleLabel: {
                    display: true,
                    labelString: res["DIALOGS.scores.range"],
                    fontColor: getComputedStyle(
                      document.documentElement
                    ).getPropertyValue("--statistics-text"),
                    fontFamily: "Lato",
                  },
                },
              ],
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem) => {
                  return [
                    res["DIALOGS.scores.percentage"] +
                      ": " +
                      tooltipItem.yLabel.toFixed(1) +
                      "%",
                    res["DIALOGS.scores.frequency"] +
                      ": " +
                      (tooltipItem.datasetIndex === 0
                        ? this.freq[tooltipItem.index]
                        : this.values[tooltipItem.index]),
                  ];
                },
              },
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
        this.tablist = document.querySelectorAll<HTMLElement>(
          '.scoreTabs [role="tablist"]'
        )[0];

        this.generateArrays();
        this.bindListeners();
      });
  }

  generateArrays() {
    const tabs = document.querySelectorAll<HTMLElement>(
      '.scoreTabs [role="tab"]'
    );
    tabs.forEach((tab) => this.tabs.push(tab));
    const panels = document.querySelectorAll<HTMLElement>(
      '.scoreTabs [role="tabpanel"]'
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
