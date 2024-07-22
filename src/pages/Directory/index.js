import "./styles.css";

// Api
import { getObservatoryData } from "../../config/api";

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
import { StatisticsHeader, SortingTable, Breadcrumb, LoadingComponent } from "ama-design-system";

// Extra Data / Functions
import { getDirectoryTable, checkIfDirectoryOk } from "./utils"

import { createStatisticsObject } from '../../utils/utils'


export default function Directory() {

  const { t, i18n: {language} } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_directory = theme === "light" ? "" : "main_content_directory";

  // Loading
  const [loading, setLoading] = useState(true);

  // Observatorio Data
  const { observatorioData, setObsData } = useContext(DataContext);

  // Navigation Parameters
  const id = Number(location.pathname.split("/")[2]) || null;

  // Data for the main table
  const [directoriesList, setDirectoriesList] = useState();
  const [directoryName, setDirectoryName] = useState()

  // Data for StatisticsHeader component
  const [directoryStats, setDirectoryStats] = useState();

  // Data and Options for the Tables on this page
  const { directoriesHeaders, columnsOptions, statsTitles, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText } = getDirectoryTable(t, id, navigate)

  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "", onClick: () => navigate("/") },
    { title: t("HEADER.NAV.directories"), href: "", onClick: () => navigate("/directories") },
    { title: directoryName },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      if(!observatorioData){
        
        const {response, err} = await getObservatoryData();

        if(err && err.code) {
          setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
        } else if(!checkIfDirectoryOk(id, response.data?.result)) {
          setError(t("MISC.directory_error"));
        } else {
          setObsData(response.data?.result)
          const tempData = response.data?.result.directories[id]
          setDirectoryName(tempData.name)
          setDirectoryStats(createStatisticsObject("directory", tempData, moment))
          setDirectoriesList(tempData.websitesList)
        }
      } else {
        const tempData = observatorioData.directories[id]
        setDirectoryName(observatorioData.directories[id].name)
        setDirectoryStats(createStatisticsObject("directory", tempData, moment))
        setDirectoriesList(tempData.websitesList)
      }
      setLoading(false)
    }
    processData()
  }, [])

  // useEffect to update the StatisticsHeader stats when language changes
  useEffect(() => {
    if(!observatorioData) return
    setDirectoryStats(createStatisticsObject("directory", observatorioData, moment))
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
                {t("DIRECTORY.title")}
              </div>
              <h1 className="bold my-2">{t("DIRECTORY.subtitle") + " " + directoryName}</h1>
            </div>

            {/* Statistics Header Component */}
            <section className={`bg-white ${main_content_directory} d-flex flex-row justify-content-center align-items-center my-5`}>
              {directoryStats && 
                <StatisticsHeader
                  darkTheme={theme}
                  stats={directoryStats}
                  statsTitles={statsTitles}
                  title={t("DIRECTORIES.statistics_title")}
                  subtitle={t("DIRECTORIES.statistics_subtitle")}
                  oldestPage={t("STATISTICS.oldest_page_updated")}
                  newestPage={t("STATISTICS.newest_page_updated")}
                  gaugeTitle={t("STATISTICS.gauge.label")}
                  buttons={false}
                />}
            </section>

            {/* MAIN Directory TABLE */}
            <section className={`bg-white ${main_content_directory} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold m-0">{t("DIRECTORIES.table.title")}</h2>
                <p className="ama-typography-body mb-4">{t("DIRECTORY.table.subtitle")+ " " + directoryName}</p>
                {directoriesList && <SortingTable
                  hasSort={true}
                  headers={directoriesHeaders}
                  setDataList={setDirectoriesList}
                  dataList={directoriesList}
                  columnsOptions={columnsOptions}
                  darkTheme={theme}
                  links={true}
                  caption={t("DIRECTORY.table.subtitle")+ " " + directoryName}
                  iconsAltTexts={nameOfIcons}
                  pagination={true}
                  itemsPaginationTexts={itemsPaginationText}
                  nItemsPerPageTexts={nItemsPerPageText}
                  paginationButtonsTexts={paginationButtonsTexts}
                  project={""}
                />}
                <div className="ama-typography-body mt-4">{t("DIRECTORIES.table.note")}</div>
              </div>
            </section>
          </div>
        : <section className={`${main_content_directory} d-flex flex-column align-items-center py-5 welcome_section`}>
            <h2 className="text-center w-50">{error}</h2>
          </section>
      : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </>
  );
}