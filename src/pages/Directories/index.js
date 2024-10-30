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

// Components
import { StatisticsHeader, SortingTable, Breadcrumb, LoadingComponent, Icon, Input } from "ama-design-system";

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

  // Search and data for the search table
  const [search, setSearch] = useState("");
  const [otherData, setOtherData] = useState(null);

  const [error, setError] = useState();

  const [parsedData, setParsedData] = useState();

  // Data for the main table
  const [directoriesList, setDirectoriesList] = useState([]);

  // Data for StatisticsHeader component
  const [directoriesStats, setDirectoriesStats] = useState({
    score: "0",
    recentPage: "",
    oldestPage: "",
    statsTable: [0, 0, 0, 0]
  });

  // Data and Options for the Tables on this page
  const { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons } = getDirectoriesTable(t)

  // Loading
  const [loading, setLoading] = useState(false);
  
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
      const {response, err} = await getObservatoryData();

      if(err && err.code) {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else {
        setDirectoriesStats(createStatisticsObject("directories", response.data?.result, moment))
        setDirectoriesList(response.data?.result.directoriesList)
        localStorage.setItem("observatorioData", JSON.stringify(response.data?.result));
      }
      setLoading(false)
    }

    const storedData = localStorage.getItem("observatorioData");
    if(!storedData) {
      processData()
    } else {
      const parsedData = JSON.parse(storedData)
      setParsedData(parsedData)
      setDirectoriesStats(createStatisticsObject("directories", parsedData, moment))
      setDirectoriesList(parsedData.directoriesList)
    }
  }, [])

  // useEffect to update the StatisticsHeader stats when language changes
  useEffect(() => {
    if(!parsedData) return
    setDirectoriesStats(createStatisticsObject("directories", parsedData, moment))
  }, [language])

  const handleSubmit = (event) => {
    event.preventDefault();
    setOtherData(searchFuntion(search, parsedData))
  }

  return (
    <>
      {!loading ? 
        !error ?
          <div className="container">
            <div className="link_breadcrumb_container py-5">
              <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.NAV.youAreHere")} />
            </div>

            <div className="title_container">
              <div className="ama-typography-body-large bold observatorio px-3">
                  {t("HEADER.NAV.observatory")}
              </div>
              <h1 className="bold my-2">{t("HEADER.NAV.directories")}</h1>
            </div>

            {/* Statistics Header Component */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <StatisticsHeader
                darkTheme={theme}
                stats={directoriesStats}
                statsTitles={statsTitles}
                title={t("DIRECTORIES.statistics_title")}
                subtitle={t("DIRECTORIES.statistics_subtitle")}
                oldestPage={t("STATISTICS.oldest_page_updated")}
                newestPage={t("STATISTICS.newest_page_updated")}
                gaugeTitle={[t("STATISTICS.gauge.label")]}
                gaugeDescription={t("STATISTICS.gauge.description", {value: directoriesStats.score})}
                buttons={false}
              />
            </section>

            {/* MAIN Directories TABLE */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 m-0 directories_container">
                <h2 className="bold pb-3 m-0">{t("DIRECTORIES.table.title")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={true}
                  headers={directoriesHeaders}
                  setDataList={setDirectoriesList}
                  dataList={directoriesList}
                  caption={t("DIRECTORIES.table.title")}
                  columnsOptions={columnsOptions}
                  project={`${pathURL}`}
                  pagination={false}
                />
                <div className="ama-typography-body mt-4">{t("DIRECTORIES.table.note")}</div>
              </div>
            </section>

            {/* SEARCH TABLE */}
            <section className={`search_container ${main_content_directories} d-flex flex-row justify-content-center align-items-center`}>
              <div className="d-flex flex-column section_container py-4">
                <form className="d-flex flex-row justify-content-between mb-4" onSubmit={handleSubmit}>
                  <Input
                    darkTheme={theme}
                    id="search"
                    label={t("DIRECTORIES.search.label")}
                    placeholder={t("DIRECTORIES.search.placeholder")}
                    type="text"
                    onChange={(e) => {
                      if(e.target.value.length === 0) {
                        setOtherData(null)
                      }
                      setSearch(e.target.value)
                    }}
                  />
                  <button type="submit" className="search_button ms-1" aria-label={t("DIRECTORIES.search.search")}>
                    <Icon name={"AMA-Pesquisar-Line"} />
                  </button>
                </form>
                {search && otherData &&
                  (otherData && otherData.length > 0 ?
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