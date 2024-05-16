import "./styles.css";

import { Breadcrumb } from "../../components/index";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { useTranslation } from "react-i18next";
import { Gauge } from "../../components/Atoms/Gauge";
import { Button } from "../../components/Atoms/Button";
import { SortingTable } from "../../components/Molecules/SortingTable";

export default function Home({ changeState }) {
  const { t } = useTranslation();
  const dataRows = [
    {id: "1", designacao: {name: "Área Governativa dos Negócios Estrangeiros", href:"/"}, declaracao: "130", selo: "0", pontuacao: "9.6", sitios: "142", sitiosA: "1", sitiosAA: "3", sitiosAAA: "15"},
    {id: "2", designacao: {name: "Secretaria de Estado dos Assuntos Europeus", href:"/"}, declaracao: "2", selo: "1", pontuacao: "9.5", sitios: "2", sitiosA: "0", sitiosAA: "0", sitiosAAA: "0"},
    {id: "3", designacao: {name: "Investigação e Desenvolvimento de Interesse Público", href:"/"}, declaracao: "1", selo: "0", pontuacao: "9.1", sitios: "2", sitiosA: "0", sitiosAA: "0", sitiosAAA: "0"}
  ]

  const otherDataRows = [
    {diretorio: {name: "Municípios", href:"/"}, sitio: {name: "CM Oliveira do Hospital", href:"/"}, declaracao: "SVG_Declaracao_Conforme", selo: "SVG_Selo_Bronze", pontuacao: "4.3", nPaginas: "199"},
    {diretorio: {name: "Organizações Não Governamentais", href:"/"}, sitio: {name: "AFUA", href:"/"}, declaracao: "SVG_Declaracao_Parcial_Conforme", selo: "SVG_Selo_Prata", pontuacao: "6.3", nPaginas: "12"},
    {diretorio: {name: "Organizações Não Governamentais", href:"/"}, sitio: {name: "ARCIAL", href:"/"}, declaracao: "SVG_Declaracao_Nao_Conforme", selo: "SVG_Selo_Ouro", pontuacao: "4.9", nPaginas: "1"}
  ]

  const directoriesHeaders = [
    [
      {icon: false, name: t("DIRECTORIES.table.rank"), description: "", property: "id", position: "left", justify: "", varType: "number", href: false},
      {icon: false, name: t("DIRECTORIES.table.name"), description: "", property: "designacao", position: "left", justify: "", varType: "string", href: true},
      {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaracao", position: "", justify: "", varType: "number", href: false},
      {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "selo", position: "", justify: "", varType: "number", href: false},
      {icon: false, name: t("DIRECTORIES.table.score"), description: "", property: "pontuacao", position: "", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORIES.table.websites"), description: "", property: "sitios", position: "right", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORIES.table.levels"), description: "", property: "", position: "right", justify: "justify-content-center", varType: "number", nCol: 3, href: false},
    ],
    [
      {icon: false, name: "", description: "", property: "", position: "", justify: "", varType: "", nCol: 6, href: false},
      {icon: false, name: t("DIRECTORIES.table.A"), description: "", property: "sitiosA", position: "right", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORIES.table.AA"), description: "", property: "sitiosAA", position: "right", justify: "justify-content-center", varType: "number", href: false},
      {icon: false, name: t("DIRECTORIES.table.AAA"), description: "", property: "sitiosAAA", position: "right", justify: "justify-content-center", varType: "number", href: false}
    ]
  ]

  const searchTableHeaders = [
    {icon: false, name: t("DIRECTORIES.search.directory"), description: "", property: "diretorio", position: "left", justify: "", varType: "string", href: true},
    {icon: false, name: t("DIRECTORIES.search.website"), description: "", property: "sitio", position: "left", justify: "", varType: "string", href: true},
    {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaracao", position: "", justify: "", varType: "number", href: false},
    {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "selo", position: "", justify: "", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.search.score"), description: "", property: "pontuacao", position: "", justify: "justify-content-center", varType: "number", href: false},
    {icon: false, name: t("DIRECTORIES.search.n_pages"), description: "", property: "nPaginas", position: "right", justify: "justify-content-center", varType: "number", href: false},
  ]

  const [data, setData] = useState(dataRows);
  const [otherData, setOtherData] = useState(otherDataRows);
  const [search, setSearch] = useState("");

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    { title: "Observatório", href: "/" },
  ];

  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";

  const extraStats = (title, subtitle) => {
    return (
        <div className="d-flex flex-column">
            <span className="span_title">{title}</span>
            <span className="span_subtitle">{subtitle}</span>
        </div>
    )
  }

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} />
        </div>

        <div className="title_container">
            <div className="observatorio" lang="en">
                {t("HEADER.NAV.observatory")}
            </div>
            <h1 className="page_title">{t("HEADER.NAV.directories")}</h1>
        </div>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
        >
            <div className="d-flex flex-column section_container">
                <div className="grid_container">
                    <div className="d-flex flex-column first_row">
                        <span className="container_title">{t("DIRECTORIES.statistics_title")}</span>
                        <span>{t("DIRECTORIES.statistics_subtitle")}</span>
                    </div>
                    <div className="first_row second_column">
                        <div className="d-flex flex-column">
                            <span className="second_column_title">{t("STATISTICS.oldest_page_updated")}</span>
                            <span className="second_column_subtitle">15 de Dezembro, 2020</span>
                        </div>
                        <div className="d-flex flex-column">
                            <span className="second_column_title">{t("STATISTICS.newest_page_updated")}</span>
                            <span className="second_column_subtitle">13 de Maio, 2024</span>
                        </div>
                    </div>
                    <div className="second_row">
                        <Gauge percentage={"7.2"} />
                    </div>
                    <div className="second_row last_column">
                        {extraStats("34", t("STATISTICS.directories"))}
                        {extraStats("1177", t("STATISTICS.entities"))}
                        {extraStats("2031", t("STATISTICS.websites"))}
                        {extraStats("115866", t("STATISTICS.pages"))}
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-end gap-4">
                    <Button variant="primary" text={t("STATISTICS.score_distribution")} />
                    <Button variant="success" text={t("STATISTICS.correction_distribution")} />
                    <Button variant="danger" text={t("STATISTICS.error_distribution")} />
                </div>
            </div>
        </section>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section section_margin`}
        >
            <div className="d-flex flex-column section_container">
                <h2 className="table_title">{t("DIRECTORIES.table.title")}</h2>
                <SortingTable headers={directoriesHeaders} setData={setData} data={data} />
                <span className="note">{t("DIRECTORIES.table.note")}</span>
            </div>
        </section>

        <section
          className={`bg-white ${main_content_home} d-flex flex-row section`}
        >
            <div className="d-flex flex-column search_container">
                <form className="d-flex flex-column">
                    <label for="search">{t("DIRECTORIES.search.label")}</label>
                    <input type="text" id="search" placeholder={t("DIRECTORIES.search.placeholder")} value={search} onChange={(e) => setSearch(e.target.value)}/>
                </form>
                {search ? 
                    (search !== "no data" ? 
                        <SortingTable headers={searchTableHeaders} setData={setOtherData} data={otherData} />
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