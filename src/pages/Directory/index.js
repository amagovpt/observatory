import "./styles.css";

import { Breadcrumb } from "../../components/index";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import moment from 'moment'
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import { StatisticsHeader } from "../../components/Molecules/StatisticsHeader";
import { SortingTable } from "../../components/Molecules/SortingTable";

export default function Directory() {

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [directoriesList, setDirectoriesList] = useState();
  const [directoriesStats, setDirectoriesStats] = useState();

  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_directory";

  const id = location.state?.id || null;
  const dataProcess = location.state?.content || null;
  const directoryName = dataProcess.directories[id].name

  const directoriesHeaders = [
    [
      {icon: false, name: t("DIRECTORY.table.rank"), property: "rank"},
      {icon: false, bigWidth: "50%", name: t("DIRECTORY.table.name"), property: "name"},
      {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration"},
      {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp"},
      {icon: false, name: t("DIRECTORY.table.score"), property: "score", justifyCenter: true},
      {icon: false, name: t("DIRECTORY.table.pages"), property: "nPages", justifyCenter: true},
      {icon: false, name: t("DIRECTORY.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
    ],
    [
      {icon: false, nCol: 6, name: "", multiCol: true},
      {icon: false, name: t("DIRECTORY.table.A"), property: "A", justifyCenter: true},
      {icon: false, name: t("DIRECTORY.table.AA"), property: "AA", justifyCenter: true},
      {icon: false, name: t("DIRECTORY.table.AAA"), property: "AAA", justifyCenter: true}
    ]
  ]

  let columnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false },
    entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
    declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
    stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
    score: { type: "Number", center: true, bold: false, decimalPlace: true },
    nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
    A: { type: "Number", center: true, bold: false, decimalPlace: false },
    AA: { type: "Number", center: true, bold: false, decimalPlace: false },
    AAA: { type: "Number", center: true, bold: false, decimalPlace: false },
  }

  let statsTitles = [
    t("STATISTICS.entities"),
    t("STATISTICS.websites"),
    t("STATISTICS.pages")
  ]

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "/" },
    { title: t("HEADER.NAV.directories"), href: "" },
    { title: directoryName },
  ];

  useEffect(() => {
    const processData = () => {
      const tempData = dataProcess.directories[id]
      setDirectoriesStats({
          score: (tempData.score).toFixed(1),
          recentPage: moment(tempData.recentPage).format("LL"),
          oldestPage: moment(tempData.oldestPage).format("LL"),
          statsTable: [
            tempData.nEntities,
            tempData.nWebsites,
            tempData.nPages,
          ]
      })
    
      setDirectoriesList(tempData.websitesList)
    }
    processData()
  }, [dataProcess, id])

  const nextPage = (row, key) => {
    if(row) {
      navigate(`/directories/${id}/${row["id"]}`, {state: {content: dataProcess, directoryId: id, websiteId: row["id"]}} )
    }
  }

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} onClick={() => navigate(`/directories`, {state: {content: dataProcess}} )} />
        </div>

        <div className="title_container">
            <div className="observatorio" lang="en">
                {t("DIRECTORY.title")}
            </div>
            <h2 className="page_title">{t("DIRECTORY.subtitle") + " " + directoryName}</h2>
        </div>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
        >
          {directoriesStats && 
            <StatisticsHeader
              darkTheme={theme === "light" ? false : true}
              stats={directoriesStats}
              statsTitles={statsTitles}
              title={t("DIRECTORIES.statistics_title")}
              subtitle={t("DIRECTORIES.statistics_subtitle")}
              oldestPage={t("STATISTICS.oldest_page_updated")}
              newestPage={t("STATISTICS.newest_page_updated")}
              gaugeTitle={t("STATISTICS.gauge.label")}
              buttons={true}
            />}
        </section>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
        >
          <div className="d-flex flex-column section_container">
              <h3>{t("DIRECTORY.table.title")}</h3>
              <h4>{t("DIRECTORY.table.subtitle")+ " " + directoryName}</h4>
              <SortingTable
                hasSort={true}
                headers={directoriesHeaders}
                setDataList={setDirectoriesList}
                dataList={directoriesList}
                columnsOptions={columnsOptions}
                nextPage={nextPage}
                darkTheme={theme === "light" ? false : true}
                links={true}
                caption={t("DIRECTORY.table.subtitle")+ " " + directoryName}
                iconsAltTexts={[
                  t("DIRECTORY.table.stamp_bronze"),
                  t("DIRECTORY.table.stamp_silver"),
                  t("DIRECTORY.table.stamp_gold"),
                  t("DIRECTORY.table.declaration_not_conform"),
                  t("DIRECTORY.table.declaration_partial_conform"),
                  t("DIRECTORY.table.declaration_conform")
                ]}
                pagination={true}
                itemsPaginationText1={t("DIRECTORY.table.paginator.of")}
                itemsPaginationText2={t("DIRECTORY.table.paginator.items")}
                nItemsPerPageText1={t("DIRECTORY.table.paginator.see")}
                nItemsPerPageText2={t("DIRECTORY.table.paginator.per_page")}
                paginationButtonsTexts={[
                  t("DIRECTORY.table.paginator.first_page"),
                  t("DIRECTORY.table.paginator.previous_page"),
                  t("DIRECTORY.table.paginator.next_page"),
                  t("DIRECTORY.table.paginator.last_page")
                ]}
              />
              <span className="note">{t("DIRECTORIES.table.note")}</span>
          </div>
        </section>
      </div>
    </>
  );
}