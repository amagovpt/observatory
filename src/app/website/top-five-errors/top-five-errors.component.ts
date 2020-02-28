import { Component, OnInit, Input } from '@angular/core';
import orderBy from 'lodash.orderby';

@Component({
  selector: 'app-top-five-errors',
  templateUrl: './top-five-errors.component.html',
  styleUrls: ['./top-five-errors.component.scss']
})
export class TopFiveErrorsComponent implements OnInit {

  private elemStats: any = {'aImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'a': {'lev': 'AA', 't': 0, 'p': 0}, 'aAdjacentSame': {'lev': 'A', 't': 0, 'p': 0}, 'aSameText': {'lev': 'AAA', 't': 0, 'p': 0}, 'abbrNo': {'lev': 'AAA', 't': 0, 'p': 0}, 'acckeyRep': {'lev': 'A', 't': 0, 'p': 0}, 'appletAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'areaAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'blink': {'lev': 'A', 't': 0, 'p': 0}, 'cssBlink': {'lev': 'A', 't': 0, 'p': 0}, 'colorContrast': {'lev': 'AA', 't': 0, 'p': 0}, 'ehandMouse': {'lev': 'A', 't': 0, 'p': 0}, 'ehandBothNo': {'lev': 'A', 't': 0, 'p': 0}, 'ehandTagNo': {'lev': 'A', 't': 0, 'p': 0}, 'embedAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldLegNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldNoForm': {'lev': 'A', 't': 0, 'p': 0}, 'fontHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'fontAbsVal': {'lev': 'AA', 't': 0, 'p': 0}, 'formSubmitNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameDtdNo': {'lev': 'A', 't': 0, 'p': 0}, 'hx': {'lev': 'A', 't': 0, 'p': 0}, 'hxNo': {'lev': 'AA', 't': 0, 'p': 0}, 'hxSkip': {'lev': 'AAA', 't': 0, 'p': 0}, 'idRep': {'lev': 'A', 't': 0, 'p': 0}, 'iframeTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNot': {'lev': 'A', 't': 0, 'p': 0}, 'inpImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'inputIdTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'justifiedTxt': {'lev': 'AAA', 't': 0, 'p': 0}, 'justifiedCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'labelForNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelPosNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelTextNo': {'lev': 'A', 't': 0, 'p': 0}, 'langCodeNo': {'lev': 'A', 't': 0, 'p': 0}, 'langNo': {'lev': 'A', 't': 0, 'p': 0}, 'langMatchNo': {'lev': 'A', 't': 0, 'p': 0}, 'langExtra': {'lev': 'A', 't': 0, 'p': 0}, 'layoutElem': {'lev': 'A', 't': 0, 'p': 0}, 'layoutAttr': {'lev': 'A', 't': 0, 'p': 0}, 'liNoList': {'lev': 'A', 't': 0, 'p': 0}, 'longDNo': {'lev': 'A', 't': 0, 'p': 0}, 'marquee': {'lev': 'A', 't': 0, 'p': 0}, 'metaRefresh': {'lev': 'A', 't': 0, 'p': 0}, 'metaRedir': {'lev': 'A', 't': 0, 'p': 0}, 'objectAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'scopeNo': {'lev': 'A', 't': 0, 'p': 0}, 'tableLayoutCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableDataCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableCaptionSummary': {'lev': 'A', 't': 0, 'p': 0}, 'titleVrs': {'lev': 'A', 't': 0, 'p': 0}, 'titleNo': {'lev': 'A', 't': 0, 'p': 0}, 'titleNull': {'lev': 'A', 't': 0, 'p': 0}, 'titleSame': {'lev': 'A', 't': 0, 'p': 0}, 'valueAbsHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'valueAbsCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'w3cValidatorErrors': {'lev': 'A', 't': 0, 'p': 0}, 'newWinOnLoad': {'lev': 'A', 't': 0, 'p': 0}};

  @Input() data: any;

  errorsA: any;
  errorsAA: any;
  errorsAAA: any;

  constructor() { }

  ngOnInit() {
    const errors = new Array<any>();
    for (const key in this.data || {}) {
      if (this.data[key]) {
        errors.push({
          key,
          n_elems: this.data[key].n_elems,
          n_pages: this.data[key].n_pages,
          lvl: this.elemStats[key].lev
        });
      }
    }

    this.errorsA = errors.filter((e: any) => e.lvl === 'A');

    this.errorsAA = errors.filter((e: any) => e.lvl === 'AA');

    this.errorsAAA = errors.filter((e: any) => e.lvl === 'AAA');

    this.errorsA = orderBy(this.errorsA, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
    this.errorsAA = orderBy(this.errorsAA, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
    this.errorsAAA = orderBy(this.errorsAAA, ['n_pages', 'n_elems'], ['desc', 'desc']).slice(0, 5);
  }
}
