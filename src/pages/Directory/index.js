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
import { getDirectoryTable, checkIfAllOk } from "./utils"


export default function Directory() {

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_directory";

  // Navigation Parameters
  const id = location.state?.id || null;
  const dataProcess = location.state?.content || null;

  // Data for the main table
  const [directoriesList, setDirectoriesList] = useState();
  const [directoryName, setDirectoryName] = useState()

  // Data for StatisticsHeader component
  const [directoriesStats, setDirectoriesStats] = useState();

  // Data and Options for the Tables on this page
  const { directoriesHeaders, columnsOptions, statsTitles, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText } = getDirectoryTable(t)

  // Navigation options
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
    if(!checkIfAllOk(id, dataProcess)){
      navigate(`/error`)
    } else {
      const processData = () => {
        const tempData = dataProcess.directories[id]
        setDirectoryName(dataProcess.directories[id].name)
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
    }
  }, [dataProcess, id, navigate])

  // Function when clicking the links in main table
  // row -> The row of the link clicked
  const nextPage = (row, key) => {
    if(row) {
      navigate(`/directories/${id}/${row["id"]}`, {state: {content: dataProcess, directoryId: id, websiteId: row["id"]}} )
    }
  }

  return (
    <>
      <div className="container">
        <div className="py-5">
          <Breadcrumb data={breadcrumbs} onClick={() => navigate(`/directories`, {state: {content: dataProcess}} )} />
        </div>

        <div className="title_container">
          <div className="ama-typography-body-large bold observatorio px-3">
            {t("DIRECTORY.title")}
          </div>
          <h2 className="bold my-2">{t("DIRECTORY.subtitle") + " " + directoryName}</h2>
        </div>

        {/* Statistics Header Component */}
        <section className={`bg-white ${main_content_home} d-flex flex-row justify-content-center align-items-center my-5`}>
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
              buttons={false}
            />}
        </section>

        {/* MAIN Directory TABLE */}
        <section className={`bg-white ${main_content_home} d-flex flex-row justify-content-center align-items-center my-5`}>
          <div className="d-flex flex-column section_container py-4">
            <h3 className="bold m-0">{t("DIRECTORIES.table.title")}</h3>
            <p className="ama-typography-body mb-4">{t("DIRECTORY.table.subtitle")+ " " + directoryName}</p>
            {directoriesList && <SortingTable
              hasSort={true}
              headers={directoriesHeaders}
              setDataList={setDirectoriesList}
              dataList={directoriesList}
              columnsOptions={columnsOptions}
              nextPage={nextPage}
              darkTheme={theme === "light" ? false : true}
              links={true}
              caption={t("DIRECTORY.table.subtitle")+ " " + directoryName}
              iconsAltTexts={nameOfIcons}
              pagination={true}
              itemsPaginationTexts={itemsPaginationText}
              nItemsPerPageTexts={nItemsPerPageText}
              paginationButtonsTexts={paginationButtonsTexts}
            />}
            <div className="ama-typography-body mt-4">{t("DIRECTORIES.table.note")}</div>
          </div>
        </section>
      </div>
    </>
  );
}