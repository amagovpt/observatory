
// Function to get additional Arrays
// t -> the translation function
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable (t) {
    const directoriesHeaders = [
      [
        {icon: false, name: t("DIRECTORY.table.rank"), property: "rank"},
        {icon: false, bigWidth: "50%", name: t("DIRECTORY.table.name"), property: "name"},
        {icon: true, name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration"},
        {icon: true, name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp"},
        {icon: false, name: t("DIRECTORY.table.score"), property: "score", justifyCenter: true},
        {icon: false, name: t("DIRECTORY.table.pages"), property: "nPages", justifyCenter: true},
        {icon: false, name: t("DIRECTORY.table.levels"), property: "", justifyCenter: true, multiCol: true, nCol: 3},
      ],
      [
        {icon: false, nCol: 6, name: t("MISC.empty"), multiCol: true, empty: true},
        {icon: false, name: t("DIRECTORY.table.A"), property: "A", justifyCenter: true},
        {icon: false, name: t("DIRECTORY.table.AA"), property: "AA", justifyCenter: true},
        {icon: false, name: t("DIRECTORY.table.AAA"), property: "AAA", justifyCenter: true}
      ]
    ]
    
    let columnsOptions = {
      id: { type: "Skip", center: false, bold: false, decimalPlace: false },
      rank: { type: "Number", center: true, bold: false, decimalPlace: false },
      name: { type: "Button", center: false, bold: false, decimalPlace: false },
      entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
      declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
      stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
      score: { type: "Number", center: true, bold: false, decimalPlace: true },
      nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
      A: { type: "Number", center: true, bold: false, decimalPlace: false },
      AA: { type: "Number", center: true, bold: false, decimalPlace: false },
      AAA: { type: "Number", center: true, bold: false, decimalPlace: false },
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