import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import _tests from '../../tests';

@Component({
  selector: 'app-error-distribution-dialog',
  templateUrl: './error-distribution-dialog.component.html',
  styleUrls: ['./error-distribution-dialog.component.scss']
})
export class ErrorDistributionDialogComponent implements OnInit {

  tests: any;
  
  @ViewChild('chartErrors', { static: true }) chartErrors: any;
  chart: any;

  keys: any;
  errors: any;

  isCat: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {
    this.isCat = this.data.isCat;
    this.errors = this.data.errors;
    this.tests = _tests;
  }

  ngOnInit(): void {
    const translations = this.errors.map((key: any) => {
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
        return this.formatLabel(s, 50);
      });

      const values = this.errors.map((error: any) => error.n_pages);

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
}
