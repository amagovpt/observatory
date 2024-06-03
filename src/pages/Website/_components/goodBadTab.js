import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { useTranslation } from "react-i18next";

import { SortingTable } from "../../../components/Molecules/SortingTable";
import { TopTenTabs } from "./topTenTabs";

export function GoodBadTab({ main_content_website, tempData, top10Data, color, goodOrBad, title }) {

  const { t, i18n: { language } } = useTranslation();
  const { theme } = useContext(ThemeContext);

  // Data for top 3 best practices for Good
  const [dataTableA, setDataTableA] = useState();
  const [dataTableAA, setDataTableAA] = useState();
  const [dataTableAAA, setDataTableAAA] = useState();

  // Data for table of all best practices
  const [detailsTable, setDetailsTable] = useState();

  const dataTableHeadersA = [
    {icon: false, name: t(`WEBSITE.${goodOrBad}.message`, {value: "A"}), nCol: 3}
  ]

  const dataTableHeadersAA = [
    {icon: false, name: t(`WEBSITE.${goodOrBad}.message`, {value: "AA"}), nCol: 3}
  ]

  const dataTableHeadersAAA = [
    {icon: false, name: t(`WEBSITE.${goodOrBad}.message`, {value: "AAA"}), nCol: 3}
  ]

  let columnsOptionsAAs = {
    number: { type: "Text", center: true, bold: true, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    nPages: { type: "DoubleText", center: true, bold: false, decimalPlace: false },
  }

  const detailsTableHeaders = [
    {icon: false, bigWidth: "50%", name: t("WEBSITE.table.practice_label")},
    {icon: false, bigWidth: "30%", name: t("WEBSITE.table.details_practice_label"), justifyCenter: true},
    {icon: false, name: t("WEBSITE.table.n_pages_label"), justifyCenter: true},
    {icon: false, name: t("WEBSITE.table.n_errors_label"), justifyCenter: true},
    {icon: false, name: t("WEBSITE.table.lvl_label"), justifyCenter: true},
  ]

  let columnsOptionsDetails = {
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    practices: { type: "MultiText", center: true, bold: false, decimalPlace: false },
    pages: { type: "Number", center: true, bold: false, decimalPlace: false },
    occurences: { type: "Number", center: true, bold: false, decimalPlace: false },
    lvl: { type: "Text", center: true, bold: false, decimalPlace: false },
  }

  useEffect(() => {
    let tempDataTableA = []
    let tempDataTableAA = []
    let tempDataTableAAA = []
    let tempDetailsTable = []
    tempData.practicesData.map((value) => {
      let praticsPerPage = []
      value.quartiles.map((part) => {
        let text = ""
        if(part.int.lower === part.int.upper) {
          if(part.por === 100) {
            text = t(`WEBSITE.table.details.oneDetailAllPagesTogether`, {lower: part.int.lower})
          } else {
            text = t(`WEBSITE.table.details.sameDetailTogether`, {lower: part.int.lower, nPages: part.tot})
          }
        } else {
          text = t(`WEBSITE.table.details.multiDetailsTogether`, {lower: part.int.lower, upper: part.int.upper, nPages: part.tot})
        }
        praticsPerPage.push(text)
      })
      
      tempDetailsTable.push({name: t(`RESULTS.${value.key}`), practices: praticsPerPage, pages: value.n_pages, occurences: value.n_occurrences, lvl: value.lvl})
      switch(value.lvl) {
        case "A":
          if(tempDataTableA.length < 3) {
            tempDataTableA.push({
              number: tempDataTableA.length+1+".",
              name: t(`RESULTS.${value.key}`),
              nPages: [t(`WEBSITE.${goodOrBad}.practice`) + " ", value.n_pages + " " + t(`WEBSITE.${goodOrBad}.pages`)]
            })
          }
          break;
        case "AA":
          if(tempDataTableAA.length < 3) {
            tempDataTableAA.push({
              number: tempDataTableAA.length+1+".",
              name: t(`RESULTS.${value.key}`),
              nPages: [t(`WEBSITE.${goodOrBad}.practice`) + " ", value.n_pages + " " + t(`WEBSITE.${goodOrBad}.pages`)]
            })
          }
          break;
        case "AAA":
          if(tempDataTableAAA.length < 3) {
            tempDataTableAAA.push({
              number: tempDataTableAAA.length+1+".",
              name: t(`RESULTS.${value.key}`),
              nPages: [t(`WEBSITE.${goodOrBad}.practice`) + " ", value.n_pages + " " + t(`WEBSITE.${goodOrBad}.pages`)]
            })
          }
          break;
      }
    })
    setDataTableA(tempDataTableA)
    setDataTableAA(tempDataTableAA)
    setDataTableAAA(tempDataTableAAA)
    setDetailsTable(tempDetailsTable)
  }, [tempData, theme, language])

  return (
    <section
        className={`bg-white ${main_content_website} d-flex flex-row section`}
    >
        <div className="d-flex flex-column section_container best_practises">
            <h3 className="table_title">{title}</h3>
            <div className="tabs_section">
              <TopTenTabs top10Data={top10Data} color={color} aditionalData={tempData} title={title} />
            </div>
            <h3 className="top">{t(`WEBSITE.${goodOrBad}.title`)}</h3>
            <h4>{t(`WEBSITE.${goodOrBad}.subtitle`)}</h4>
            {dataTableA && <SortingTable
              hasSort={false}
              headers={dataTableHeadersA}
              dataList={dataTableA}
              columnsOptions={columnsOptionsAAs}
              darkTheme={theme === "light" ? false : true}
              pagination={false}
              links={false}
              caption={t(`WEBSITE.${goodOrBad}.message`, {value: "A"})}
            />}
            {dataTableAA && <SortingTable
              hasSort={false}
              headers={dataTableHeadersAA}
              dataList={dataTableAA}
              columnsOptions={columnsOptionsAAs}
              darkTheme={theme === "light" ? false : true}
              pagination={false}
              links={false}
              caption={t(`WEBSITE.${goodOrBad}.message`, {value: "AA"})}
            />}
            {dataTableAAA && <SortingTable
              hasSort={false}
              headers={dataTableHeadersAAA}
              dataList={dataTableAAA}
              columnsOptions={columnsOptionsAAs}
              darkTheme={theme === "light" ? false : true}
              pagination={false}
              links={false}
              caption={t(`WEBSITE.${goodOrBad}.message`, {value: "AAA"})}
            />}
            <h3 className="top bottom">{t("WEBSITE.table.best_title")}</h3>
            <div className="dark_table">
              {detailsTable && <SortingTable
                hasSort={false}
                headers={detailsTableHeaders}
                dataList={detailsTable}
                columnsOptions={columnsOptionsDetails}
                darkTheme={theme === "light" ? false : true}
                pagination={false}
                links={false}
                caption={t("WEBSITE.table.best_title")}
              />}
            </div>
        </div>
    </section>
  );
}
