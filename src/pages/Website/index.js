import "./styles.css";

// Api
import { getObservatoryData } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Contexts
import { ThemeContext } from "../../context/ThemeContext";

// Date formatting
import moment from 'moment'

// Components
import { BarLineGraphTabs } from "./_components/barLineGraphTabs";
import { GoodBadTab } from "./_components/goodBadTab";
import { RadarGraph } from "./_components/radarGraph";
import { Breadcrumb, Tabs, StatisticsHeader, LoadingComponent } from "ama-design-system";

// Extra Data / Functions
import { checkIfDirectoryOk, checkIfWebsiteOk } from "./utils"

import { createStatisticsObject } from '../../utils/utils'

import { pathURL } from "../../App";

export default function Website() {

  const { t, i18n: {language} } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_website = theme === "light" ? "" : "main_content_website";

  // Loading
  const [loading, setLoading] = useState(false);

  const [parsedData, setParsedData] = useState();

  // Navigation Parameters
  const splitLocation = location.pathname.split("/")
  const id = Number(splitLocation[splitLocation.length-2]) || null;
  const sitioId = Number(splitLocation[splitLocation.length-1]) || null;

  // General Data
  const [data, setData] = useState({
    name: "Unknown",
    startingUrl: "Unknown",
    accessibilityPlotData: [],
    scoreDistributionFrequency: [],
    nPages: 0,
    successDetailsTable: {
      practicesKeys: [],
      practicesData: []
    },
    bestPracticesDistribution: [],
    errorsDetailsTable: {
      practicesKeys: [],
      practicesData: []
    },
    errorsDistribution: []
  });

  const [directoryName, setDirectoryName] = useState("Unknown")

  // Statistics for StatisticsHeader
  const [websiteStats, setWebsiteStats] = useState({
    score: "0",
    recentPage: "",
    oldestPage: "",
    statsTable: [0, 0, 0, 0, 0, 0]
  });

  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "", onClick: () => navigate(`${pathURL}`) },
    { title: t("HEADER.NAV.directories"), href: "", onClick: () => navigate(`${pathURL}directories`) },
    { title: directoryName, href: "", onClick: () => navigate(`${pathURL}directories/${id}`) },
    { title: data && data.name },
  ];

  // Texts for StatisticsHeader component
  let statsTitles = [
    {subtitle: t("STATISTICS.pages"), subtitle2: ""},
    {subtitle: t("STATISTICS.pages_without_errors"), subtitle2: ""},
    {subtitle: t("STATISTICS.pages_with_errors"), subtitle2: ""},
    {subtitle: t("STATISTICS.pages_without_errors_a_info"), subtitle2: t("STATISTICS.pages_without_errors_a")},
    {subtitle: t("STATISTICS.pages_without_errors_a_aa_info"), subtitle2: t("STATISTICS.pages_without_errors_a_aa")},
    {subtitle: t("STATISTICS.pages_without_errors_a_aa_aaa_info"), subtitle2: t("STATISTICS.pages_without_errors_a_aa_aaa")}
  ]

  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("WEBSITE.tabs.best_practices"),
      component:
        <GoodBadTab 
          main_content_website={main_content_website}
          tempData={data && data.successDetailsTable}
          top10Data={data && data.bestPracticesDistribution}
          color={"#15ac51"}
          goodOrBad={"top_3_best_practices"}
          title={t("WEBSITE.top_10_best_practices_title")}
        />,
    },
    {
      eventKey: "tab2",
      title: t("WEBSITE.tabs.bad_practices"),
      component:
        <GoodBadTab
          main_content_website={main_content_website}
          tempData={data && data.errorsDetailsTable}
          top10Data={data && data.errorsDistribution}
          color={"#e90018"}
          goodOrBad={"top_3_bad_practices"}
          title={t("WEBSITE.top_10_bad_practices_title")}
        />,
    },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      const {response, err} = await getObservatoryData();

      if(err && err.code) {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if(!checkIfDirectoryOk(id, response.data?.result)) {
        setError(t("MISC.directory_error"));
      } else if(!checkIfWebsiteOk(id, sitioId, response.data?.result)) {
        setError(t("MISC.website_error"));
      } else {
        localStorage.setItem("observatorioData", JSON.stringify(response.data?.result));
        const tempData = response.data?.result.directories[id]
        setDirectoryName(tempData.name)
        const tempData2 = tempData.websites[sitioId]
        setData(tempData2)
        setWebsiteStats(createStatisticsObject("website", tempData2, moment))
      }
      setLoading(false)
    }

    const storedData = localStorage.getItem("observatorioData");
    if(!storedData) {
      processData()
    } else {
      const parsedData = JSON.parse(storedData)
      setParsedData(parsedData)
      setDirectoryName(parsedData.directories[id].name)
      const tempData = parsedData.directories[id].websites[sitioId]
      setData(tempData)
      setWebsiteStats(createStatisticsObject("website", tempData, moment))
    }
  }, [])

  // useEffect to update the StatisticsHeader stats when language changes
  useEffect(() => {
    if(!parsedData) return
    setWebsiteStats(createStatisticsObject("website", parsedData.directories[id].websites[sitioId], moment))
  }, [language])

  return (
    <>
      {!loading ? 
        !error ?
          <div className="container website">
            <div className="link_breadcrumb_container py-5">
              <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.NAV.youAreHere")} />
            </div>

            <div className={`title_container ${main_content_website}`}>
              <div className="ama-typography-body-large bold observatorio px-3 mb-2">
                {directoryName}
              </div>
              <h1 className="bold my-2">{data && data.name}</h1>
              <h2><a className="ama-typography-action-large bold" href={data && data.startingUrl} >{data && data.startingUrl}</a></h2>
            </div>

            {/* Statistics Header Component */}
            <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center my-5`}>
              <StatisticsHeader
                darkTheme={theme}
                stats={websiteStats}
                statsTitles={statsTitles}
                doubleRow={true}
                title={t("DIRECTORIES.statistics_title")}
                subtitle={t("DIRECTORIES.statistics_subtitle")}
                oldestPage={t("STATISTICS.oldest_page_updated")}
                newestPage={t("STATISTICS.newest_page_updated")}
                gaugeTitle={t("STATISTICS.gauge.label")}
                buttons={false}
              />
            </section>

            {/* Radar Graph */}
            <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4">
                <h2 className="bold">{t("WEBSITE.accessibility_plot.title")}</h2>
                <div className="d-flex radar_graphic justify-content-center">
                  <RadarGraph tempData={data} />
                </div>
              </div>
            </section>

            {/* Bar+Line Graph */}
            <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4">
                <h2 className="bold mb-3">{t("DIALOGS.scores.title")}</h2>
                <BarLineGraphTabs tempData={data} websiteStats={websiteStats} />
              </div>
            </section>

            {/* Good / Bad section */}
            <div className="good_bad">
              <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />
            </div>
          </div>
        : <section className={`${main_content_website} d-flex flex-column align-items-center py-5 welcome_section`}>
            <h2 className="text-center w-50">{error}</h2>
          </section>
      : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </>
  );
}