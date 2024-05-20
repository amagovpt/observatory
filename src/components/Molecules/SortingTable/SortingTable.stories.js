import React, {useState} from "react";
import { SortingTable } from "./index";
import Documentation from './Documentation.md'

const directoriesHeaders = [
  [
    {icon: false, name: "Classificação", description: "", property: "rank", position: "left", justify: "", varType: "number", href: false},
    {icon: false, name: "Designação", description: "", property: "name", position: "left", justify: "", varType: "string", href: true},
    {icon: true, name: "AMA-DeclaracaoDark-Line", description: "Com declaração de usabilidade e acessibilidade", property: "declaration", position: "", justify: "", varType: "number", href: false},
    {icon: true, name: "AMA-SeloDark-Line", description: "Com selo de usabilidade e acessibilidade", property: "stamp", position: "", justify: "", varType: "number", href: false},
    {icon: false, name: "Pontuação", description: "", property: "score", position: "", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: "Sítios Web", description: "", property: "nWebsites", position: "right", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: "Sítios Web em conformidade*", description: "", property: "", position: "right", justify: "justify-content-center", varType: "number", nCol: 3, href: false},
  ],
  [
    {icon: false, name: "", description: "", property: "", position: "", justify: "", varType: "", nCol: 6, href: false},
    {icon: false, name: "A", description: "", property: "A", position: "right", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: "AA", description: "", property: "AA", position: "right", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: "AAA", description: "", property: "AAA", position: "right", justify: "justify-content-center", varType: "number", href: false}
  ]
]

const dataRows = [
  {
    "id": 1,
    "rank": 1,
    "name": "Os 25 Portais + Procurados da AP",
    "declarations": 4,
    "stamps": 2,
    "score": 8.486663447825674,
    "nWebsites": 26,
    "A": 0,
    "AA": 1,
    "AAA": 0
  }
]

export default {
  title: "components/Molecules/SortingTable",
  component: SortingTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

export const Table = () => {
  const [data, setData] = useState(dataRows)

  return (
    <SortingTable
      headers={directoriesHeaders}
      setDataList={setData}
      dataList={data}
      nextPage={null}
      darkTheme={false}
      pagination={true}
      itemsPaginationText1={" de "}
      itemsPaginationText2={" itens"}
      nItemsPerPageText1={"Ver "}
      nItemsPerPageText2={" itens por página"}
    />
  )
};
