import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import tests from "../../tests";
import {MatTableDataSource} from "@angular/material/table";
import {CorrectionData} from "../correction-distribution-dialog/correction-distribution-dialog.component";
import { MatSort } from '@angular/material/sort';
import * as includes from "lodash.includes";
import * as forEach from "lodash.foreach";
import * as slice from "lodash.slice";
import * as without from "lodash.without";
import * as size from "lodash.size";
import * as clone from "lodash.clone";

@Component({
  selector: 'app-error-distribution-dialog',
  templateUrl: './error-distribution-dialog.component.html',
  styleUrls: ['./error-distribution-dialog.component.scss']
})
export class ErrorDistributionDialogComponent implements OnInit {

  elemGroups: any = {
    'a': 'link',
    'all': 'other',
    'id': 'other',
    'img': 'image',
    'longDImg': 'graphic',
    'area': 'area',
    'inpImg': 'graphic',
    //graphic buttons
    'applet': 'object',
    'hx': 'heading',
    'label': 'form',
    'inputLabel': 'form',
    'form': 'form',
    'tableData': 'table',
    'table': 'table',
    'tableLayout': 'table',
    'tableComplex': 'table',
    'frameset': 'frame',
    'iframe': 'frame',
    'frame': 'frame',
    'embed': 'object',
    //embedded object
    'object': 'object',
    'fontValues': 'other',
    'ehandler': 'ehandler',
    'w3cValidator': 'validator'
  };

  @ViewChild('chartErrors', { static: true }) chartErrors: any;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  chart: any;
  keys: any;
  errors: any;
  testsFile: any;
  inTagsPage: boolean;
  isCat: boolean;

  graphData: any;
  dataSource: MatTableDataSource<ErrorData>;
  dataSourcePerElement: MatTableDataSource<CorrectionData>;
  columnDefinitions: any[];
  columnDefinitionsMobile: any[];
  existingElemGroups: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {
    this.testsFile = tests;
    this.inTagsPage = this.data.inTagsPage;
    this.isCat = this.data.isCat;
    this.errors = this.data.errors;
    
    this.existingElemGroups = [];

    this.columnDefinitions = [
      { def: 'level', hide: false},
      { def: 'element', hide: false},
      { def: 'description', hide: false},
      { def: 'websites', hide: !this.inTagsPage},
      { def: 'pages', hide: false},
      { def: 'elems', hide: false},
      { def: 'quartiles', hide: false}
    ];

    this.columnDefinitionsMobile = [
      { def: 'level', hide: false},
      { def: 'description', hide: false},
      { def: 'websites', hide: !this.inTagsPage},
      { def: 'pages', hide: false}
    ];

    this.graphData = [];
    const tableData: ErrorData[] = [];

    forEach(this.data.tags.tot, (v, k) => {
      if (v['result'] === 'failed') {
        let key = k;
        let elem = v['elem'];
        let n_pages = v['n_pages'];
        let n_websites = v['n_websites'];
        let result = v['result'];

        let quartiles = calculateQuartiles(this.data, k);
        if (!includes(this.existingElemGroups, this.elemGroups[v['elem']])) {
          this.existingElemGroups.push(this.elemGroups[v['elem']]);
        }
        // description, element name
        let translations: string[] = ["RESULTS." + k, "TEST_ELEMENTS." + elem];
        tableData.push(this.addToTableData(k, v, translations, quartiles));
        this.graphData.push({key, elem, n_pages, n_websites, result});
      }
    });

    this.graphData.sort(function (a, b) {
      //return a.elem === b.elem ? (b.n_pages === a.n_pages ? b.n_elems - a.n_elems : b.n_pages - a.n_pages) : a.elem.localeCompare(b.elem);
      return b.n_pages === a.n_pages ? a.key.localeCompare(b.key) : b.n_pages - a.n_pages;
    });

    // because we only want the top 10
    this.graphData = slice(this.graphData, 0, 10);
    this.dataSource = new MatTableDataSource(tableData);

  }

  ngOnInit(): void {
    this.dataSource.sort = this.matSort;
    const translations = this.graphData.map((key: any) => {
      return 'RESULTS.' + key['key'];
    });
    translations.push('DIALOGS.errors.common_errors');
    translations.push('DIALOGS.errors.tests_label');
    translations.push('DIALOGS.errors.situations_label');

    this.translate.get(translations).subscribe((res: any) => {

      const label = res['DIALOGS.errors.common_errors'];
      const testsLabel = res['DIALOGS.errors.tests_label'];
      const situationsLabel = res['DIALOGS.errors.situations_label'];
      delete res['DIALOGS.errors.common_errors'];
      delete res['DIALOGS.errors.tests_label'];
      delete res['DIALOGS.errors.situations_label'];

      const labels = Object.values(res).map((s: string) => {
        s = s.replace(new RegExp('<code>', 'g'), '"');
        s = s.replace(new RegExp('</code>', 'g'), '"');
        s = s.length > 100 ? String(s).substr(0, 97) + '...' : s;
        return this.formatLabel(s, 50);
      });

      const labelsTooltips = Object.values(res).map((s: string) => {
        s = s.replace(new RegExp('<code>', 'g'), '"');
        s = s.replace(new RegExp('</code>', 'g'), '"');
        return s;
      });

      const values = this.graphData.map((error: any) => error.n_pages);

      this.chart = new Chart(this.chartErrors.nativeElement, {
        type: 'horizontalBar',
        data: {
          labels,
          datasets: [
            {
              label,
              data: values,
              backgroundColor: 'red'
            }
          ]
        },
        options: {
          tooltips: {
            callbacks: {
              // to make the title appear entirely
              title: function(tooltipItem, data){
                return labelsTooltips[tooltipItem[0]['index']];
              }
            }
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 1,
                max: this.calculateMax(Math.max(...values)),
                maxTicksLimit: this.calculateMax(Math.max(...values)) + 1
              },
              scaleLabel: {
                display: true,
                labelString: situationsLabel
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: testsLabel
              },
              ticks: {
                autoSkip: false
              }
            }]
          }
        }
      });
    });
  }

  applyFilter(filterValue: string) {
    if(filterValue === null){
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  private calculateMax(max: number): number {
    const t = max + (max / 3);
    return Math.ceil(t);
  }

  private formatLabel(str: string, maxwidth: number): any {
    const sections = [];
    const words = str.split(' ');
    let temp = '';

    words.forEach((item: any, index: number) => {
      if (temp.length > 0) {
        const concat = temp + ' ' + item;

        if (concat.length > maxwidth) {
          sections.push(temp);
          temp = '';
        } else {
          if (index === (words.length - 1)) {
            sections.push(concat);
            return;
          } else {
            temp = concat;
            return;
          }
        }
      }

      if (index === (words.length - 1)) {
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

  private addToTableData(key: string, tot: any, translations: string[], quartiles: any): ErrorData {
    let descr, elemName;
    this.translate.get(translations).subscribe((res: any) => {
      descr = res['RESULTS.' + key];
      elemName = res['TEST_ELEMENTS.' + tot['elem']];
    });

    return {
      key: key,
      level: (tests[key]['level']).toUpperCase(),
      elem: tot['elem'],
      element: elemName,
      description: descr,
      websites: tot['n_websites'],
      pages: tot['n_pages'],
      elems: tot['result'] === 'passed' ? -1 : tot['n_times'],
      quartiles: quartiles,
      elemGroup: this.elemGroups[tot['elem']]
    };
  }

  getDisplayedColumns() {
    return this.columnDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }
  
  getDisplayedColumnsMobile() {
    return this.columnDefinitionsMobile.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
}

function calculateQuartiles(d: any, test: any): Array<any> {
  let data;
  if (d.inTagsPage) {
    data = d.tags.getErrorOccurrenceByTag(test);
  } else {
    data = d.tags.getErrorOccurrenceByWebsite(test);
  }

  const values = without(data, undefined).sort((a, b) => a - b);

  let q1, q2, q3, q4;

  q1 = values[Math.round(0.25 * (values.length + 1)) - 1];

  if (values.length % 2 === 0) {
    q2 = (values[(values.length / 2) - 1] + values[(values.length / 2)]) / 2;
  } else {
    q2 = values[(values.length + 1) / 2];
  }

  q3 = values[Math.round(0.75 * (values.length + 1)) - 1];
  q4 = values[values.length - 1];

  const tmp = {
    q1: new Array<number>(),
    q2: new Array<number>(),
    q3: new Array<number>(),
    q4: new Array<number>()
  };

  let q;
  for (const v of values) {
    if (v <= q1) {
      q = 'q1';
    } else {
      if (v <= q2) {
        q = 'q2';
      } else {
        if (v <= q3) {
          q = 'q3';
        } else {
          q = 'q4';
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
            upper: v[sum - 1]
          }
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
