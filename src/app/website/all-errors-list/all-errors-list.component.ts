import { Component, OnInit, Input } from '@angular/core';
import orderBy from 'lodash.orderby';
import clone from 'lodash.clone';

@Component({
  selector: 'app-all-errors-list',
  templateUrl: './all-errors-list.component.html',
  styleUrls: ['./all-errors-list.component.scss']
})
export class AllErrorsListComponent implements OnInit {

  elems: any = {'a': 'Links', 'aAdjacentSame': 'Links adjacentes que nos conduzem a um mesmo destino', 'aImgAltNo': 'Links em que o \u00fanico conte\u00fado \u00e9 uma imagem com <code>alt<\/code> nulo ou sem legenda', 'aSameText': 'Links com o mesmo texto que apontam destinos diferentes', 'aSkip': 'Links para contornar blocos de conte\u00fado', 'aSkipFirst': 'Link para saltar para o conte\u00fado principal', 'aTitleMatch': 'Links com o mesmo texto afixado no conte\u00fado e no atributo <code>title<\/code>', 'abbrNo': 'Elementos <code>&lt;abbr&gt;<\/code> ou <code>&lt;acronym&gt;<\/code> sem defini\u00e7\u00e3o', 'acckeyRep': 'Atributos <code>accesskey<\/code> com valores duplicados', 'applet': 'Elementos <code>&lt;applet&gt;<\/code>', 'appletAltNo': 'Elementos <code>&lt;applet&gt;<\/code> sem texto alternativo', 'area': 'Zonas activas de um mapa de imagem', 'areaAltNo': '\u00c1reas de mapas de imagem sem <code>alt<\/code>', 'blink': 'Elementos <code>&lt;blink&gt;<\/code>', 'brSec': 'Sequ\u00eancia de elementos <code>&lt;br&gt;<\/code>', 'colorContrast': 'Combina\u00e7\u00f5es de cor com um r\u00e1cio de contraste inferior a 3:1', 'colorFgBgNo': 'Regras de CSS em que n\u00e3o se especifica simultaneamente a cor de fundo e\/ou cor da letra', 'cssBlink': 'Propriedade de CSS <code>text-decoration<\/code> com valor <code>blink<\/code>', 'dtd': 'DTD - Defini\u00e7\u00e3o de Tipo de Documento', 'ehandBoth': 'Manipuladores de eventos redundantes', 'ehandBothNo': 'Manipuladores de eventos n\u00e3o redundantes', 'ehandMouse': 'Manipuladores de eventos espec\u00edficos do rato', 'ehandTagNo': 'Eventos associados a elementos n\u00e3o interactivos', 'ehandler': 'Manipuladores de eventos', 'embed': 'Elementos <code>&lt;embed&gt;<\/code>', 'embedAltNo': 'Elementos <code>&lt;embed&gt;<\/code> sem <code>&lt;noembed&gt;<\/code>', 'fieldLegNo': 'Elementos <code>&lt;fieldset&gt;<\/code> sem descri\u00e7\u00e3o', 'fieldNoForm': 'Elementos <code>&lt;fieldset&gt;<\/code> usados fora de um formul\u00e1rio', 'focusBlur': 'Scripts para remover o foco', 'fontAbsVal': 'Tamanhos de letra definidos em unidades de medida absolutos', 'fontHtml': 'Elementos e Atributos (X)HTML para formatar o Texto das p\u00e1ginas (p.e. <code>&lt;basefont&gt;<\/code>, <code>&lt;font&gt;<\/code>, <code>link<\/code> e <code>alink<\/code>)', 'fontValues': 'Tamanhos de letra definidos nas CSS', 'form': 'Formul\u00e1rios', 'formSubmitNo': 'Formul\u00e1rios sem o bot\u00e3o de envio', 'frame': 'Elementos <code>&lt;frame&gt;<\/code>', 'frameDtdNo': 'Documento <code>&lt;frameset&gt;<\/code> com doctype incorrecto ou inexistente', 'frameTitleNo': 'Elementos <code>&lt;frame&gt;<\/code> sem <code>t\u00edtle<\/code>', 'frameset': 'Documento <code>&lt;frameset&gt;<\/code>', 'h1': 'Cabe\u00e7alho principal da p\u00e1gina (<code>&lt;h1&gt;<\/code>)', 'hx': 'Cabe\u00e7alhos (<code>&lt;h1&gt;<\/code>-<code>&lt;h6&gt;<\/code>)', 'hxNo': 'Cabe\u00e7alhos (<code>&lt;h1&gt;<\/code>~<code>&lt;h6&gt;<\/code>) sem conte\u00fado descritivo', 'hxSkip': 'Cabe\u00e7alhos com salto(s) de nivel hier\u00e1rquico incorrectos', 'id': 'Elementos com atributo <code>id<\/code>', 'idRep': 'Atributos <code>id<\/code> com valores duplicados', 'iframe': 'Elementos <code>iframe<\/code>', 'iframeTitleNo': 'Elementos <code>iframe<\/code> sem <code>title<\/code>', 'img': 'Imagens', 'imgAltLong': 'Imagens com um atributo <code>alt<\/code> longo', 'imgAltNo': 'Imagens sem <code>alt<\/code>', 'imgAltNot': 'Imagens com um texto alternativo incorrecto', 'imgAltNull': 'Imagens com <code>alt<\/code> nulo', 'inpImg': 'Bot\u00f5es gr\u00e1ficos', 'inpImgAltNo': 'Bot\u00f5es gr\u00e1ficos sem <code>alt<\/code>', 'inputAltNo': 'Elementos <code>&lt;input&gt;<\/code> com atributo <code>alt<\/code>', 'inputIdTitleNo': 'Controlos de formul\u00e1rio sem etiquetas [&lt;label&gt;] associadas e sem atributo <code>title<\/code>', 'inputLabel': 'Controlos de formul\u00e1rio que t\u00eam explicitamente associados uma etiqueta (<code>&lt;label&gt;<\/code>)', 'inputLabelNo': 'Controlos de formul\u00e1rio sem etiquetas associadas', 'justifiedCss': 'Texto justificado com CSS', 'justifiedTxt': 'Texto justificado com atributos (X)HTML', 'label': 'Elementos <code>&lt;label&gt;<\/code>', 'labelForNo': 'Elementos <code>&lt;label&gt;<\/code> sem associa\u00e7\u00e3o expl\u00edcita', 'labelPosNo': 'Elementos <code>&lt;label&gt;<\/code> posicionadas incorrectamente', 'labelTextNo': 'Elementos <code>&lt;label&gt;<\/code> sem conte\u00fado texto', 'lang': 'Idioma principal da p\u00e1gina', 'langCodeNo': 'C\u00f3digo de idioma incorrecto', 'langExtra': 'Atributos <code>lang<\/code> ou <code>xml:lang<\/code> n\u00e3o permitidos', 'langMatchNo': 'Indica\u00e7\u00f5es de idioma n\u00e3o coincidentes', 'langNo': 'Idioma principal n\u00e3o referenciado', 'layoutAttr': 'Atributos (X)HTML para formatar o Layout das p\u00e1ginas (p.e. <code>align<\/code>, <code>hspace<\/code> e <code>bgcolor<\/code>)', 'layoutElem': 'Elementos (x)HTML para formatar o Layout das p\u00e1ginas (p.e. <code>&lt;blink&gt;<\/code> e <code>&lt;center&gt;<\/code>)', 'layoutFixed': 'Elementos com valores absolutos na propriedade "width" da CSS', 'liNoList': 'Itens de lista utilizados fora das listas', 'lineHeightNo': 'Espa\u00e7amento entre linhas incorrecto', 'linkRel': 'Elementos <code>&lt;link&gt;<\/code> para navega\u00e7\u00e3o', 'longDImg': 'Atributos <code>longdesc<\/code> em <code>&lt;img&gt;<\/code>', 'longDNo': 'Atributos <code>longdesc<\/code> com valores incorrectos', 'marquee': 'Elementos <code>&lt;marquee&gt;<\/code>', 'metaRedir': 'Elemento <code>&lt;meta&gt;<\/code> para redireccionar os utilizadores', 'metaRefresh': 'Elemento <code>&lt;meta&gt;<\/code> para reiniciar a p\u00e1gina', 'newWinOnLoad': 'Nova janela assim que a p\u00e1gina \u00e9 carregada', 'object': 'Elementos <code>&lt;object&gt;<\/code>', 'objectAltNo': 'Elementos <code>&lt;object&gt;<\/code> sem textos alternativos', 'scopeNo': 'Valores inv\u00e1lidos para o atributo <code>scope<\/code>', 'table': 'Tabelas', 'tableCaptionSummary': 'Tabelas com o mesmo texto no elemento <code>&lt;caption&gt;<\/code> e no atributo <code>summary<\/code>', 'tableComplex': 'Tabelas de dados complexas', 'tableComplexError': 'Tabelas de dados complexas sem o atributo <code>headers<\/code> nas c\u00e9lulas de dados', 'tableData': 'Tabelas de dados', 'tableDataCaption': 'Tabelas de dados sem o elemento <code>&lt;caption&gt;<\/code> ou o atributo <code>summary<\/code>', 'tableLayout': 'Tabelas sem c\u00e9lulas de cabe\u00e7alhos (i.e. elementos <code>&lt;th&gt;<\/code>)', 'tableLayoutCaption': 'Tabelas sem c\u00e9lulas de cabe\u00e7alhos, mas com o elemento <code>&lt;caption&gt;<\/code> ou o atributo <code>summary<\/code>', 'tableNested': 'Tabelas encadeadas', 'titleChars': 'T\u00edtulo com cadeia de caracteres n\u00e3o textuais (provavelmente arte ASCII)', 'titleLong': 'Quantidade de caracteres no elemento <code>&lt;title&gt;<\/code>', 'titleNo': 'Elemento <code>&lt;title&gt;<\/code> inexistente', 'titleNull': 'Elemento <code>&lt;title&gt;<\/code> sem conte\u00fado textual', 'titleOk': 'T\u00edtulo da p\u00e1gina', 'titleSame': 'T\u00edtulo da p\u00e1gina repetido noutras p\u00e1ginas do s\u00edtio', 'titleVrs': 'Elementos <code>&lt;title&gt;<\/code>', 'valueAbsCss': 'Unidades de medida absolutas nas CSS', 'valueAbsHtml': 'Unidades de medida absolutas em (X)HTML', 'valueRelCss': 'Unidades de medida relativas em CSS', 'valueRelHtml': 'Unidades de medida relativas em (X)HTML', 'w3cValidator': 'Valida\u00e7\u00e3o (X)HTML', 'w3cValidatorErrors': 'Erros de valida\u00e7\u00e3o (X)HTML'};
  elemStats: any = {'aImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'a': {'lev': 'AA', 't': 0, 'p': 0}, 'aAdjacentSame': {'lev': 'A', 't': 0, 'p': 0}, 'aSameText': {'lev': 'AAA', 't': 0, 'p': 0}, 'abbrNo': {'lev': 'AAA', 't': 0, 'p': 0}, 'acckeyRep': {'lev': 'A', 't': 0, 'p': 0}, 'appletAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'areaAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'blink': {'lev': 'A', 't': 0, 'p': 0}, 'cssBlink': {'lev': 'A', 't': 0, 'p': 0}, 'colorContrast': {'lev': 'AA', 't': 0, 'p': 0}, 'ehandMouse': {'lev': 'A', 't': 0, 'p': 0}, 'ehandBothNo': {'lev': 'A', 't': 0, 'p': 0}, 'ehandTagNo': {'lev': 'A', 't': 0, 'p': 0}, 'embedAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldLegNo': {'lev': 'A', 't': 0, 'p': 0}, 'fieldNoForm': {'lev': 'A', 't': 0, 'p': 0}, 'fontHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'fontAbsVal': {'lev': 'AA', 't': 0, 'p': 0}, 'formSubmitNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'frameDtdNo': {'lev': 'A', 't': 0, 'p': 0}, 'hx': {'lev': 'A', 't': 0, 'p': 0}, 'hxNo': {'lev': 'AA', 't': 0, 'p': 0}, 'hxSkip': {'lev': 'AAA', 't': 0, 'p': 0}, 'idRep': {'lev': 'A', 't': 0, 'p': 0}, 'iframeTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'imgAltNot': {'lev': 'A', 't': 0, 'p': 0}, 'inpImgAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'inputIdTitleNo': {'lev': 'A', 't': 0, 'p': 0}, 'justifiedTxt': {'lev': 'AAA', 't': 0, 'p': 0}, 'justifiedCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'labelForNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelPosNo': {'lev': 'A', 't': 0, 'p': 0}, 'labelTextNo': {'lev': 'A', 't': 0, 'p': 0}, 'langCodeNo': {'lev': 'A', 't': 0, 'p': 0}, 'langNo': {'lev': 'A', 't': 0, 'p': 0}, 'langMatchNo': {'lev': 'A', 't': 0, 'p': 0}, 'langExtra': {'lev': 'A', 't': 0, 'p': 0}, 'layoutElem': {'lev': 'A', 't': 0, 'p': 0}, 'layoutAttr': {'lev': 'A', 't': 0, 'p': 0}, 'liNoList': {'lev': 'A', 't': 0, 'p': 0}, 'longDNo': {'lev': 'A', 't': 0, 'p': 0}, 'marquee': {'lev': 'A', 't': 0, 'p': 0}, 'metaRefresh': {'lev': 'A', 't': 0, 'p': 0}, 'metaRedir': {'lev': 'A', 't': 0, 'p': 0}, 'objectAltNo': {'lev': 'A', 't': 0, 'p': 0}, 'scopeNo': {'lev': 'A', 't': 0, 'p': 0}, 'tableLayoutCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableDataCaption': {'lev': 'A', 't': 0, 'p': 0}, 'tableCaptionSummary': {'lev': 'A', 't': 0, 'p': 0}, 'titleVrs': {'lev': 'A', 't': 0, 'p': 0}, 'titleNo': {'lev': 'A', 't': 0, 'p': 0}, 'titleNull': {'lev': 'A', 't': 0, 'p': 0}, 'titleSame': {'lev': 'A', 't': 0, 'p': 0}, 'valueAbsHtml': {'lev': 'AA', 't': 0, 'p': 0}, 'valueAbsCss': {'lev': 'AAA', 't': 0, 'p': 0}, 'w3cValidatorErrors': {'lev': 'A', 't': 0, 'p': 0}, 'newWinOnLoad': {'lev': 'A', 't': 0, 'p': 0}};

  @Input() data: any;

  errors: any;
  errorsKeys: any;

  constructor() {
    this.errorsKeys = new Array<any>();
  }

  ngOnInit() {
    const errors = new Array<any>();
    for (const key in this.data.errors || {}) {
      if (this.data.errors[key]) {
        errors.push({
          key,
          n_elems: this.data.errors[key].n_elems,
          n_pages: this.data.errors[key].n_pages,
          lvl: this.elemStats[key].lev,
          quartiles: this.calculateQuartiles(this.data.getErrorOccurrencesByPage(key))
        });
      }
    }

    this.errors = orderBy(errors, ['n_pages', 'n_elems'], ['desc', 'desc']);
    this.errorsKeys = Object.keys(this.errors);
  }

  private calculateQuartiles(errors: any): Array<any> {
    const values = errors.filter((e: any) => e !== undefined).sort((a: number, b: number) => a - b);

    let q1: number;
    let q2: number;
    let q3: number;
    let q4: number;

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

    let q: string;
    for (const v of values || []) {
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
}
