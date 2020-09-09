interface Theme {
  name: string;
  properties: any;
}

const Colours = {
  '_1': '#e4e4e4',
  '_2': '#efefee',
  '_3': '#ffffff',
  '_4': '#339',
  '_5': '#212529',
  '_6': '#333',
  '_7': '#20242c',
  '_8': '#2c3241',
  '_9': '#ebf2f6',
  '_10': '#b6dcf6',
  '_11': '#f1f1f1',
  '_12': '#272777',
  '_13': '#b5dbf5',
  '_14': '#eaeaea',
  '_15': '#d10000',
  '_16': '#a7b1be',
  '_17': '#bce1bc',
  '_18': '#ffff99',
  '_19': '#ff9999',
  '_20': '#525865',
  '_21': '#e39d9f',
  '_22': '#db2280',
  '_23': '#4D4D4D',
  '_24': '#008538',
  '_25': '#C1130B'
};

const light: Theme = {
  name: 'light',
  properties: {
    // GLOBAL
    '--background': Colours._1,
    '--go-to-top-background': Colours._4,
    '--go-to-top-icon': Colours._3,
    '--breadcrumbs-text': Colours._4,

    // HEADER
    '--top-header-background': Colours._1,
    '--header-background': Colours._2,
    '--header-title': Colours._4,
    '--header-text': Colours._6,

    // FOOTER
    '--footer-background': Colours._11,

    // DIRECTORIES PAGE
    '--info-observatory-background': Colours._4,
    '--info-observatory-text': Colours._3,
    '--info-title': Colours._6,

    // STATISTICS
    '--statistics-background': Colours._3,
    '--statistics-text': Colours._6,
    '--statistics-text2': Colours._23,
    '--statistics-button-background1': Colours._4,
    '--statistics-button-background2': Colours._24,
    '--statistics-button-background3': Colours._25,
    '--statistics-button-text': Colours._3,

    // TABLE
    '--table-title': Colours._6,
    '--table-header1': Colours._6,
    '--table-header2': Colours._23,
    '--table-header-text': Colours._3,
    '--table-text': Colours._6,
    '--table-directory-name': Colours._4,
    '--table-border': Colours._6
  }
};

const dark: Theme = {
  name: 'dark',
  properties: {
    // GLOBAL
    '--background': Colours._7,
    '--go-to-top-background': Colours._10,
    '--go-to-top-icon': Colours._7,
    '--breadcrumbs-text': Colours._10,

    // HEADER
    '--top-header-background': Colours._12,
    '--header-background': Colours._4,
    '--header-title': Colours._13,
    '--header-text': Colours._9,

    // FOOTER
    '--footer-background': Colours._12,

    // DIRECTORIES PAGE
    '--info-observatory-background': Colours._10,
    '--info-observatory-text': Colours._7,
    '--info-title': Colours._9,

    // STATISTICS
    '--statistics-background': Colours._8,
    '--statistics-text': Colours._9,
    '--statistics-text2': Colours._9,
    '--statistics-button-background1': Colours._4,
    '--statistics-button-background2': Colours._24,
    '--statistics-button-background3': Colours._25,
    '--statistics-button-text': Colours._10,

    // TABLE
    '--table-title': Colours._9,
    '--table-header1': Colours._6,
    '--table-header2': Colours._23,
    '--table-header-text': Colours._9,
    '--table-text': Colours._3,
    '--table-directory-name': Colours._3,
    '--table-border': Colours._20
  }
};

export {
  Theme,
  Colours,
  light,
  dark
};