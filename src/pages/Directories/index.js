import "./styles.css";

// Api
import { api } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Date formatting
import moment from 'moment'

// Contexts
import { ThemeContext } from "../../context/ThemeContext";
import { DataContext } from "../../context/DataContext";

// Components
import { StatisticsHeader, SortingTable, Breadcrumb } from "../../components/index";

// Extra Data / Functions
import { searchFuntion, getDirectoriesTable } from "./utils"

//import dataJSON from "../../utils/data.json"


export default function Directories() {

  const { t } = useTranslation();
  const navigate = useNavigate();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_directories";

  // Observatorio Data
  const { observatorioData, setObsData } = useContext(DataContext);

  // Search and data for the search table
  const [search, setSearch] = useState("");
  const [otherData, setOtherData] = useState(null);

  // Data for the main table
  const [directoriesList, setDirectoriesList] = useState();

  // Data for StatisticsHeader component
  const [directoriesStats, setDirectoriesStats] = useState();

  // Data and Options for the Tables on this page
  const { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons } = getDirectoriesTable(t)
  
  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "/" },
    { title: t("HEADER.NAV.directories"), href: "/directories" },
  ];

  useEffect(() => {
    const processData = async () => {
      if(!observatorioData){
        const response = await api.get("/observatory")
        setObsData(response.data?.result)
        setDirectoriesStats({
          score: (response.data?.result.score).toFixed(1),
          recentPage: moment(response.data?.result.recentPage).format("LL"),
          oldestPage: moment(response.data?.result.oldestPage).format("LL"),
          statsTable: [
            response.data?.result.nDirectories,
            response.data?.result.nEntities,
            response.data?.result.nWebsites,
            response.data?.result.nPages,
          ]
        })
        setDirectoriesList(response.data?.result.directoriesList)
        // setObsData(dataJSON.result)
      } else {
        setDirectoriesStats({
          score: (observatorioData.score).toFixed(1),
          recentPage: moment(observatorioData.recentPage).format("LL"),
          oldestPage: moment(observatorioData.oldestPage).format("LL"),
          statsTable: [
            observatorioData.nDirectories,
            observatorioData.nEntities,
            observatorioData.nWebsites,
            observatorioData.nPages,
          ]
        })
        setDirectoriesList(observatorioData.directoriesList)
      }
    }
    processData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="py-5">
          <Breadcrumb data={breadcrumbs} darkTheme={theme === "light" ? false : true} tagHere={t("NAV.youAreHere")} />
        </div>

        <div className="title_container">
          <div className="ama-typography-body-large bold observatorio px-3">
              {t("HEADER.NAV.observatory")}
          </div>
          <h2 className="bold my-2">{t("HEADER.NAV.directories")}</h2>
        </div>

        {/* Statistics Header Component */}
        <section className={`bg-white ${main_content_home} d-flex flex-row justify-content-center align-items-center my-5`}>
          {directoriesStats && <StatisticsHeader
            darkTheme={theme === "light" ? false : true}
            stats={directoriesStats}
            statsTitles={statsTitles}
            title={t("DIRECTORIES.statistics_title")}
            subtitle={t("DIRECTORIES.statistics_subtitle")}
            oldestPage={t("STATISTICS.oldest_page_updated")}
            newestPage={t("STATISTICS.newest_page_updated")}
            gaugeTitle={t("STATISTICS.gauge.label")}
            buttons={false}
          />}
        </section>

        {/* MAIN Directories TABLE */}
        <section className={`bg-white ${main_content_home} d-flex flex-row justify-content-center align-items-center my-5`}>
          <div className="d-flex flex-column section_container py-4 m-0">
            <h3 className="bold pb-3 m-0">{t("DIRECTORIES.table.title")}</h3>
            {directoriesList && <SortingTable
              hasSort={true}
              headers={directoriesHeaders}
              setDataList={setDirectoriesList}
              dataList={directoriesList}
              darkTheme={theme === "light" ? false : true}
              pagination={false}
              caption={t("DIRECTORIES.table.title")}
              columnsOptions={columnsOptions}
            />}
            <div className="ama-typography-body mt-4">{t("DIRECTORIES.table.note")}</div>
          </div>
        </section>

        {/* SEARCH TABLE */}
        <section className={`bg-white ${main_content_home} d-flex flex-row justify-content-center align-items-center`}>
          <div className="d-flex flex-column search_container p-4 px-5">
            <form className="d-flex flex-column">
              <label className="ama-typography-body-large bold mb-2">{t("DIRECTORIES.search.label")}</label>
              <input className="p-3 mb-3" type="text" id="search" placeholder={t("DIRECTORIES.search.placeholder")} value={search} onChange={(e) => searchFuntion(e.target.value, setSearch, setOtherData, observatorioData)}/>
            </form>
            {search && search.length >= 3 ? 
              (otherData ?
                <SortingTable
                  headers={searchTableHeaders}
                  columnsOptions={columnsOptionsSearch}
                  setDataList={setOtherData}
                  dataList={otherData}
                  darkTheme={theme === "light" ? false : true}
                  pagination={false}
                  hasSort={true}
                  caption={t("DIRECTORY.table.subtitle")+ " "}
                  iconsAltTexts={nameOfIcons}
                />
              :
                <div className="ama-typography-body-large">{t("DIRECTORIES.search.no_results")}</div>
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