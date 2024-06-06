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
import { getDirectoryTable } from "./utils"


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
  const directoryName = dataProcess.directories[id].name

  // Data for the main table
  const [directoriesList, setDirectoriesList] = useState(dataProcess.directories[id].websitesList);

  // Data for StatisticsHeader component
  const [directoriesStats, setDirectoriesStats] = useState({
    score: (dataProcess.directories[id].score).toFixed(1),
    recentPage: moment(dataProcess.directories[id].recentPage).format("LL"),
    oldestPage: moment(dataProcess.directories[id].oldestPage).format("LL"),
    statsTable: [
      dataProcess.directories[id].nEntities,
      dataProcess.directories[id].nWebsites,
      dataProcess.directories[id].nPages,
    ]
  });

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
          <div className="observatorio px-3">
            {t("DIRECTORY.title")}
          </div>
          <h2 className="page_title my-2">{t("DIRECTORY.subtitle") + " " + directoryName}</h2>
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
          <div className="d-flex flex-column section_container p-3">
            <h3 className="table_title pb-0 m-0">{t("DIRECTORY.table.title")}</h3>
            <h4 className="mb-4">{t("DIRECTORY.table.subtitle")+ " " + directoryName}</h4>
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
              iconsAltTexts={nameOfIcons}
              pagination={true}
              itemsPaginationTexts={itemsPaginationText}
              nItemsPerPageTexts={nItemsPerPageText}
              paginationButtonsTexts={paginationButtonsTexts}
            />
            <span className="mt-4">{t("DIRECTORIES.table.note")}</span>
          </div>
        </section>
      </div>
    </>
  );
}