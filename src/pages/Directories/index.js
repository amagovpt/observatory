import "./styles.css";

import { Breadcrumb } from "../../components/index";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import moment from 'moment'
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import { StatisticsHeader } from "../../components/Molecules/StatisticsHeader";
import { SortingTable } from "../../components/Molecules/SortingTable";

export default function Directories() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [directoriesList, setDirectoriesList] = useState([]);
  const [directoriesStats, setDirectoriesStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [otherData, setOtherData] = useState(null);
  
  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_directories";

  const dataProcess = location.state?.content || null;

  const searchTableHeaders = [
    {icon: false, bigWidth: "40%", name: t("DIRECTORIES.search.directory"), property: "directoryName"},
    {icon: false, bigWidth: "40%", name: t("DIRECTORIES.search.website"), property: "name"},
    {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaration"},
    {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "stamp"},
    {icon: false, name: t("DIRECTORIES.search.score"), property: "score", justifyCenter: true},
    {icon: false, name: t("DIRECTORIES.search.n_pages"), property: "nPages", justifyCenter: true},
  ]

  let columnsOptionsSearch = {
    directoryName: { type: "Link", center: false, bold: false, decimalPlace: false },
    directoryId: { type: "Skip", center: false, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false },
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
    stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
    score: { type: "Number", center: true, bold: false, decimalPlace: true },
    nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
  }
  
  const directoriesHeaders = [
    [
      {icon: false, name: t("DIRECTORIES.table.rank"), property: "rank"},
      {icon: false, bigWidth: "50%", name: t("DIRECTORIES.table.name"), property: "name"},
      {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaration"},
      {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "stamp"},
      {icon: false, name: t("DIRECTORIES.table.score"), property: "score", justifyCenter: true},
      {icon: false, name: t("DIRECTORIES.table.websites"), property: "nWebsites", justifyCenter: true},
      {icon: false, nCol: 3, name: t("DIRECTORIES.table.levels"), property: "", justifyCenter: true, multiCol: true},
    ],
    [
      {icon: false, nCol: 6, name: "", multiCol: true},
      {icon: false, name: t("DIRECTORIES.table.A"), property: "A", justifyCenter: true},
      {icon: false, name: t("DIRECTORIES.table.AA"), property: "AA", justifyCenter: true},
      {icon: false, name: t("DIRECTORIES.table.AAA"), property: "AAA", justifyCenter: true}
    ]
  ]

  let columnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false },
    declarations: { type: "Number", center: true, bold: false, decimalPlace: false },
    stamps: { type: "Number", center: true, bold: false, decimalPlace: false },
    score: { type: "Number", center: true, bold: false, decimalPlace: true },
    nWebsites: { type: "Number", center: true, bold: false, decimalPlace: false },
    A: { type: "Number", center: true, bold: false, decimalPlace: false },
    AA: { type: "Number", center: true, bold: false, decimalPlace: false },
    AAA: { type: "Number", center: true, bold: false, decimalPlace: false },
  }

  let statsTitles = [
    t("STATISTICS.directories"),
    t("STATISTICS.entities"),
    t("STATISTICS.websites"),
    t("STATISTICS.pages")
  ]

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "/" },
    { title: t("HEADER.NAV.directories"), href: "/directories" },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      setDirectoriesStats({
        score: (dataProcess.score).toFixed(1),
        recentPage: moment(dataProcess.recentPage).format("LL"),
        oldestPage: moment(dataProcess.oldestPage).format("LL"),
        statsTable: [
          dataProcess.nDirectories,
          dataProcess.nEntities,
          dataProcess.nWebsites,
          dataProcess.nPages,
        ]
      })

      setDirectoriesList(dataProcess.directoriesList)
      setLoading(false)
    }
    processData()
  }, [dataProcess])

  const nextPage = (row, key) => {
    if(row) {
      navigate(`/directories/${row["id"]}`, {state: {content: dataProcess, id: row["id"]}} )
    }
  }

  const nextPageSearch = (row, key) => {
    if(key !== "directoryName") {
      navigate(`/directories/${row["directoryId"]}/${row["id"]}`, {state: {content: dataProcess, directoryId: row["directoryId"], websiteId: row["id"]}} )
    } else {
      navigate(`/directories/${row["directoryId"]}`, {state: {content: dataProcess, id: row["directoryId"]}} )
    }
  }

  const searchFuntion = (text) => {
    let searchResults = []
    setSearch(text)
    if (text && text.trim() !== "" && text.trim().length > 2) {
      dataProcess.directoriesList.map((directory) => {
        dataProcess.directories[directory.id].websitesList.map((website) => {
          if(_search(website, text)) {
            searchResults.push({
              directoryName: directory.name,
              directoryId: directory.id,
              name: website.name,
              id: website.id,
              declaration: website.declaration,
              stamp: website.stamp,
              score: website.score,
              nPages: website.nPages,
            })
          }
        })
      })
      if (searchResults.length === 0) {
        setOtherData(null)
      } else {
        setOtherData(searchResults)
      }
      
    }

    if (!text || text.trim() === "" || text.trim().length <= 2) {
      setOtherData(null)
    }
  }

  const _search = (website, text) => {
    const parts = text.trim().toLowerCase().split(" ");
    let hasText = true;

    const totalText = (
      website.name +
      " " +
      website.startingUrl +
      " " +
      (website.entity ?? "")
    )
      .trim()
      .toLowerCase()
      .normalize("NFD");

    for (const part of parts ?? []) {
      const normalizedText = part.normalize("NFD");

      if (!totalText.includes(normalizedText)) {
        hasText = false;
      }
    }

    return hasText;
  }

  return (
    <>
      <div className="container">
        {!loading ? <><div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} />
        </div>

        <div className="title_container">
            <div className="observatorio" lang="en">
                {t("HEADER.NAV.observatory")}
            </div>
            <h2 className="page_title">{t("HEADER.NAV.directories")}</h2>
        </div>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
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
            buttons={true}
          />}
        </section>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
        >
          <div className="d-flex flex-column section_container">
            <h3 className="table_title">{t("DIRECTORIES.table.title")}</h3>
            <SortingTable
              hasSort={true}
              headers={directoriesHeaders}
              setDataList={setDirectoriesList}
              dataList={directoriesList}
              nextPage={nextPage}
              darkTheme={theme === "light" ? false : true}
              pagination={false}
              caption={t("DIRECTORIES.table.title")}
              columnsOptions={columnsOptions}
            />
            <span className="note">{t("DIRECTORIES.table.note")}</span>
          </div>
        </section></>:null}

        <section className={`bg-white ${main_content_home} d-flex flex-row section`}>
          <div className="d-flex flex-column search_container">
            <form className="d-flex flex-column">
              <label for="search">{t("DIRECTORIES.search.label")}</label>
              <input type="text" id="search" placeholder={t("DIRECTORIES.search.placeholder")} value={search} onChange={(e) => searchFuntion(e.target.value)}/>
            </form>
            {search && search.length >= 3 ? 
              (otherData ?
                <SortingTable
                  headers={searchTableHeaders}
                  columnsOptions={columnsOptionsSearch}
                  setDataList={setOtherData}
                  dataList={otherData}
                  nextPage={nextPageSearch}
                  darkTheme={theme === "light" ? false : true}
                  pagination={false}
                  hasSort={true}
                  caption={t("DIRECTORY.table.subtitle")+ " "}
                  iconsAltTexts={[
                    t("DIRECTORY.table.stamp_bronze"),
                    t("DIRECTORY.table.stamp_silver"),
                    t("DIRECTORY.table.stamp_gold"),
                    t("DIRECTORY.table.declaration_not_conform"),
                    t("DIRECTORY.table.declaration_partial_conform"),
                    t("DIRECTORY.table.declaration_conform")
                  ]}
                />
              :
                <span className="no_data">{t("DIRECTORIES.search.no_results")}</span>
              ) 
            : 
              null
            }
          </div>
        </section>
      </div>
    </>
  );
}