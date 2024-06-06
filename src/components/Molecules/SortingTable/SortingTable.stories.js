import React, {useState} from "react";
import { SortingTable } from "./index";

const directoriesHeaders = [
  [
    {icon: false, name: "Classificação", property: "rank"},
    {icon: false, bigWidth: "50%", name: "Sítio Web", property: "name"},
    {icon: true, name: "AMA-DeclaracaoDark-Line", description: "Com declaração de usabilidade e acessibilidade", property: "declaration"},
    {icon: true, name: "AMA-SeloDark-Line", description: "Com selo de usabilidade e acessibilidade", property: "stamp"},
    {icon: false, name: "Pontuação", property: "score", justifyCenter: true},
    {icon: false, name: "Páginas", property: "nPages", justifyCenter: true},
    {icon: false, name: "Páginas em conformidade*", property: "", justifyCenter: true, multiCol: true, nCol: 3},
  ],
  [
    {icon: false, nCol: 6, name: "Vazio", multiCol: true, empty: true},
    {icon: false, name: "A", property: "A", justifyCenter: true},
    {icon: false, name: "AA", property: "AA", justifyCenter: true},
    {icon: false, name: "AAA", property: "AAA", justifyCenter: true}
  ]
]

let columnsOptions = {
  id: { type: "Skip", center: false, bold: false, decimalPlace: false },
  rank: { type: "Number", center: true, bold: false, decimalPlace: false },
  name: { type: "Button", center: false, bold: false, decimalPlace: false },
  entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
  declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
  stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
  score: { type: "Number", center: true, bold: false, decimalPlace: true },
  nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
  A: { type: "Number", center: true, bold: false, decimalPlace: false },
  AA: { type: "Number", center: true, bold: false, decimalPlace: false },
  AAA: { type: "Number", center: true, bold: false, decimalPlace: false },
}

let nameOfIcons = [
  "Selo Bronze",
  "Selo Prata",
  "Selo Ouro",
  "Declaração não conforme",
  "Declaração parcialmente conforme",
  "Declaração plenamente conforme"
]

let paginationButtonsTexts = [
  "Primeira página",
  "Página anterior",
  "Página seguinte",
  "Última página"
]

let nItemsPerPageText=[
  "Ver ",
  " itens por página"
]

let itemsPaginationText = [
  " de ",
  " itens"
]

const dataRows = [
  {
    "id": 22,
    "rank": 1,
    "name": "Portal Mais Transparência",
    "entity": "Agência para a Modernização Administrativa",
    "declaration": 3,
    "stamp": 3,
    "score": 9.937837837837838,
    "nPages": 37,
    "A": 0,
    "AA": 6,
    "AAA": 31
  },
  {
    "id": 23,
    "rank": 2,
    "name": "Instituto da Segurança Social, I.P. - Portal Seg Social",
    "entity": "Instituto da Segurança Social, I.P.",
    "declaration": null,
    "stamp": null,
    "score": 9.63908045977012,
    "nPages": 87,
    "A": 0,
    "AA": 33,
    "AAA": 22
  },
  {
    "id": 31,
    "rank": 3,
    "name": "Portal do SNS 24",
    "entity": "Serviços Partilhados do Ministério da Saúde, E.P.E.",
    "declaration": null,
    "stamp": null,
    "score": 9.54666666666667,
    "nPages": 30,
    "A": 13,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 25,
    "rank": 4,
    "name": "Comissão Nacional de Eleições",
    "entity": "Comissão Nacional de Eleições",
    "declaration": null,
    "stamp": null,
    "score": 9.379166666666668,
    "nPages": 24,
    "A": 13,
    "AA": 0,
    "AAA": 7
  },
  {
    "id": 8,
    "rank": 5,
    "name": "Diário da República Portuguesa",
    "entity": "Imprensa Nacional - Casa da Moeda",
    "declaration": null,
    "stamp": null,
    "score": 9.32,
    "nPages": 35,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 4,
    "rank": 6,
    "name": "Portal da Defesa Nacional",
    "entity": "Secretaria-Geral do Ministério da Defesa Nacional",
    "declaration": 2,
    "stamp": 2,
    "score": 9.263157894736839,
    "nPages": 114,
    "A": 4,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 30,
    "rank": 7,
    "name": "Recuperar Portugal",
    "entity": "Plano de Recuperação e Resiliência",
    "declaration": null,
    "stamp": null,
    "score": 9.100000000000001,
    "nPages": 13,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 21,
    "rank": 8,
    "name": "INEM - Instituto Nacional de Emergência Médica, I.P.",
    "entity": "Instituto Nacional de Emergência Médica, I.P.",
    "declaration": 3,
    "stamp": null,
    "score": 9.003389830508473,
    "nPages": 59,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 20,
    "rank": 9,
    "name": "Portal CITIUS da Justiça",
    "entity": "Ministério da Justiça",
    "declaration": null,
    "stamp": null,
    "score": 8.994871794871797,
    "nPages": 39,
    "A": 1,
    "AA": 0,
    "AAA": 6
  },
  {
    "id": 11,
    "rank": 10,
    "name": "Direção-Geral da Educação",
    "entity": "Direção-Geral da Educação",
    "declaration": null,
    "stamp": null,
    "score": 8.79491525423729,
    "nPages": 59,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 9,
    "rank": 11,
    "name": "Portal do Governo de Portugal",
    "entity": "Centro de Gestão da Rede Informática do Governo",
    "declaration": null,
    "stamp": null,
    "score": 8.787804878048783,
    "nPages": 82,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 10,
    "rank": 12,
    "name": "Assembleia da República",
    "entity": "Assembleia da República",
    "declaration": null,
    "stamp": null,
    "score": 8.638144329896905,
    "nPages": 97,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 12,
    "rank": 13,
    "name": "Bolsa de Emprego Público",
    "entity": "Direção-Geral da Administração e do Emprego Público",
    "declaration": null,
    "stamp": null,
    "score": 8.623999999999999,
    "nPages": 25,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 5,
    "rank": 14,
    "name": "Portal SNS",
    "entity": "Serviços Partilhados do Ministério da Saúde, E.P.E.",
    "declaration": null,
    "stamp": null,
    "score": 8.566666666666666,
    "nPages": 60,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 3,
    "rank": 15,
    "name": "Portal da Justiça",
    "entity": "Secretaria-Geral do Ministério da Justiça",
    "declaration": null,
    "stamp": null,
    "score": 8.352380952380951,
    "nPages": 42,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 13,
    "rank": 16,
    "name": "Portal das Matrículas",
    "entity": "Direção-Geral dos Estabelecimentos Escolares",
    "declaration": null,
    "stamp": null,
    "score": 8.3,
    "nPages": 1,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 28,
    "rank": 17,
    "name": "Instituto Português do Mar e da Atmosfera",
    "entity": "Instituto Português do Mar e da Atmosfera",
    "declaration": null,
    "stamp": null,
    "score": 8.252941176470587,
    "nPages": 51,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 14,
    "rank": 18,
    "name": "Portal de Transparência Municipal",
    "entity": "Direção-Geral das Autarquias Locais",
    "declaration": null,
    "stamp": null,
    "score": 8.083333333333334,
    "nPages": 6,
    "A": 0,
    "AA": 0,
    "AAA": 1
  },
  {
    "id": 24,
    "rank": 19,
    "name": "Autoridade Nacional de Comunicações",
    "entity": "Autoridade Nacional de Comunicações",
    "declaration": null,
    "stamp": null,
    "score": 8.054545454545453,
    "nPages": 154,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 27,
    "rank": 20,
    "name": "Instituto da Mobilidade e dos Transportes, I.P.",
    "entity": "Instituto da Mobilidade e dos Transportes",
    "declaration": null,
    "stamp": null,
    "score": 7.983333333333333,
    "nPages": 30,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 7,
    "rank": 21,
    "name": "IEFP - Instituto do Emprego e Formação Profissional, I.P.",
    "entity": "Instituto do Emprego e Formação Profissional, I.P.",
    "declaration": null,
    "stamp": null,
    "score": 7.797701149425285,
    "nPages": 87,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 16,
    "rank": 22,
    "name": "IAPMEI - Agência para a Competitividade e Inovação, I.P.",
    "entity": "Agência para a Competitividade e Inovação, I.P.",
    "declaration": null,
    "stamp": null,
    "score": 7.734328358208957,
    "nPages": 67,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 18,
    "rank": 23,
    "name": "SEF - Portal dos Serviços de Estrangeiros e Fronteiras",
    "entity": "Serviço de Estrangeiros e Fronteiras",
    "declaration": null,
    "stamp": null,
    "score": 7.646391752577328,
    "nPages": 97,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 2,
    "rank": 24,
    "name": "ePortugal",
    "entity": "Agência para a Modernização Administrativa",
    "declaration": 2,
    "stamp": null,
    "score": 7.565217391304346,
    "nPages": 69,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 17,
    "rank": 25,
    "name": "INE - Instituto Nacional de Estatística, I.P.",
    "entity": "Instituto Nacional de Estatística",
    "declaration": null,
    "stamp": null,
    "score": 7.175609756097562,
    "nPages": 41,
    "A": 0,
    "AA": 0,
    "AAA": 0
  },
  {
    "id": 26,
    "rank": 26,
    "name": "Portal eFatura",
    "entity": "Autoridade Tributária e Aduaneira",
    "declaration": null,
    "stamp": null,
    "score": 6.111764705882353,
    "nPages": 17,
    "A": 0,
    "AA": 0,
    "AAA": 0
  }
]

export default {
  title: "components/Molecules/SortingTable",
  component: SortingTable,
};

export const Table2 = () => {
  const [data, setData] = useState(dataRows)

  return (
    <SortingTable
      hasSort={true}
      headers={directoriesHeaders}
      setDataList={setData}
      dataList={data}
      columnsOptions={columnsOptions}
      nextPage={() => null}
      darkTheme={false}
      links={true}
      caption={"Estatísticas do diretório"+ " " + "Os 25 Portais + Procurados da AP"}
      iconsAltTexts={nameOfIcons}
      pagination={true}
      itemsPaginationTexts={itemsPaginationText}
      nItemsPerPageTexts={nItemsPerPageText}
      paginationButtonsTexts={paginationButtonsTexts}
    />
  )
};
