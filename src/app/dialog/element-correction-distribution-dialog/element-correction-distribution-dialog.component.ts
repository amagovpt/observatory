import {
  Component,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import tests from '../../tests'
import { MatSort } from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import clone from 'lodash.clone';

@Component({
  selector: 'app-element-correction-distribution-dialog',
  templateUrl: './element-correction-distribution-dialog.component.html',
  styleUrls: ['./element-correction-distribution-dialog.component.scss']
})
export class ElementCorrectionDistributionDialogComponent implements OnInit {

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

  @ViewChild('chart') chartCorrections: any;
  chart: any;

  tests: any;

  keys: any;
  tagsErrors: any;
  existingElemGroups: any;

  nPages: number;
  inTagsPage: boolean;

  dataSource: MatTableDataSource<ElementCorrectionData>;
  columnDefinitions: any[];

  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {
    this.tests = tests;
    this.inTagsPage = this.data.inTagsPage;
    this.tagsErrors = this.data.tags.errors;
    this.nPages = this.data.tags.nPages;
    this.existingElemGroups = [];

    this.columnDefinitions = [
      { def: 'level', hide: false},
      { def: 'element', hide: false},
      { def: 'description', hide: false},
      { def: 'websites', hide: !this.inTagsPage},
      { def: 'pages', hide: false},
      { def: 'elems', hide: false},
      { def: 'quartiles', hide: false},
    ];

    const tableData: ElementCorrectionData[] = [];
    for (const key in this.data.tags.tot || {}) {
      const v = this.data.tags.tot[key];
      if (v['result'] === 'passed' || v['result'] === 'warning') {
        let elem = v['elem'];
        let quartiles = calculateQuartiles(this.data, key);

        if (!this.existingElemGroups.includes(this.elemGroups[v['elem']])) {
          this.existingElemGroups.push(this.elemGroups[v['elem']]);
        }

        // description, element name
        let translations: string[] = ["RESULTS." + key, "TEST_ELEMENTS." + elem];
        tableData.push(this.addToTableData(key, v, translations, quartiles));
      }
    }

    this.dataSource = new MatTableDataSource(tableData);
    this.existingElemGroups = this.existingElemGroups.sort();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.matSort;
  }

  private addToTableData(key: string, tot: any, translations: string[], quartiles: any): ElementCorrectionData {

    let descr;
    let elemName;
    this.translate.get(translations).subscribe((res: any) => {
      descr = res['RESULTS.' + key];
      elemName = res['TEST_ELEMENTS.' + tot['elem']];
    });

    return {
      level: (tests[key]['level']).toUpperCase(),
      elem: tot['elem'],
      element: elemName,
      description: descr,
      websites: tot['n_websites'],
      pages: tot['n_pages'],
      elems: tot['result'] === 'passed' ? -1 : tot['n_times'],
      quartiles: tot['result'] === 'passed' ? '-' : quartiles,
      elemGroup: this.elemGroups[tot['elem']]
    };
  }

  applyFilter(filterValue: string) {
    if(filterValue === null){
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  getDisplayedColumns() {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function calculateQuartiles(d: any, test: any): Array<any> {
  let data;
  if (d.inTagsPage) {
    data = d.tags.getPassedAndWarningOccurrenceByTag(test);
  } else {
    data = d.tags.getPassedAndWarningOccurrenceByWebsite(test);
  }

  const values = data.filter((a) => a !== undefined).sort((a, b) => a - b);

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
      const sum = v.length;

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

export interface ElementCorrectionData {
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
