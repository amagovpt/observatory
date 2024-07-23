import "./styles.css";

// Api
import { getObservatoryData } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Date formatting
import moment from 'moment'

// Contexts
import { ThemeContext } from "../../context/ThemeContext";
import { DataContext } from "../../context/DataContext";

// Components
import { StatisticsHeader, SortingTable, Breadcrumb, LoadingComponent } from "ama-design-system";

// Extra Data / Functions
import { searchFuntion, getDirectoriesTable } from "./utils"

import { createStatisticsObject } from '../../utils/utils'

import { pathURL } from "../../App";


export default function Directories() {

  const { t, i18n: {language} } = useTranslation();
  const navigate = useNavigate();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_directories = theme === "light" ? "" : "main_content_directories";

  // Observatorio Data
  const { observatorioData, setObsData } = useContext(DataContext);

  // Search and data for the search table
  const [search, setSearch] = useState("");
  const [otherData, setOtherData] = useState(null);

  const [error, setError] = useState();

  // Data for the main table
  const [directoriesList, setDirectoriesList] = useState();

  // Data for StatisticsHeader component
  const [directoriesStats, setDirectoriesStats] = useState();

  // Data and Options for the Tables on this page
  const { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons } = getDirectoriesTable(t, navigate)

  // Loading
  const [loading, setLoading] = useState(true);
  
  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "", onClick: () => navigate(`${pathURL}`) },
    { title: t("HEADER.NAV.directories"), href: "", onClick: () => navigate(`${pathURL}directories`) },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)

      if(!observatorioData) {
        const {response, err} = await getObservatoryData();

        if(err && err.code) {
          setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
        } else {
          setObsData(response.data?.result)
          setDirectoriesStats(createStatisticsObject("directories", response.data?.result, moment))
          setDirectoriesList(response.data?.result.directoriesList)
        }

      } else {
        setDirectoriesStats(createStatisticsObject("directories", observatorioData, moment))
        setDirectoriesList(observatorioData.directoriesList)
      }
      setLoading(false)
    }
    processData()
  }, [])

  // useEffect to update the StatisticsHeader stats when language changes
  useEffect(() => {
    if(!observatorioData) return
    setDirectoriesStats(createStatisticsObject("directories", observatorioData, moment))
  }, [language])

  return (
    <>
      {!loading ? 
        !error ?
        <div className="container">
          <div className="link_breadcrumb_container py-5">
            <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("NAV.youAreHere")} />
          </div>

          <div className="title_container">
            <div className="ama-typography-body-large bold observatorio px-3">
                {t("HEADER.NAV.observatory")}
            </div>
            <h1 className="bold my-2">{t("HEADER.NAV.directories")}</h1>
          </div>

          {/* Statistics Header Component */}
          <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
            {directoriesStats && <StatisticsHeader
              darkTheme={theme}
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
          <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
            <div className="d-flex flex-column section_container py-4 m-0 directories_container">
              <h2 className="bold pb-3 m-0">{t("DIRECTORIES.table.title")}</h2>
              {directoriesList && <SortingTable
                darkTheme={theme}
                hasSort={true}
                headers={directoriesHeaders}
                setDataList={setDirectoriesList}
                dataList={directoriesList}
                pagination={false}
                caption={t("DIRECTORIES.table.title")}
                columnsOptions={columnsOptions}
                project={`${pathURL}`}
              />}
              <div className="ama-typography-body mt-4">{t("DIRECTORIES.table.note")}</div>
            </div>
          </section>

          {/* SEARCH TABLE */}
          <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center`}>
            <div className="d-flex flex-column search_container p-4 px-5">
              <form className="d-flex flex-column">
                <label htmlFor="search" className="ama-typography-body-large bold mb-2">{t("DIRECTORIES.search.label")}</label>
                <input className="p-3 mb-3" type="text" id="search" placeholder={t("DIRECTORIES.search.placeholder")} value={search} onChange={(e) => searchFuntion(e.target.value, setSearch, setOtherData, observatorioData)}/>
              </form>
              {search && search.length >= 3 ? 
                (otherData ?
                  <SortingTable
                    headers={searchTableHeaders}
                    columnsOptions={columnsOptionsSearch}
                    setDataList={setOtherData}
                    dataList={otherData}
                    darkTheme={theme}
                    pagination={false}
                    hasSort={true}
                    caption={t("DIRECTORY.table.subtitle")+ " "}
                    iconsAltTexts={nameOfIcons}
                    project={`${pathURL}`}
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
        : <section className={`${main_content_directories} d-flex flex-column align-items-center py-5 welcome_section`}>
            <h2 className="text-center w-50">{error}</h2>
          </section>
      : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </>
  );
}