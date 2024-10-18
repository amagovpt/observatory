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
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
        {type: "SortingText", nRow: 2, bigWidth: "50%", name: t("DIRECTORY.table.name"), property: "name"},
        {type: "SortingIcon", nRow: 2, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration"},
        {type: "SortingIcon", nRow: 2, name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp"},
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("DIRECTORY.table.score"), property: "score", justifyCenter: true},
        {type: "SortingText", nRow: 2, bigWidth: "10%", name: t("DIRECTORY.table.pages"), property: "nPages", justifyCenter: true},
        {id: "conformidade", type: "Text", name: t("DIRECTORY.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
      ],
      [
        {id: "A", type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.A"), property: "A", justifyCenter: true},
        {id: "AA", type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.AA"), property: "AA", justifyCenter: true},
        {id: "AAA", type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.AAA"), property: "AAA", justifyCenter: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
        return `${pathURL}directories/${id}/${row.id}`
      }},
      entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
      declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
      stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
      A: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade A" },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade AA" },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "conformidade AAA" },
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