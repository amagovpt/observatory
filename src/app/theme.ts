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
  '_22': '#db2280'
};

const light: Theme = {
  name: 'light',
  properties: {
    // GLOBAL
    '--background': Colours._1,
    '--go-to-top-background': Colours._4,
    '--go-to-top-icon': Colours._3,

    // TOP HEADER
    '--top-header-background': Colours._1,

    // FOOTER
    '--footer-background': Colours._11,
  }
};

const dark: Theme = {
  name: 'dark',
  properties: {
    // GLOBAL
    '--background': Colours._7,
    '--go-to-top-background': Colours._10,
    '--go-to-top-icon': Colours._7,

    // TOP HEADER
    '--top-header-background': Colours._12,

    // FOOTER
    '--footer-background': Colours._12,
  }
};

export {
  Theme,
  Colours,
  light,
  dark
};