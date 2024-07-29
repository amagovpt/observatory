import "./styles.css";

// Api
import { getObservatoryData } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Contexts
import { ThemeContext } from "../../context/ThemeContext";

// Date formatting
import moment from 'moment'

// Components
import { Button, Icon, StatisticsHeader, LoadingComponent } from "ama-design-system"
import { Top5_Practices } from "./_components/top5_practices";
import { AchievementPerType } from "./_components/achievementPerType"
import { ObservatoryInfoTabs } from "./_components/observatoryInfoTabs";

import { createStatisticsObject } from '../../utils/utils'

import { pathURL } from "../../App";

export default function Home() {

  const { t, i18n: {language} } = useTranslation();
  const navigate = useNavigate();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";

  const [error, setError] = useState();
  
  // Loading
  const [loading, setLoading] = useState(true);

  const [parsedData, setParsedData] = useState();

  // Data for StatisticsHeader component
  const [directoriesStats, setDirectoriesStats] = useState(null);

  let statsTitles = [
    t("STATISTICS.directories"),
    t("STATISTICS.entities"),
    t("STATISTICS.websites"),
    t("STATISTICS.pages")
  ]

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      const {response, err} = await getObservatoryData();

      if(err && err.code) {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else {
        setDirectoriesStats(createStatisticsObject("home", response.data?.result, moment))
        localStorage.setItem("observatorioData", JSON.stringify(response.data?.result));
        setParsedData(response.data?.result)
      }
      setLoading(false)
    }
    processData()
  }, [])

  // useEffect to update the StatisticsHeader stats when language changes
  useEffect(() => {
    const storedData = localStorage.getItem("observatorioData");
    if(!storedData) return;
    setParsedData(JSON.parse(storedData))
    setDirectoriesStats(createStatisticsObject("home", JSON.parse(storedData), moment))
  }, [language])

  // Data for the censos section
  const censosDataIndividual = (icon, number, spans) => {
    return (
      <div className="d-flex flex-column align-items-center text-center censos_column">
        <Icon name={icon} />
        <span className="ama-typography-display-6 bold mt-2">{number}</span>
        <span className="ama-typography-body bold">{spans[0]}<br/>{spans[1]}<br/>{spans[2]}</span>
      </div>
    )
  }

  return (
    <>
    {!loading ? 
      !error ? 
        <>
        <section className={`bg-white ${main_content_home} d-flex flex-column align-items-center py-6 welcome_section`}>
          <div className="container welcome_container mb-4">
            <h2 className="mb-2">{t("HEADER.welcome.title")}</h2>
            <h3>{t("HEADER.welcome.subtitle")}</h3>
          </div>
        </section>
        
        <div className="container">
          {/* Statistics Header Component */}
          <h2 className="mt-6 bold">{t("HOME.summary.statistics_title")}</h2>
          <section className={`bg-white ${main_content_home} d-flex flex-row justify-content-center align-items-center my-4 section_statistics`}>
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

          {/* Top 5 websites section */}
          <section className={`${main_content_home} d-flex justify-content-center align-items-center my-6 top5_websites`}>
            <div className="flex-1 top5_div">
              <h2 className="bold mb-2">{t("HOME.top5.title")}</h2>
              <div className="ama-typography-body">{t("HOME.top5.last_updated") + " " + directoriesStats.recentPage}</div>
              <p className="ama-typography-body mt-2">{t("HOME.top5.paragraph.part1")+ " " +t("HOME.top5.paragraph.part2")+ " " +t("HOME.top5.paragraph.part3")}</p>
              <Button
                text={t("HOME.top5.button")}
                size="lg"
                id="btn-url"
                onClick={() => navigate(`${pathURL}directories`)}
              />
            </div>
            <div className="flex-1 top5_div">
              <ul>
                {parsedData.topFiveWebsites.map((website) => (
                  <li className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex flex-row align-items-center">
                      <span className="ama-typography-body top5_number me-3">{website.index}</span>
                      <a href="" className="top5_link ama-typography-body-large bold" onClick={() => navigate(`${pathURL}directories/${website.DirectoryId}/${website.id}`)}>{website.name}</a>
                    </div>
                    <span className="ama-typography-body-large bold">{(website.score).toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className={`bg-white ${main_content_home} d-flex flex-column section last_section pt-6`}>
          <div className="container">
            {/* Declarations data */}
            <h2 className="bold">{t("NUMBERS.declaration.title")}</h2>
            <p className="ama-typography-body-large">{t("NUMBERS.declaration.paragraph")}</p>
            <AchievementPerType data={parsedData} type={"declarations"} good={"conform"} semi={"partial"} bad={"not_conform"}
              title={t("NUMBERS.declaration.subtitle1")}
              icon={"AMA-Declaracao-Line"}
              colors={{good: "green", semi: "yellow", bad: "red"}}
              colorTitle={{good: t("NUMBERS.declaration.conform"), semi: t("NUMBERS.declaration.partial"), bad: t("NUMBERS.declaration.non_conform")}}
              colorRGB={{good: "rgb(21, 172, 81)", semi: "rgb(243, 214, 9)", bad: "rgb(233, 0, 24)"}}
              translationType={"declaration"}
            />

            {/* Badges data */}
            <h2 className="bold">{t("NUMBERS.badge.title")}</h2>
            <p className="ama-typography-body-large">{t("NUMBERS.badge.paragraph")}</p>
            <AchievementPerType data={parsedData} type={"badges"} good={"gold"} semi={"silver"} bad={"bronze"}
              title={t("NUMBERS.badge.subtitle1")}
              icon={"AMA-SeloDark2-Line"}
              colors={{good: "gold", semi: "silver", bad: "bronze"}}
              colorTitle={{good: t("NUMBERS.badge.gold"), semi: t("NUMBERS.badge.silver"), bad: t("NUMBERS.badge.bronze")}}
              colorRGB={{good: "rgb(168, 125, 0)", semi: "rgb(117, 121, 123)", bad: "rgb(188, 116, 72)"}}
              translationType={"badge"}
            />

            {/* Observatory Information Tabs */}
            <div className="tabs-grid my-6">
              <ObservatoryInfoTabs />
            </div>

            {/* Censos Data */}
            <div className="censos_container p-6">
              <div className="d-flex flex-row align-items-center justify-content-between mb-2 mobile">
                <h2 className="bold">{t("HOME.4all.title")}</h2>
                <span className="ama-typography-body">{t("HOME.4all.census")}</span>
              </div>
              <p className="ama-typography-body mb-4">{t("HOME.4all.paragraph.part1")}<br/>{t("HOME.4all.paragraph.part2")}</p>
              <div className="d-flex justify-content-between">
                {censosDataIndividual("AMA-BracoPartido-Line", "1 085 472", [t("HOME.4all.disabilities._1.part1"), t("HOME.4all.disabilities._1.part2"), t("HOME.4all.disabilities._1.part3")])}

                {censosDataIndividual("AMA-CadeiraRodasPC-Line", "10,9%", [t("HOME.4all.disabilities._2.part1"), t("HOME.4all.disabilities._2.part2"), t("HOME.4all.disabilities._2.part3")])}

                {censosDataIndividual("AMA-Braille-Line", "62,4%", [t("HOME.4all.disabilities._3.part1"), t("HOME.4all.disabilities._3.part2"), t("HOME.4all.disabilities._3.part3")])}

                {censosDataIndividual("AMA-Idoso-Line", "78,7%", [t("HOME.4all.disabilities._4.part1"), t("HOME.4all.disabilities._4.part2"), t("HOME.4all.disabilities._4.part3")])}
              </div>
            </div>
           
            {/* Top 5 Good and Bad Practices */}
            <div className="d-flex my-6 top5_best_good">
              <Top5_Practices data={parsedData.topFiveBestPractices} title={t("HOME.summary.best_practices_title")} icon={"AMA-Check-Line"} />
              <Top5_Practices data={parsedData.topFiveErrors} title={t("HOME.summary.errors_title")} icon={"AMA-Wrong-Line"} />
            </div>
          </div>
        </section>
      </>
      : <section className={`${main_content_home} d-flex flex-column align-items-center py-6 welcome_section`}>
          <h2 className="text-center w-50">{error}</h2>
        </section>
    : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </>
  );
}