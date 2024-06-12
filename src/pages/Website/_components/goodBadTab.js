// Hooks
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Components
import { SortingTable } from "../../../components/index";
import { TopTenTabs } from "./topTenTabs";

// Extra Data / Functions
import { getGoodBadTabTables } from "../utils"

export function GoodBadTab({ main_content_website, tempData, top10Data, color, goodOrBad, title }) {

  const { t, i18n: { language } } = useTranslation();

  // Theme
  const { theme } = useContext(ThemeContext);

  // Data for top 3 best practices for Good
  const [dataTableA, setDataTableA] = useState();
  const [dataTableAA, setDataTableAA] = useState();
  const [dataTableAAA, setDataTableAAA] = useState();

  // Data for table of all best practices
  const [detailsTable, setDetailsTable] = useState();
  const { dataTableHeadersA, dataTableHeadersAA, dataTableHeadersAAA, columnsOptionsAAs, detailsTableHeaders, columnsOptionsDetails } = getGoodBadTabTables(t, goodOrBad)

  useEffect(() => {
    let tempDataTableA = []
    let tempDataTableAA = []
    let tempDataTableAAA = []
    let tempDetailsTable = []

    // Get the number for each practice in text format
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
    <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center`}>
      <div className="d-flex flex-column section_container best_practises p-3">
        <h3 className="bold py-3 m-0">{title}</h3>
        
        {/* Top Ten Practices Graph/Table */}
        <div className="tabs_section">
          <TopTenTabs top10Data={top10Data} color={color} aditionalData={tempData} title={title} />
        </div>

        {/* Tables for Practices, 3 per type and one general */}
        <h3 className="bold mt-5">{t(`WEBSITE.${goodOrBad}.title`)}</h3>
        <p className="ama-typography-body-large mb-3">{t(`WEBSITE.${goodOrBad}.subtitle`)}</p>
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
        <h3 className="bold mt-5 mb-3">{t("WEBSITE.table.best_title")}</h3>
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
