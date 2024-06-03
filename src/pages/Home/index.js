import "./styles.css";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

import { StatisticsHeader } from "../../components/Molecules/StatisticsHeader";
import { Button, Tabs, Icon } from "../../components/index"

import dataJSON from "../../utils/data.json"

export default function Home() {

  const { t, i18n: {language} } = useTranslation();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [directoriesStats, setDirectoriesStats] = useState(null);
  const [data, setData] = useState(null);
  
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      setData(dataJSON.result)
      setDirectoriesStats({
        score: (dataJSON.result.score).toFixed(1),
        recentPage: moment(dataJSON.result.recentPage).format("LL"),
        oldestPage: moment(dataJSON.result.oldestPage).format("LL"),
        statsTable: [
          dataJSON.result.nDirectories,
          dataJSON.result.nEntities,
          dataJSON.result.nWebsites,
          dataJSON.result.nPages,
        ]
      })

      setLoading(false)
    }
    processData()
  }, [language])

  let statsTitles = [
    t("STATISTICS.directories"),
    t("STATISTICS.entities"),
    t("STATISTICS.websites"),
    t("STATISTICS.pages")
  ]

  const tab = (title, paragraph, bullet1, bullet2, bullet3) => {
    return (
      <div className="tabs_info_container">
        <h2>{title}</h2>
        <p>{paragraph}</p>
        <ul>
          <li>
            <Icon name="AMA-Ponto-Solid" />
            <span>{bullet1}</span>
          </li>
          <li>
            <Icon name="AMA-Ponto-Solid" />
            <span>{bullet2}</span>
          </li>
          <li>
            <Icon name="AMA-Ponto-Solid" />
            <span>{bullet3}</span>
          </li>
        </ul>
      </div>
    )
  }

  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("HOME.tabs._1.title"),
      component: tab(t("HOME.tabs._1.title"), t("HOME.tabs._1.paragraph"), t("HOME.tabs._1.bullet1"), t("HOME.tabs._1.bullet2"), t("HOME.tabs._1.bullet3")),
    },
    {
      eventKey: "tab2",
      title: t("HOME.tabs._2.title"),
      component: tab(t("HOME.tabs._2.title"), t("HOME.tabs._2.paragraph"), t("HOME.tabs._2.bullet1"), t("HOME.tabs._2.bullet2"), t("HOME.tabs._2.bullet3")),
    },
    {
      eventKey: "tab3",
      title: t("HOME.tabs._3.title"),
      component: tab(t("HOME.tabs._3.title"), t("HOME.tabs._3.paragraph"), t("HOME.tabs._3.bullet1"), t("HOME.tabs._3.bullet2"), t("HOME.tabs._3.bullet3")),
    },
  ];

  const nextPage = () => {
    navigate(`/directories`, {state: {content: data}})
  }

  const goToWebsite = (id, websiteId) => {
    navigate(`/directories/${id}/${websiteId}`, {state: {content: data, directoryId: id, websiteId: websiteId}} )
  }

  return (
    <>
    {!loading ? 
      <>
        <section className={`bg-white ${main_content_home} d-flex flex-column align-items-center py-5 welcome_section`}>
          <div className="welcome_container">
            <h2 className="mb-2">{t("HEADER.welcome.title")}</h2>
            <h3>{t("HEADER.welcome.subtitle")}</h3>
          </div>
        </section>
        
        <div className="container">
          <h2 className="mt-5">{t("HOME.summary.statistics_title")}</h2>
          <section
            className={`bg-white ${main_content_home} d-flex flex-row section my-5 section_statistics`}
          >
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

          <section className={`${main_content_home} d-flex flex-row section my-5 align-items-start top5_websites`}>
            <div className="flex-1 top5_div">
              <h2>{t("HOME.top5.title")}</h2>
              <span>{t("HOME.top5.last_updated") + " " + directoriesStats.recentPage}</span>
              <p className="mt-2 mb-4">{t("HOME.top5.paragraph.part1")+ " " +t("HOME.top5.paragraph.part2")+ " " +t("HOME.top5.paragraph.part3")}</p>
              <Button
                text={t("HOME.top5.button")}
                size="lg"
                id="btn-url"
                onClick={nextPage}
              />
            </div>
            <div className="flex-1 top5_div">
              <ul>
                {data.topFiveWebsites.map((website) => (
                  <li className="top5_li mb-2">
                    <div className="d-flex flex-row  align-items-center">
                      <span className="top5_number pt-1 me-3">{website.index}</span>
                      <span className="top5_link" onClick={() => goToWebsite(website.DirectoryId, website.id)}>{website.name}</span>
                    </div>
                    <span className="top5_score">{(website.score).toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className={`bg-white ${main_content_home} d-flex flex-column section last_section pt-5`}>
          <div className="container">
            <h2>{t("NUMBERS.badge.title")}</h2>
            <h3>{t("NUMBERS.badge.paragraph")}</h3>

            <div className="grey_container p-5 mb-5 mt-4">
              <div className="group_container pb-5">
                <div className="first_column">
                  <span className="subtitle smaller mb-3">{t("NUMBERS.declaration.subtitle1")}</span>
                  <div className="icon">
                    <span className="subtitle mb-3 me-2">{data.declarations.total.websites.conform + data.declarations.total.websites.partial + data.declarations.total.websites.not_conform + data.declarations.total.apps.conform + data.declarations.total.apps.partial + data.declarations.total.apps.not_conform}</span>
                    <Icon name="AMA-Declaracao-Line" />
                  </div>
                  <span>{"+ " + Number(data.declarations.currentYear.websites.conform + data.declarations.currentYear.websites.partial + data.declarations.currentYear.websites.not_conform + data.declarations.currentYear.apps.conform + data.declarations.currentYear.apps.partial + data.declarations.currentYear.apps.not_conform) + " " + t("NUMBERS.last_year")}</span>
                </div>
                <div className="second_column">
                  <div className="d-flex mb-5 w-100 row_st_dc">
                    <span className="quantity">{data.declarations.total.websites.conform+data.declarations.total.apps.conform}</span>
                    <div className="ps-2 green conform_container">
                      <span className="type">{t("NUMBERS.declaration.conform")}</span>
                      <span>{"+ " + Number(data.declarations.currentYear.websites.conform+data.declarations.currentYear.apps.conform) + " " + t("NUMBERS.last_year")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center ps-2">
                      <div className="d-flex flex-row">
                        <span className="mb-2" style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(21, 172, 81), rgb(21, 172, 81) 69.4737%, rgb(220, 220, 219) 69.4737%, rgb(220, 220, 219) 30.5263%)"}}></span>
                        <span className="ps-3 opacity-50">Total</span>
                      </div>
                      <div className="d-flex flex-row">
                        <span style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(21, 172, 81), rgb(21, 172, 81) 9.12281%, rgb(220, 220, 219) 9.12281%, rgb(220, 220, 219) 90.8772%)"}}></span>
                        <span className="ps-3 opacity-50">2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-5 w-100 row_st_dc">
                    <span className="quantity">{data.declarations.total.websites.partial+data.declarations.total.apps.partial}</span>
                    <div className="ps-2 yellow conform_container">
                      <span className="type">{t("NUMBERS.declaration.partial")}</span>
                      <span>{"+ " + Number(data.declarations.currentYear.websites.partial+data.declarations.currentYear.apps.partial) + " " + t("NUMBERS.last_year")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center ps-2">
                      <div className="d-flex flex-row">
                        <span className="mb-2" style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(243, 214, 9), rgb(243, 214, 9) 15.0877%, rgb(220, 220, 219) 15.0877%, rgb(220, 220, 219) 84.9123%)"}}></span>
                        <span className="ps-3 opacity-50">Total</span>
                      </div>
                      <div className="d-flex flex-row">
                      <span style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(243, 214, 9), rgb(243, 214, 9) 1.75439%, rgb(220, 220, 219) 1.75439%, rgb(220, 220, 219) 98.2456%)"}}></span>
                        <span className="ps-3 opacity-50">2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex w-100 row_st_dc">
                    <span className="quantity">{data.declarations.total.websites.not_conform+data.declarations.total.apps.not_conform}</span>
                    <div className="ps-2 red conform_container">
                      <span className="type">{t("NUMBERS.declaration.non_conform")}</span>
                      <span>{"+ " + Number(data.declarations.currentYear.websites.not_conform+data.declarations.currentYear.apps.not_conform) + " " + t("NUMBERS.last_year")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center ps-2">
                      <div className="d-flex flex-row">
                        <span className="mb-2" style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(233, 0, 24), rgb(233, 0, 24) 4.5614%, rgb(220, 220, 219) 4.5614%, rgb(220, 220, 219) 95.4386%)"}}></span>
                        <span className="ps-3 opacity-50">Total</span>
                      </div>
                      <div className="d-flex flex-row">
                        <span style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(233, 0, 24), rgb(233, 0, 24) 0%, rgb(220, 220, 219) 0%, rgb(220, 220, 219) 100%)"}}></span>
                        <span className="ps-3 opacity-50">2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group_container pt-5">
                <div className="first_column">
                  <span className="subtitle smaller mb-3">{t("NUMBERS.badge.subtitle1")}</span>
                  <div className="icon">
                    <span className="subtitle mb-3 me-2">{data.badges.total.websites.gold + data.badges.total.websites.silver + data.badges.total.websites.bronze + data.badges.total.apps.gold + data.badges.total.apps.silver + data.badges.total.apps.bronze}</span>
                    <Icon name="AMA-SeloDark2-Line" />
                  </div>
                  <span>{"+ " + Number(data.badges.currentYear.websites.gold + data.badges.currentYear.websites.silver + data.badges.currentYear.websites.bronze + data.badges.currentYear.apps.gold + data.badges.currentYear.apps.silver + data.badges.currentYear.apps.bronze) + " " + t("NUMBERS.last_year")}</span>
                </div>
                <div className="second_column">
                  <div className="d-flex mb-5 w-100 row_st_dc">
                    <span className="quantity">{data.badges.total.websites.gold+data.badges.total.apps.gold}</span>
                    <div className="ps-2 gold conform_container">
                      <span className="type">{t("NUMBERS.badge.gold")}</span>
                      <span>{"+ " + Number(data.badges.currentYear.websites.gold+data.badges.currentYear.apps.gold) + " " + t("NUMBERS.last_year")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center ps-2">
                      <div className="d-flex flex-row">
                        <span className="mb-2" style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(168, 125, 0), rgb(168, 125, 0) 21.875%, rgb(220, 220, 219) 21.875%, rgb(220, 220, 219) 78.125%)"}}></span>
                        <span className="ps-3 opacity-50">Total</span>
                      </div>
                      <div className="d-flex flex-row">
                        <span style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(168, 125, 0), rgb(168, 125, 0) 9.375%, rgb(220, 220, 219) 9.375%, rgb(220, 220, 219) 90.625%)"}}></span>
                        <span className="ps-3 opacity-50">2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-5 w-100 row_st_dc">
                    <span className="quantity">{data.badges.total.websites.silver+data.badges.total.apps.silver}</span>
                    <div className="ps-2 silver conform_container">
                      <span className="type">{t("NUMBERS.badge.silver")}</span>
                      <span>{"+ " + Number(data.badges.currentYear.websites.silver+data.badges.currentYear.apps.silver) + " " + t("NUMBERS.last_year")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center ps-2">
                      <div className="d-flex flex-row">
                        <span className="mb-2" style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(117, 121, 123), rgb(117, 121, 123) 34.375%, rgb(220, 220, 219) 34.375%, rgb(220, 220, 219) 65.625%)"}}></span>
                        <span className="ps-3 opacity-50">Total</span>
                      </div>
                      <div className="d-flex flex-row">
                        <span style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(117, 121, 123), rgb(117, 121, 123) 18.75%, rgb(220, 220, 219) 18.75%, rgb(220, 220, 219) 81.25%)"}}></span>
                        <span className="ps-3 opacity-50">2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex w-100 row_st_dc">
                    <span className="quantity">{data.badges.total.websites.bronze+data.badges.total.apps.bronze}</span>
                    <div className="ps-2 bronze conform_container">
                      <span className="type">{t("NUMBERS.badge.bronze")}</span>
                      <span>{"+ " + Number(data.badges.currentYear.websites.bronze+data.badges.currentYear.apps.bronze) + " " + t("NUMBERS.last_year")}</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center ps-2">
                      <div className="d-flex flex-row">
                        <span className="mb-2" style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(188, 116, 72), rgb(188, 116, 72) 9.375%, rgb(220, 220, 219) 9.375%, rgb(220, 220, 219) 90.625%)"}}></span>
                        <span className="ps-3 opacity-50">Total</span>
                      </div>
                      <div className="d-flex flex-row">
                        <span style={{width: "15em", height: "1em", background: "-webkit-linear-gradient(left, rgb(188, 116, 72), rgb(188, 116, 72) 6.25%, rgb(220, 220, 219) 6.25%, rgb(220, 220, 219) 93.75%)"}}></span>
                        <span className="ps-3 opacity-50">2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            

            <div className="tabs-grid">
              <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={true} />
            </div>

            <div className="censos_container p-5">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <h2>{t("HOME.4all.title")}</h2>
                <span>{t("HOME.4all.census")}</span>
              </div>
              <p className="censos_description mb-4">{t("HOME.4all.paragraph.part1")}<br/>{t("HOME.4all.paragraph.part2")}</p>
              <div className="censos_data">
                <div className="censos_column">
                  <Icon name="AMA-BracoPartido-Line" />
                  <span className="censos_number mt-2">2 905 200</span>
                  <span className="spans">{t("HOME.4all.disabilities._1.part1")}<br/>{t("HOME.4all.disabilities._1.part2")}<br/>{t("HOME.4all.disabilities._1.part3")}</span>
                </div>
                <div className="censos_column">
                  <Icon name="AMA-CadeiraRodasPC-Line" />
                  <span className="censos_number mt-2">18%</span>
                  <span className="spans">{t("HOME.4all.disabilities._2.part1")}<br/>{t("HOME.4all.disabilities._2.part2")}<br/>{t("HOME.4all.disabilities._2.part3")}</span>
                </div>
                <div className="censos_column">
                  <Icon name="AMA-Braille-Line" />
                  <span className="censos_number mt-2">24,8%</span>
                  <span className="spans">{t("HOME.4all.disabilities._3.part1")}<br/>{t("HOME.4all.disabilities._3.part2")}<br/>{t("HOME.4all.disabilities._3.part3")}</span>
                </div>
                <div className="censos_column">
                  <Icon name="AMA-Idoso-Line" />
                  <span className="censos_number mt-2">508 400</span>
                  <span className="spans">{t("HOME.4all.disabilities._4.part1")}<br/>{t("HOME.4all.disabilities._4.part2")}<br/>{t("HOME.4all.disabilities._4.part3")}</span>
                </div>
              </div>
            </div>
           
            <div className="d-flex flex-row my-5 top5_best_good">
              <div className="flex-1 mobile_margin">
                <div className="d-flex flex-row align-items-center">
                  <Icon name="AMA-Check-Line" />
                  <h2 className="ms-2">{t("HOME.summary.best_practices_title")}</h2>
                </div>
                <ul className="ps-0">
                  {data.topFiveBestPractices.map((best, index) => 
                    <li className="d-flex align-items-center mb-3">
                      <span className="top5_number pt-1 me-2">{index+1}</span>
                      <span>{t(`RESULTS.${best.key}`)}</span>
                    </li>)}
                </ul>
              </div>
              <div className="flex-1">
                <div className="d-flex flex-row align-items-center">
                  <Icon name="AMA-Wrong-Line" />
                  <h2 className="ms-2">{t("HOME.summary.errors_title")}</h2>
                </div>
                <ul className="ps-0">
                {data.topFiveErrors.map((best, index) => 
                  <li className="d-flex align-items-center mb-3">
                    <span className="top5_number pt-1 me-2">{index+1}</span>
                    <span>{t(`RESULTS.${best.key}`)}</span>
                  </li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
    : null}
    </>
  );
}