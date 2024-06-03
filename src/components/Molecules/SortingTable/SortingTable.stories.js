import React, {useState} from "react";
import { SortingTable } from "./index";
import Documentation from './Documentation.md'

const directoriesHeaders = [
  [
    {icon: false, name: t("DIRECTORIES.table.rank"), description: "", property: "rank", position: "left", justify: "", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.table.name"), description: "", property: "name", position: "left", justify: "", varType: "string", href: true},
    {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaration", position: "", justify: "", varType: "number", href: false},
    {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "stamp", position: "", justify: "", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.table.score"), description: "", property: "score", position: "", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.table.websites"), description: "", property: "nWebsites", position: "right", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.table.levels"), description: "", property: "", position: "right", justify: "justify-content-center", varType: "number", nCol: 3, href: false},
  ],
  [
    {icon: false, name: "", description: "", property: "", position: "", justify: "", varType: "", nCol: 6, href: false},
    {icon: false, name: t("DIRECTORIES.table.A"), description: "", property: "A", position: "right", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.table.AA"), description: "", property: "AA", position: "right", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.table.AAA"), description: "", property: "AAA", position: "right", justify: "justify-content-center", varType: "number", href: false}
  ]
]

const dataRows = [
  [
{
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "rank",
    data: [1],
  },
  {
    id: 1,
    type: "Link",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: false,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "name",
    data: ["Os 25 Portais + Procurados da AP"],
  },
  {
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "declarations",
    data: [4],
  },
  {
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "stamps",
    data: [2],
  },
  {
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "score",
    data: [8.486663447825674],
  },
  {
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "A",
    data: [0],
  },
  {
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "AA",
    data: [1],
  },
  {
    type: "Number",    			 // Opções: Number / Link / Text / DoubleText / MultiText / Stamp / Declaration
    formatting: {
      center: true,       // Opções: TRUE / FALSE
      bold: false		 // Opções: TRUE / FALSE
    },
    property: "AAA",
    data: [0],
  },
]
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
      links={true}
    />
  )
};
