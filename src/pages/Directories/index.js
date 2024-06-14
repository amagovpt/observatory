import "./styles.css";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Date formatting
import moment from 'moment'

// Dark / Light Theme Context
import { ThemeContext } from "../../context/ThemeContext";

// Components
import { StatisticsHeader, SortingTable, Breadcrumb } from "../../components/index";

// Extra Data / Functions
import { searchFuntion, getDirectoriesTable, checkIfAllOk } from "./utils"


export default function Directories() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_directories";

  // Navigation Parameters
  const dataProcess = location.state?.content || null;

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
    if(!checkIfAllOk(dataProcess)){
      navigate(`/error`)
    } else {
      const processData = async () => {
        setDirectoriesStats({
          score: (dataProcess.score).toFixed(1),
          recentPage: moment(dataProcess.recentPage).format("LL"),
          oldestPage: moment(dataProcess.oldestPage).format("LL"),
          statsTable: [
            dataProcess.nDirectories,
            dataProcess.nEntities,
            dataProcess.nWebsites,
            dataProcess.nPages,
          ]
        })

        setDirectoriesList(dataProcess.directoriesList)
      }
      processData()
    }
  }, [dataProcess, navigate])

  // Function when clicking the links in main table
  // row -> The row of the link clicked
  const nextPage = (row, key) => {
    if(row) {
      navigate(`/directories/${row["id"]}`, {state: {content: dataProcess, id: row["id"]}} )
    }
  }

  // Function when clicking the links in the search table
  // row -> The row of the link clicked
  // key -> The key of the column that was clicked
  const nextPageSearch = (row, key) => {
    if(key !== "directoryName") {
      navigate(`/directories/${row["directoryId"]}/${row["id"]}`, {state: {content: dataProcess, directoryId: row["directoryId"], websiteId: row["id"]}} )
    } else {
      navigate(`/directories/${row["directoryId"]}`, {state: {content: dataProcess, id: row["directoryId"]}} )
    }
  }

  return (
    <>
      <div className="container">
        <div className="py-5">
          <Breadcrumb data={breadcrumbs} darkTheme={theme === "light" ? false : true} />
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
              nextPage={nextPage}
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
              <input className="p-3 mb-3" type="text" id="search" placeholder={t("DIRECTORIES.search.placeholder")} value={search} onChange={(e) => searchFuntion(e.target.value, setSearch, setOtherData, dataProcess)}/>
            </form>
            {search && search.length >= 3 ? 
              (otherData ?
                <SortingTable
                  headers={searchTableHeaders}
                  columnsOptions={columnsOptionsSearch}
                  setDataList={setOtherData}
                  dataList={otherData}
                  nextPage={nextPageSearch}
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