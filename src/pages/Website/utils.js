
// Function to get data for Bar/Line Graph
// t -> the translation 
// dataForLine -> data array for the line graph
// dataForBar -> data array for the bar graph
// websiteStats -> stats for StatisticHeader used to calculate the number of pages
// theme -> dark / light theme
// RETURNS
// headersBarLine -> Bar graph X labels
// dataBarLine -> Bar & Line Data
// optionsBarLine -> Options to change the Bar & Line graph
export function getBarLineGraph (t, dataForLine, dataForBar, websiteStats, theme) {
    const headersBarLine = ['[1 - 2[', '[2 - 3[', '[3 - 4[', '[4 - 5[', '[5 - 6[', '[6 - 7[', '[7 - 8[', '[8 - 9[', '[9 - 10[']

    const dataBarLine = {
        labels: headersBarLine,
        datasets: [
          {
            type: 'line',
            label: t("DIALOGS.scores.cumulative"),
            data: dataForLine,
            backgroundColor: 'rgba(51, 51, 153, 1)',
            borderColor: 'rgba(51, 51, 153, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointBackgroundColor: 'red', // Set the color of the dots
            pointBorderColor: 'red',     // Set the border color of the dots
          },
          {
            type: 'bar',
            label: t("DIALOGS.scores.frequency"),
            data: dataForBar,
            backgroundColor: [
              '#e90018',
              '#e90018',
              '#f38e10',
              '#f38e10',
              '#f3d609',
              '#f3d609',
              '#f3d609',
              '#15ac51',
              '#15ac51' 
            ],
            borderWidth: 0,
          }
        ]
    };

    const optionsBarLine = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.dataset.type === 'bar') {
                  // Format the tooltip for bar dataset
                  const nPages = (context.raw*websiteStats.statsTable[0]/100).toFixed(0)
                  return [
                    `${label}${context.raw}%`,      // Main value
                    `${t("DIALOGS.scores.frequency")}: ${nPages}` // Additional value
                  ];
                } else if (context.dataset.type === 'line') {
                  // Format the tooltip for line dataset
                  const nPages = (context.raw*websiteStats.statsTable[0]/100).toFixed(0)
                  return [
                    `${label}${context.raw}%`,      // Main value
                    `${t("DIALOGS.scores.percentage")}: ${nPages}` // Additional value
                  ];
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: t("DIALOGS.scores.range"),
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
              font: {
                size: 14
              }
            },
            ticks: {
              font: {
                size: 14
              },
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
            },
            grid: {
              color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
            }
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: t("DIALOGS.scores.percentage_label"),
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
              font: {
                size: 14
              }
            },
            ticks: {
              font: {
                size: 14,
              },
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on Y axis
            },
            grid: {
              color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
            }
          }
        }
    };

    return { headersBarLine, dataBarLine, optionsBarLine }
}

// Function to get data for Bar/Line Table
// t -> the translation 
// RETURNS
// dataHeaders -> Bar/Line Table headers
// columnsOptions -> Bar/Line type of render to execute p/ attribute
export function getBarLineTable (t) {
    const dataHeaders = [
        [
          {icon: false, name: t("DIALOGS.scores.range"), justifyCenter: true},
          {icon: false, name: t("DIALOGS.scores.frequency"), justifyCenter: true},
          {icon: false, name: t("DIALOGS.scores.frequency")+ " (%)", justifyCenter: true},
          {icon: false, name: t("DIALOGS.scores.cumulative"), justifyCenter: true},
          {icon: false, name: t("DIALOGS.scores.cumulative")+ " (%)", justifyCenter: true},
        ]
    ]

    const columnsOptions = {
        range: { type: "Text", center: true, bold: false, decimalPlace: false },
        frequency: { type: "Number", center: true, bold: false, decimalPlace: false },
        frequency_percent: { type: "Text", center: true, bold: false, decimalPlace: false },
        cumulative: { type: "Number", center: true, bold: false, decimalPlace: false },
        cumulative_percent: { type: "Text", center: true, bold: false, decimalPlace: false },
    }

    return { dataHeaders,  columnsOptions }
}

// Function to get data for GoodBad General Tables
// t -> the translation
// goodOrBad -> differentiate between good tab or bad tab
// RETURNS
// dataTableHeadersA/AA/AAA -> Headers for the tables of each type of practice
// columnsOptionsAAs -> Type of render to execute p/ attribute
// detailsTableHeaders -> Headers for the table of all practice
// columnsOptionsDetails -> Type of render to execute p/ attribute
export function getGoodBadTabTables (t, goodOrBad) {
    const dataTableHeadersA = [
        {icon: false, name: t(`WEBSITE.${goodOrBad}.message`, {value: "A"}), nCol: 3}
    ]
    
    const dataTableHeadersAA = [
        {icon: false, name: t(`WEBSITE.${goodOrBad}.message`, {value: "AA"}), nCol: 3}
    ]
    
    const dataTableHeadersAAA = [
        {icon: false, name: t(`WEBSITE.${goodOrBad}.message`, {value: "AAA"}), nCol: 3}
    ]

    let columnsOptionsAAs = {
        number: { type: "Text", center: true, bold: true, decimalPlace: false },
        name: { type: "DangerousHTML", center: false, bold: false, decimalPlace: false },
        nPages: { type: "DoubleText", center: true, bold: false, decimalPlace: false },
    }

    const detailsTableHeaders = [
        {icon: false, bigWidth: "50%", name: t("WEBSITE.table.practice_label")},
        {icon: false, bigWidth: "30%", name: t("WEBSITE.table.details_practice_label"), justifyCenter: true},
        {icon: false, name: t("WEBSITE.table.n_pages_label"), justifyCenter: true},
        {icon: false, name: t("WEBSITE.table.n_errors_label"), justifyCenter: true},
        {icon: false, name: t("WEBSITE.table.lvl_label"), justifyCenter: true},
    ]
    
    let columnsOptionsDetails = {
        name: { type: "DangerousHTML", center: false, bold: false, decimalPlace: false },
        practices: { type: "MultiText", center: true, bold: false, decimalPlace: false },
        pages: { type: "Number", center: true, bold: false, decimalPlace: false },
        occurences: { type: "Number", center: true, bold: false, decimalPlace: false },
        lvl: { type: "Text", center: true, bold: false, decimalPlace: false, ariaLabel: true },
    }

    let ariaLabels = {
      A: t("WEBSITE.ariaLabels.A"),
      AA: t("WEBSITE.ariaLabels.AA"),
      AAA: t("WEBSITE.ariaLabels.AAA")
    }

    return { dataTableHeadersA, dataTableHeadersAA, dataTableHeadersAAA, columnsOptionsAAs, detailsTableHeaders, columnsOptionsDetails, ariaLabels }
}

// Function to get data for Radar
// t -> the translation
// theme -> Dark/Light theme
// labelsForRadar -> labels for the radar
// data -> Data for the radar
// RETURNS
// options -> Options for the radar
// manchaData -> Data for radar
export function getRadarGraph (t, theme, labelsForRadar, data) {
    const options = {
      scales: {
        r: {
            min: 0,
            max: 10,
            grid: {
              color: theme === "light" ? "lightgrey" : 'lightgrey', // Color of the grid lines
            },
            angleLines: {
              color: theme === "light" ? "lightgrey" : 'lightgrey', // Color of the angle lines
            },
            ticks: {
              backdropColor: theme === "light" ? "transparent" : '#2c3241', // Background color for the tick labels
              color: theme === "light" ? "black" : 'white', // Color of the tick labels
            },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: theme === "light" ? "black" : '#b6dcf6', // Color of the legend text
          }
        }
      }
    }

    const manchaData = {
      labels: labelsForRadar,
      datasets: [
        {
          label: t("WEBSITE.accessibility_plot.label"),
          data: data,
          backgroundColor: theme === "light" ? 'rgba(255, 99, 132, 0.2)' : 'rgba(182, 220, 246, 0.2)',
          borderColor: theme === "light" ? 'rgba(255, 99, 132, 1)' : '#b6dcf6' ,
          borderWidth: 1,
        },
      ],
    };

    return { options, manchaData }
}

// Function to get data for Top Ten for each Good or Bad table
// t -> the translation
// theme -> Dark/Light theme
// labelsForHorizontal -> labels for the Horizontal Bar Graph
// dataForHorizontal -> data for the Horizontal Bar Graph
// color -> Background color for the Bar graph
// RETURNS
// dataHeaders -> Headers for Table
// columnsOptions -> Type of render for Table
// optionsHorizontalBar -> Options for Bar Graph
// horizontalData -> Data for Bar Graph
export function getTopTenGraphTable (t, theme, labelsForHorizontal, dataForHorizontal, color) {
    const dataHeaders = [
        {icon: false, name: t("DIALOGS.errors.level"), justifyCenter: true},
        {icon: false, bigWidth: "50%", name: t("DIALOGS.errors.description")},
        {icon: false, name: t("DIALOGS.errors.pages"), justifyCenter: true},
        {icon: false, name: t("DIALOGS.errors.situations"), justifyCenter: true}
    ]
    
    let columnsOptions = {
        lvl: { type: "Text", center: true, bold: false, decimalPlace: false, ariaLabel: true },
        name: { type: "DangerousHTML", center: false, bold: false, decimalPlace: false },
        nPages: { type: "Number", center: true, bold: false, decimalPlace: false },
        nOccurrences: { type: "Number", center: true, bold: false, decimalPlace: false },
    }
    
    const optionsHorizontalBar = {
        indexAxis: 'y', // This makes the bar chart horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
            }
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: t("DIALOGS.corrections.situations_label"),
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
              font: {
                size: 14
              }
            },
            ticks: {
                color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
            },
            grid: {
                color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
            }
          },
          y: {
            title: {
              display: true,
              text: t("DIALOGS.corrections.tests_label"),
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
              font: {
                size: 14
              }
            },
            ticks: {
                color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Text on Y axis
                callback: function (value, index) {
                    // Fetch the label using the index
                    const label = labelsForHorizontal[index];
                    // Word-wrap the label into multiple lines
                    const words = label.split(' ');
                    const maxLength = 20; // Set the max length for each line
                    let result = '';
                    let line = '';
                    words.forEach((word) => {
                        if (line.length + word.length < maxLength) {
                        line += word + ' ';
                        } else {
                        result += line.trim() + '\n';
                        line = word + ' ';
                        }
                    });
                    result += line.trim();
                    return result;
                }
              },
            grid: {
                color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
            }
          }
        }
    };
    
    const horizontalData = {
        labels: labelsForHorizontal,
        datasets: [
          {
            type: 'bar',
            label: t("DIALOGS.corrections.situations_label"),
            data: dataForHorizontal,
            backgroundColor: color,
            borderWidth: 0,
          }
        ]
    };

    return { dataHeaders, columnsOptions, optionsHorizontalBar, horizontalData }
}


export function checkIfDirectoryOk (id, array) {
  const idObejct = array.directoriesList.find(e => e.id === id)
  return idObejct ? true : false;
}

export function checkIfWebsiteOk (id, websiteId, array) {
  const websiteObejct = array.directories[id].websitesList.find(e => e.id === websiteId)
  return websiteObejct ? true : false;
}
