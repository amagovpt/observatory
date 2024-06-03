import "./styles.css";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import moment from 'moment'

import { BarLineGraphTabs } from "./_components/barLineGraphTabs";
import { GoodBadTab } from "./_components/goodBadTab";
import { RadarGraph } from "./_components/radarGraph";

import { Breadcrumb, Tabs, StatisticsHeader } from "../../components/index";

export default function Directory() {

  const { t, i18n: { language } } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.directoryId || null;
  const sitioId = location.state?.websiteId || null;
  const dataProcess = location.state?.content || null;
  const directoryName = dataProcess.directories[id].name || ""
  const tempData = dataProcess.directories[id].websites[sitioId]

  const { theme } = useContext(ThemeContext);
  const main_content_website = theme === "light" ? "" : "main_content_website";

  const [data, setData] = useState([]);

  // Statistics for StatisticsHeader
  const [websiteStats, setWebsiteStats] = useState();

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "/" },
    { title: t("HEADER.NAV.directories"), href: "" },
    { title: directoryName, href: "" },
    { title: data.name },
  ];

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
          tempData={tempData.successDetailsTable}
          top10Data={tempData.bestPracticesDistribution}
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
          tempData={tempData.errorsDetailsTable}
          top10Data={tempData.errorsDistribution}
          color={"#e90018"}
          goodOrBad={"top_3_bad_practices"}
          title={t("WEBSITE.top_10_bad_practices_title")}
        />,
    },
  ];
  

  useEffect(() => {
    const processData = () => {
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
    processData()
  }, [dataProcess, id, sitioId, theme, language])

  const goBack = (item) => {
    if(item.title === directoryName) {
      navigate(`/directories/${id}`, {state: {content: dataProcess, id: id}} )
    } else {
      navigate(`/directories`, {state: {content: dataProcess}} )
    }
  }

  return (
    <>
      <div className="container website">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} onClick={(item) => goBack(item)}/>
        </div>

        <div className={`title_container ${main_content_website}`}>
            <div className="observatorio" lang="en">
                {directoryName}
            </div>
            <h2 className="page_title">{data.name}</h2>
            <h3><a href={data.startingUrl} >{data.startingUrl}</a></h3>
        </div>

        <section
          className={`bg-white ${main_content_website} d-flex flex-row section section_margin`}
        >
            {websiteStats && 
              <StatisticsHeader
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

        <section
          className={`bg-white ${main_content_website} d-flex flex-row section section_margin`}
        >
          <div className="d-flex flex-column section_container">
              <h3 className="table_title">{t("WEBSITE.accessibility_plot.title")}</h3>
              <div className="d-flex radar_graphic justify-content-center">
                <RadarGraph tempData={tempData} />
              </div>
            </div>
        </section>

        <section
          className={`bg-white ${main_content_website} d-flex flex-row section section_margin`}
        >
          <div className="d-flex flex-column section_container">
              <h3 className="table_title">{t("DIALOGS.scores.title")}</h3>
              <BarLineGraphTabs tempData={tempData} websiteStats={websiteStats} />
            </div>
        </section>

        <div className="good_bad">
          <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />
        </div>
      </div>
    </>
  );
}