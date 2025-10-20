export function createStatisticsObject(page, data, moment) {
    return {
        score: (data.score).toFixed(1),
        recentPage: moment(data.recentPage).format("LL"),
        oldestPage: moment(data.oldestPage).format("LL"),
        statsTable: getStatsTable(page, data)
    }
}

function getStatsTable(page, data) {
    switch(page){
        case "home":
            return [
                data.nDirectories,
                data.nEntities,
                data.nWebsites,
                data.nPages,
            ];
        case "directories":
            return [
                data.nDirectories,
                data.nEntities,
                data.nWebsites,
                data.nPages,
            ];
        case "directory":
            return [
                data.nEntities,
                data.nWebsites,
                data.nPages,
            ];
        case "website":
            return [
                data.nPages,
                data.pagesWithoutErrors,
                data.pagesWithErrors,
                data.pagesWithoutErrorsA,
                data.pagesWithoutErrorsAA,
                data.pagesWithoutErrorsAAA
            ];
    }
}