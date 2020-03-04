import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Chart} from 'chart.js';
import tests from '../../tests'
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-correction-distribution-dialog',
  templateUrl: './correction-distribution-dialog.component.html',
  styleUrls: ['./correction-distribution-dialog.component.scss']
})
export class CorrectionDistributionDialogComponent implements OnInit {

  @ViewChild('chart', { static: true }) chartCorrections: any;
  @ViewChild(MatSort) matSort: MatSort;

  chart: any;
  tests: any;
  keys: any;
  tagsSuccess: {}[];
  nPages: number;
  inTagsPage: boolean;
  graphData: any;
  dataSource: MatTableDataSource<CorrectionData>;
  columnDefinitions: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {
    this.tests = tests;
    
    this.inTagsPage = this.data.inTagsPage;
    this.nPages = this.data.tags.nPages;
    this.tagsSuccess = [];
    this.graphData = [];

    this.columnDefinitions = [
      { def: 'level', hide: false},
      { def: 'description', hide: false},
      { def: 'websites', hide: !this.inTagsPage},
      { def: 'pages', hide: false}
    ];

    const tableData: CorrectionData[] = [];
    for (const key in this.data.tags.tot || {}) {
      const v = this.data.tags.tot[key];
      if (v['result'] === 'passed') {
        let elem = v['elem'];
        let n_pages = v['n_pages'];
        let n_websites = v['n_websites'];
        let result = v['result'];

        // description, element name
        let translations: string[] = ["RESULTS." + key];
        tableData.push(this.addToTableData(key, v, translations));
        this.graphData.push({key, elem, n_pages, n_websites, result});
      }
    }

    this.dataSource = new MatTableDataSource(tableData);
  }

  ngOnInit(): void {

    this.dataSource.sort = this.matSort;

    this.graphData.sort(function (a, b) {
      //return a.elem === b.elem ? (b.n_pages === a.n_pages ? b.n_elems - a.n_elems : b.n_pages - a.n_pages) : a.elem.localeCompare(b.elem);
      return b.n_pages === a.n_pages ? a.key.localeCompare(b.key) : b.n_pages - a.n_pages;
    });

    const translations = this.graphData.map((v, k) => {
      return 'RESULTS.' + v['key'];
    });
    translations.push('DIALOGS.corrections.n_corrections');
    translations.push('DIALOGS.corrections.tests_label');
    translations.push('DIALOGS.corrections.situations_label');

    this.translate.get(translations).subscribe((res: any) => {

      const label = res['DIALOGS.corrections.n_corrections'];
      const tests_label = res['DIALOGS.corrections.tests_label'];
      const situations_label = res['DIALOGS.corrections.situations_label'];
      delete res['DIALOGS.corrections.n_corrections'];
      delete res['DIALOGS.corrections.tests_label'];
      delete res['DIALOGS.corrections.situations_label'];

      const labels = Object.values(res).map((s: string) => {
        s = s.replace(new RegExp('<code>', 'g'), '"');
        s = s.replace(new RegExp('</code>', 'g'), '"');
        return this.formatLabel(s, 50);
      });

      const values = this.graphData.map((v: any) => v.n_pages);

      this.chart = new Chart(this.chartCorrections.nativeElement, {
        type: 'horizontalBar',
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: values,
              backgroundColor: 'green'
            }
          ]
        },
        options: {
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                steps: 1,
                stepValue: 1,
                max: this.nPages,
                maxTicksLimit: this.nPages + 1
              },
              scaleLabel: {
                display: true,
                labelString: situations_label
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: tests_label
              }
            }]
          }
        }
      });
    });
  }

  private calculateMax(max: number): number {
    const t = max + (max / 3);
    return Math.ceil(t);
  }

  private formatLabel(str: string, maxwidth: number): any {
    const sections = [];
    const words = str.split(' ');
    let temp = '';

    words.forEach(function (item, index) {
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

  private addToTableData(key: string, tot: any, translations: string[]): CorrectionData {
    let descr;
    this.translate.get(translations).subscribe((res: any) => {
      descr = res['RESULTS.' + key];
    });

    return {
      level: (tests[key]['level']).toUpperCase(),
      description: descr,
      websites: tot['n_websites'],
      pages: tot['n_pages']
    };
  }

  getDisplayedColumns() {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
}

export interface CorrectionData {
  level: string;
  description: string;
  websites: number;
  pages: number;
}
