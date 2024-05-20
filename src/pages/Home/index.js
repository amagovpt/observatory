import "./styles.css";

import { Breadcrumb } from "../../components/index";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import moment from 'moment'
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { StatisticsHeader } from "../../components/Molecules/StatisticsHeader";
import { SortingTable } from "../../components/Molecules/SortingTable";

import dataJSON from "../../utils/data.json"

export default function Home() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const searchTableHeaders = [
    {icon: false, name: t("DIRECTORIES.search.directory"), description: "", property: "diretorio", position: "left", justify: "", varType: "string", href: true},
    {icon: false, name: t("DIRECTORIES.search.website"), description: "", property: "sitio", position: "left", justify: "", varType: "string", href: true},
    {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaracao", position: "", justify: "", varType: "number", href: false},
    {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "selo", position: "", justify: "", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.search.score"), description: "", property: "pontuacao", position: "", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.search.n_pages"), description: "", property: "nPaginas", position: "right", justify: "justify-content-center", varType: "number", href: false},
  ]
  
  const otherDataRows = [
    {diretorio: "Municípios", sitio: "CM Oliveira do Hospital", declaracao: 3, selo: 1, pontuacao: 4.3, nPaginas: 199},
    {diretorio: "Organizações Não Governamentais", sitio: "AFUA", declaracao: 2, selo: 2, pontuacao: 6.3, nPaginas: 12},
    {diretorio: "Organizações Não Governamentais", sitio: "ARCIAL", declaracao: 1, selo: 3, pontuacao: 4.9, nPaginas: 1}
  ]
  
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

  const [directoriesList, setDirectoriesList] = useState();
  const [directories, setDirectories] = useState();
  const [directoriesStats, setDirectoriesStats] = useState();
  let statsTitles = [
    t("STATISTICS.directories"),
    t("STATISTICS.entities"),
    t("STATISTICS.websites"),
    t("STATISTICS.pages")
  ]

  const [otherData, setOtherData] = useState(otherDataRows);

  const [search, setSearch] = useState("");
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    { title: t("HEADER.NAV.directories"), href: "/directory" },
  ];

  useEffect(() => {
    const processData = () => {
      setDirectoriesStats({
        score: (dataJSON.result.score).toFixed(1),
        recentPage: dataJSON.result.recentPage,
        oldestPage: dataJSON.result.oldestPage,
        statsTable: [
          dataJSON.result.nDirectories,
          dataJSON.result.nEntities,
          dataJSON.result.nWebsites,
          dataJSON.result.nPages,
        ]
      })

      // Passar este List para dataList
      setDirectoriesList(dataJSON.result.directoriesList)
      setDirectories(dataJSON.result.directories)
    }
    processData()
  }, [])

  const nextPage = (id) => {
    navigate(`/directory/${id}`, {state: {content: directories[id]}} )
  }

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} />
        </div>

        <div className="title_container">
            <div className="observatorio" lang="en">
                {t("HEADER.NAV.observatory")}
            </div>
            <h1 className="page_title">{t("HEADER.NAV.directories")}</h1>
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
                <h3 className="table_title">{t("DIRECTORIES.table.title")}</h3>
                <SortingTable
                  headers={directoriesHeaders}
                  setDataList={setDirectoriesList}
                  dataList={directoriesList}
                  nextPage={nextPage}
                  darkTheme={theme === "light" ? false : true}
                  pagination={false}
                />
                <span className="note">{t("DIRECTORIES.table.note")}</span>
            </div>
        </section>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section`}
        >
            <div className="d-flex flex-column search_container">
                <form className="d-flex flex-column">
                    <label for="search">{t("DIRECTORIES.search.label")}</label>
                    <input type="text" id="search" placeholder={t("DIRECTORIES.search.placeholder")} value={search} onChange={(e) => setSearch(e.target.value)}/>
                </form>
                {search ? 
                    (search !== "no data" ? 
                        <SortingTable
                          headers={searchTableHeaders}
                          setDataList={setOtherData}
                          dataList={otherData}
                          nextPage={null}
                          darkTheme={theme === "light" ? false : true}
                          pagination={false}
                        />
                    :
                        <span className="no_data">{t("DIRECTORIES.search.no_results")}</span>
                    ) 
                : 
                    null
                }
            </div>
        </section>
      </div>
    </>
  );
}