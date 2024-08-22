import { pathURL } from "../../App";

// Function to get additional Arrays
// t -> the translation function
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable (t, id) {
    const directoriesHeaders = [
      [
        {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
        {type: "SortingText", bigWidth: "50%", name: t("DIRECTORY.table.name"), property: "name"},
        {type: "SortingIcon", name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration"},
        {type: "SortingIcon", name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp"},
        {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.score"), property: "score", justifyCenter: true},
        {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.pages"), property: "nPages", justifyCenter: true},
        {type: "Text", name: t("DIRECTORY.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
      ],
      [
        {type: "Empty", nCol: 6, name: t("MISC.empty"), multiCol: true, empty: true},
        {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.A"), property: "A", justifyCenter: true},
        {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.AA"), property: "AA", justifyCenter: true},
        {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.AAA"), property: "AAA", justifyCenter: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false, headers: '' },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false, headers: t("DIRECTORY.table.rank") },
      name: { type: "Link", center: false, bold: false, decimalPlace: false, headers: t("DIRECTORY.table.name").replaceAll(' ', ''), href: (row) => {
        return `${pathURL}directories/${id}/${row.id}`
      }},
      entity: { type: "Skip", center: false, bold: false, decimalPlace: false, headers: '' },
      declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false, headers: "AMA-DeclaracaoDark-Line" },
      stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false, headers: "AMA-SeloDark-Line" },
      score: { type: "Number", center: true, bold: false, decimalPlace: true, headers: t("DIRECTORY.table.score") },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false, headers: t("DIRECTORY.table.pages").replaceAll(' ', '') },
      A: { type: "Number", center: true, bold: false, decimalPlace: false, headers: (t("DIRECTORY.table.levels").replaceAll(' ', '') + " " + t("DIRECTORY.table.A")) },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: (t("DIRECTORY.table.levels").replaceAll(' ', '') + " " + t("DIRECTORY.table.AA")) },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: (t("DIRECTORY.table.levels").replaceAll(' ', '') + " " + t("DIRECTORY.table.AAA")) },
    }
    
    let statsTitles = [
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

    let paginationButtonsTexts = [
      t("DIRECTORY.table.paginator.first_page"),
      t("DIRECTORY.table.paginator.previous_page"),
      t("DIRECTORY.table.paginator.next_page"),
      t("DIRECTORY.table.paginator.last_page")
    ]

    let nItemsPerPageText=[
      t("DIRECTORY.table.paginator.see"),
      t("DIRECTORY.table.paginator.per_page")
    ]

    let itemsPaginationText = [
      t("DIRECTORY.table.paginator.of"),
      t("DIRECTORY.table.paginator.items")
    ]

    return { directoriesHeaders, columnsOptions, statsTitles, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText }
}


export function checkIfDirectoryOk (id, array) {
  const idObejct = array.directoriesList.find(e => e.id === id)
  return idObejct ? true : false;
}