import { pathURL } from "../../App";
import { Link } from "react-router-dom";

// Secondary search function that checks if the text matches
// website -> name of the website
// text -> the text being searched
export function _search (website, text) {
    const parts = text.trim().toLowerCase().split(" ");
    let hasText = true;

    // Normalize URL by removing protocol, www, and trailing slashes
    const normalizeUrl = (url) => {
      if (!url) return "";
      return url
        .replace(/^https?:\/\//, "")  // Remove http:// or https://
        .replace(/^www\./, "")         // Remove www.
        .replace(/\/$/, "");           // Remove trailing slash
    };

    const totalText = (
      website.name +
      " " +
      website.startingUrl +
      " " +
      normalizeUrl(website.startingUrl) +
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

// Main search function that goes through the data
// text -> the text being searched
// setSearch -> function to set the text searched
// setOtherData -> function to set the data to be showned
// dataProcess -> data
export function searchFuntion (text, dataProcess) {
    let searchResults = []
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
          return ""
        })
        return ""
      })
      if (searchResults.length === 0) {
        return []
      } else {
        return searchResults
      }
      
    }

    if (!text || text.trim() === "" || text.trim().length <= 2) {
      return []
    }
}


// Function to get additional Arrays
// t -> the translation function
// RETURNS
// searchTableHeaders -> Headers for the search table
// columnsOptionsSearch -> Options to tell the type to render with which property for search table
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoriesTable (t) {
    const searchTableHeaders = [
      {type: "SortingText", bigWidth: "40%", name: t("DIRECTORIES.search.directory"), property: "directoryName"},
      {type: "SortingText", bigWidth: "40%", name: t("DIRECTORIES.search.website"), property: "name"},
      {type: "SortingIcon", name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaration"},
      {type: "SortingIcon", name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "stamp"},
      {type: "SortingText", bigWidth: "10%", name: t("DIRECTORIES.search.score"), property: "score", justifyCenter: true},
      {type: "SortingText", bigWidth: "10%", name: t("DIRECTORIES.search.n_pages"), property: "nPages", justifyCenter: true},
    ]
    
    let columnsOptionsSearch = {
      directoryName: { type: "Link", center: false, bold: false, decimalPlace: false, children: (row, data) => {
        return <Link to={`${pathURL}directories/${row.directoryId}`} className="ama-typography-action-large bold">{data}</Link>
      }},
      directoryId: { type: "Skip", center: false, bold: false, decimalPlace: false },
      name: { type: "Link", center: false, bold: false, decimalPlace: false, children: (row, data) => {
        return <Link to={`${pathURL}directories/${row.directoryId}/${row.id}`} className="ama-typography-action-large bold">{data}</Link>
      }},
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
      stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
    }
      
    const directoriesHeaders = [
      [
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("DIRECTORIES.table.rank"), property: "rank"},
        {type: "SortingText", nRow: 2, bigWidth: "50%", name: t("DIRECTORIES.table.name"), property: "name"},
        {type: "SortingIcon", nRow: 2, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declarations"},
        {type: "SortingIcon", nRow: 2, name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamps"},
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("DIRECTORIES.table.score"), property: "score", justifyCenter: true},
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("DIRECTORIES.table.websites"), property: "nWebsites", justifyCenter: true},
        {id: "conformidade", type: "Text", nRow: 1, name: "Páginas em conformidade*", property: "", justifyCenter: true, nCol: 3},
      ],
      [
        {id: "A", type: "SortingText", bigWidth: "10%", name: t("DIRECTORIES.table.A"), property: "A", justifyCenter: true, ariaLabel: true},
        {id: "AA", type: "SortingText", bigWidth: "10%", name: t("DIRECTORIES.table.AA"), property: "AA", justifyCenter: true, ariaLabel: true},
        {id: "AAA", type: "SortingText", bigWidth: "10%", name: t("DIRECTORIES.table.AAA"), property: "AAA", justifyCenter: true, ariaLabel: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Link", center: false, bold: false, decimalPlace: false, children: (row, data) => {
        return <Link to={`${pathURL}directories/${row.id}`} className="ama-typography-action-large bold">{data}</Link>
      }},
      declarations: { type: "Number", center: true, bold: false, decimalPlace: false },
      stamps: { type: "Number", center: true, bold: false, decimalPlace: false },
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nWebsites: { type: "Number", center: true, bold: false, decimalPlace: false },
      A: { type: "Number", center: false, bold: false, decimalPlace: false, headers: "conformidade A" },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade AA" },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade AAA" },
    }
    
    let statsTitles = [
      t("STATISTICS.directories"),
      t("STATISTICS.entities"),
      t("STATISTICS.websites"),
      t("STATISTICS.pages")
    ]

    let nameOfIcons = [
      t("DIRECTORY.table.stamp_bronze"),
      t("DIRECTORY.table.stamp_silver"),
      t("DIRECTORY.table.stamp_gold"),
      t("DIRECTORY.table.declaration_not_conform"),
      t("DIRECTORY.table.declaration_partial_conform"),
      t("DIRECTORY.table.declaration_conform")
    ]

    let ariaLabels = {
      A: t("WEBSITE.ariaLabels.A"),
      AA: t("WEBSITE.ariaLabels.AA"),
      AAA: t("WEBSITE.ariaLabels.AAA")
    }

    return { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons, ariaLabels }
}