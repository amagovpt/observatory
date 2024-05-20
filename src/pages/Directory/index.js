import "./styles.css";

import { Breadcrumb } from "../../components/index";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import moment from 'moment'
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import { StatisticsHeader } from "../../components/Molecules/StatisticsHeader";
import { SortingTable } from "../../components/Molecules/SortingTable";

import dataJSON from "../../utils/data.json"

export default function Directory() {

  const { t } = useTranslation();
  const location = useLocation();

  const dataProcess = location.state?.content || null;
  
  const directoriesHeaders = [
    [
      {icon: false, name: t("DIRECTORY.table.rank"), description: "", property: "rank", position: "left", justify: "", varType: "number", href: false},
      {icon: false, name: t("DIRECTORY.table.name"), description: "", property: "name", position: "left", justify: "", varType: "string", href: true},
      {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration", position: "", justify: "", varType: "number", href: false},
      {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp", position: "", justify: "", varType: "number", href: false},
      {icon: false, name: t("DIRECTORY.table.score"), description: "", property: "score", position: "", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORY.table.pages"), description: "", property: "nPages", position: "right", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORY.table.levels"), description: "", property: "", position: "right", justify: "justify-content-center", varType: "number", nCol: 3, href: false},
    ],
    [
      {icon: false, name: "", description: "", property: "", position: "", justify: "", varType: "", nCol: 6, href: false},
      {icon: false, name: t("DIRECTORY.table.A"), description: "", property: "A", position: "right", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORY.table.AA"), description: "", property: "AA", position: "right", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORY.table.AAA"), description: "", property: "AAA", position: "right", justify: "justify-content-center", varType: "number", href: false}
    ]
  ]

  const [directoriesList, setDirectoriesList] = useState();
  const [pages, setPages] = useState();
  const [directoriesStats, setDirectoriesStats] = useState();
  let statsTitles = [
    t("STATISTICS.entities"),
    t("STATISTICS.websites"),
    t("STATISTICS.pages")
  ]

  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_directory";

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    { title: t("HEADER.NAV.directories"), href: "/directory" },
    { title: dataProcess.name },
  ];

  useEffect(() => {
    const processData = () => {
        setDirectoriesStats({
            score: (dataProcess.score).toFixed(1),
            recentPage: dataProcess.recentPage,
            oldestPage: dataProcess.oldestPage,
            statsTable: [
                dataJSON.result.nEntities,
                dataJSON.result.nWebsites,
                dataJSON.result.nPages,
            ]
        })
        
        setDirectoriesList(dataProcess.websitesList)
        setPages(dataProcess.websites)
    }
    processData()
  }, [dataProcess])

  const nextPage = (id) => {
    // navigate(`/directory/${id}/${id}`, {state: {content: pages[id]}} )
  }

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} />
        </div>

        <div className="title_container">
            <div className="observatorio" lang="en">
                {t("DIRECTORY.title")}
            </div>
            <h1 className="page_title">{t("DIRECTORY.subtitle") + " " + dataProcess.name}</h1>
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
                moment={moment}
              />}
        </section>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
        >
            <div className="d-flex flex-column section_container">
                <h3>{t("DIRECTORY.table.title")}</h3>
                <h4>{t("DIRECTORY.table.subtitle")+ " " + dataProcess.name}</h4>
                <SortingTable
                  headers={directoriesHeaders}
                  setDataList={setDirectoriesList}
                  dataList={directoriesList}
                  nextPage={nextPage}
                  darkTheme={theme === "light" ? false : true}
                  pagination={true}
                  itemsPaginationText1={t("DIRECTORY.table.paginator.of")}
                  itemsPaginationText2={t("DIRECTORY.table.paginator.items")}
                  nItemsPerPageText1={t("DIRECTORY.table.paginator.see")}
                  nItemsPerPageText2={t("DIRECTORY.table.paginator.per_page")}
                />
                <span className="note">{t("DIRECTORIES.table.note")}</span>
            </div>
        </section>
      </div>
    </>
  );
}