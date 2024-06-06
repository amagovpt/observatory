
// Secondary search function that checks if the text matches
// website -> name of the website
// text -> the text being searched
export function _search (website, text) {
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

// Main search function that goes through the data
// text -> the text being searched
// setSearch -> function to set the text searched
// setOtherData -> function to set the data to be showned
// dataProcess -> data
export function searchFuntion (text, setSearch, setOtherData, dataProcess) {
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
      {icon: false, bigWidth: "40%", name: t("DIRECTORIES.search.directory"), property: "directoryName"},
      {icon: false, bigWidth: "40%", name: t("DIRECTORIES.search.website"), property: "name"},
      {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORIES.table.declaration"), property: "declaration"},
      {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORIES.table.stamp"), property: "stamp"},
      {icon: false, name: t("DIRECTORIES.search.score"), property: "score", justifyCenter: true},
      {icon: false, name: t("DIRECTORIES.search.n_pages"), property: "nPages", justifyCenter: true},
    ]
    
    let columnsOptionsSearch = {
      directoryName: { type: "Button", center: false, bold: false, decimalPlace: false },
      directoryId: { type: "Skip", center: false, bold: false, decimalPlace: false },
      name: { type: "Button", center: false, bold: false, decimalPlace: false },
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
        {icon: false, nCol: 6, name: t("MISC.empty"), multiCol: true, empty: true},
        {icon: false, name: t("DIRECTORIES.table.A"), property: "A", justifyCenter: true},
        {icon: false, name: t("DIRECTORIES.table.AA"), property: "AA", justifyCenter: true},
        {icon: false, name: t("DIRECTORIES.table.AAA"), property: "AAA", justifyCenter: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Button", center: false, bold: false, decimalPlace: false },
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

    let nameOfIcons = [
      t("DIRECTORY.table.stamp_bronze"),
      t("DIRECTORY.table.stamp_silver"),
      t("DIRECTORY.table.stamp_gold"),
      t("DIRECTORY.table.declaration_not_conform"),
      t("DIRECTORY.table.declaration_partial_conform"),
      t("DIRECTORY.table.declaration_conform")
    ]

    return { searchTableHeaders, columnsOptionsSearch, directoriesHeaders, columnsOptions, statsTitles, nameOfIcons }
}