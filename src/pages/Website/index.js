import "./styles.css";

// Api
import { api } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Contexts
import { ThemeContext } from "../../context/ThemeContext";
import { DataContext } from "../../context/DataContext";

// Date formatting
import moment from 'moment'

// Components
import { BarLineGraphTabs } from "./_components/barLineGraphTabs";
import { GoodBadTab } from "./_components/goodBadTab";
import { RadarGraph } from "./_components/radarGraph";
import { Breadcrumb, Tabs, StatisticsHeader, LoadingComponent } from "../../components/index";

// Extra Data / Functions
import { checkIfAllOk } from "./utils"

import dataJSON from "../../utils/data.json"


export default function Directory() {

  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_website = theme === "light" ? "" : "main_content_website";

  // Loading
  const [loading, setLoading] = useState(true);

  // Observatorio Data
  const { observatorioData, setObsData } = useContext(DataContext);

  // Navigation Parameters
  const id = Number(location.pathname.split("/")[2]) || null;
  const sitioId = Number(location.pathname.split("/")[3]) || null;

  // General Data
  const [data, setData] = useState(null);
  const [directoryName, setDirectoryName] = useState()

  // Statistics for StatisticsHeader
  const [websiteStats, setWebsiteStats] = useState();

  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "/" },
    { title: t("HEADER.NAV.directories"), href: "/directories" },
    { title: directoryName, href: `/directories/${id}` },
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
      if(!observatorioData){
        // const response = await api.get("/observatory")
        // setObsData(response.data?.result)
        // if(!checkIfAllOk(id, sitioId, response.data?.result)) navigate("/error")
        // const tempData = response.data?.result.directories[id]
        
        setObsData(dataJSON.result)
        if(!checkIfAllOk(id, sitioId, dataJSON.result)) navigate("/error")
        const tempData = dataJSON.result.directories[id]

        setDirectoryName(tempData.name)
        setData(tempData.websites[sitioId])
        setWebsiteStats({
          score: (tempData.websites[sitioId].score).toFixed(1),
          recentPage: moment(tempData.websites[sitioId].recentPage).format("LL"),
          oldestPage: moment(tempData.websites[sitioId].oldestPage).format("LL"),
          statsTable: [
            tempData.websites[sitioId].nPages,
            tempData.websites[sitioId].pagesWithoutErrors,
            tempData.websites[sitioId].pagesWithErrors,
            tempData.websites[sitioId].pagesWithoutErrorsA,
            tempData.websites[sitioId].pagesWithoutErrorsAA,
            tempData.websites[sitioId].pagesWithoutErrorsAAA
          ]
        })
      } else {
        setDirectoryName(observatorioData.directories[id].name)
        const tempData = observatorioData.directories[id].websites[sitioId]
        setData(tempData)
        setWebsiteStats({
          score: (tempData.score).toFixed(1),
          recentPage: moment(tempData.recentPage).format("LL"),
          oldestPage: moment(tempData.oldestPage).format("LL"),
          statsTable: [
            tempData.nPages,
            tempData.pagesWithoutErrors,
            tempData.pagesWithErrors,
            tempData.pagesWithoutErrorsA,
            tempData.pagesWithoutErrorsAA,
            tempData.pagesWithoutErrorsAAA
          ]
        })
      }
      setLoading(false)
    }
    processData()
  }, [id, sitioId])

  return (
    <>
      {!loading ? 
        <div className="container website">
          <div className="py-5">
            <Breadcrumb data={breadcrumbs} darkTheme={theme === "light" ? false : true} tagHere={t("NAV.youAreHere")} />
          </div>

          <div className={`title_container ${main_content_website}`}>
            <div className="ama-typography-body-large bold observatorio px-3 mb-2">
              {directoryName}
            </div>
            <h2 className="bold my-2">{data && data.name}</h2>
            <h3><a className="ama-typography-action-large bold" href={data && data.startingUrl} >{data && data.startingUrl}</a></h3>
          </div>

          {/* Statistics Header Component */}
          <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center my-5`}>
            {websiteStats && <StatisticsHeader
              darkTheme={theme === "light" ? false : true}
              stats={websiteStats}
              statsTitles={statsTitles}
              doubleRow={true}
              title={t("DIRECTORIES.statistics_title")}
              subtitle={t("DIRECTORIES.statistics_subtitle")}
              oldestPage={t("STATISTICS.oldest_page_updated")}
              newestPage={t("STATISTICS.newest_page_updated")}
              gaugeTitle={t("STATISTICS.gauge.label")}
              buttons={false}
            />}
          </section>

          {/* Radar Graph */}
          <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center my-5`}>
            <div className="d-flex flex-column section_container py-4">
              <h3 className="bold">{t("WEBSITE.accessibility_plot.title")}</h3>
              <div className="d-flex radar_graphic justify-content-center">
                {data && <RadarGraph tempData={data} />}
              </div>
            </div>
          </section>

          {/* Bar+Line Graph */}
          <section className={`bg-white ${main_content_website} d-flex flex-row justify-content-center align-items-center my-5`}>
            <div className="d-flex flex-column section_container py-4">
              <h3 className="bold mb-3">{t("DIALOGS.scores.title")}</h3>
              {data && <BarLineGraphTabs tempData={data} websiteStats={websiteStats} />}
            </div>
          </section>

          {/* Good / Bad section */}
          <div className="good_bad">
            {data && <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />}
          </div>
        </div>
      : <LoadingComponent />}
    </>
  );
}