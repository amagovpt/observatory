import React, {useEffect, useState} from "react";
import "./style.css";
import {Icon} from "../../Atoms/Icon"

const SortingTable = ({ hasSort, caption, headers, dataList, setDataList, columnsOptions, nextPage, darkTheme, pagination, itemsPaginationText1, itemsPaginationText2, nItemsPerPageText1, nItemsPerPageText2, iconsAltTexts, paginationButtonsTexts }) => {

    //SORT
    const [sort, setSort] = useState({property: "", type: ""});

    //Pagination
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [nItemsCurrent, setNItemsCurrent] = useState(50);
    const [list, setList] = useState(null);
    const nAllItems = dataList && dataList.length

    const theme = darkTheme ? "dark" : ""

    useEffect(() => {
        if(dataList && pagination) {
            setPage(1)
            setLastPage(Math.ceil(dataList.length / nItemsCurrent))
            setList(dataList.slice(0, nItemsCurrent))
        } else {
            setList(dataList)
        }
    }, [nItemsCurrent, dataList])

    useEffect(() => {
        if(dataList && pagination) {
            const start = page === 1 ? 0 : (page-1) * nItemsCurrent
            const end = page === 1 ? nItemsCurrent : page * nItemsCurrent
            setList(dataList.slice(start, end))
        } else {
            setList(dataList)
        }
    }, [page])

    const sortByProperty = (property) => {
        return dataList.slice().sort((a, b) => {
            const valueA = a[property]
            const valueB = b[property]

            let type = sort.type
            if(sort.property !== property) {
                type="asc"
            }
            if(property && typeof valueA === "string") {
                if(type === "asc") {
                    setSort({property: property, type: "des"})
                    return (valueA).localeCompare((valueB));
                } else {
                    setSort({property: property, type: "asc"})
                    return (valueB).localeCompare((valueA));
                }
            } else {
                if (type === "asc") {
                    setSort({property: property, type: "des"})
                    if (valueA === null && valueB !== null) return 1;  // null values come after numbers
                    if (valueA !== null && valueB === null) return -1; // numbers come before null values
                    if (valueA === null && valueB === null) return 0;  // both are null
                    return parseFloat(valueA) - parseFloat(valueB);    // both are numbers
                } else {
                    setSort({property: property, type: "asc"})
                    if (valueA === null && valueB !== null) return -1; // null values come before numbers
                    if (valueA !== null && valueB === null) return 1;  // numbers come after null values
                    if (valueA === null && valueB === null) return 0;  // both are null
                    return parseFloat(valueB) - parseFloat(valueA);    // both are numbers
                }
            }
        })
    }

    const renderHeader = (headerData) => {
        const nOfColumns = headerData.nCol ? headerData.nCol : 1
        if(!hasSort || hasSort && nOfColumns !== 1) {
            const justifyCenter = headerData.justifyCenter ? "td_center" : ""
            return (<th style={{width: headerData.bigWidth ? headerData.bigWidth : "10%"}} colSpan={nOfColumns} className={`hide-on-small-screen ${justifyCenter} no_pointer`}>{headerData.name === "" ? "" : headerData.name}</th>)
        } else {
            const sameProp = sort.property === headerData.property
            const justifyCenter = headerData.justifyCenter ? "justify-content-center" : ""
            if(headerData.icon) {
                // Icon Header
                return (
                    <th colSpan={nOfColumns} aria-sort={sameProp ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sameProp ? "hide-on-small-screen first-show show_icon" : "hide-on-small-screen first-show"} onClick={() => setDataList(sortByProperty(headerData.property))}>
                        <div className="d-flex align-items-center justify-content-center">
                            <Icon name={headerData.name} />
                            {sameProp && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                            <span className="visually-hidden">{headerData.description}</span>
                        </div>
                    </th>
                )
            } else {
                // Text Header
                return (
                    <th style={{width: headerData.bigWidth ? headerData.bigWidth : "10%"}} colSpan={nOfColumns} aria-sort={sameProp ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sameProp ? `hide-on-small-screen show_icon` : `hide-on-small-screen`} onClick={() => setDataList(sortByProperty(headerData.property))}>
                        <div className={`d-flex ${justifyCenter} align-items-center`}>
                            <span>{headerData.name}</span>
                            {sameProp && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                        </div>
                    </th>
                )
            }
        }
    }

    const renderSpans = (spans) => {
        return spans.map((span) => {
            return (<span>{span}</span>)
        })
    }

    const renderAttributes = (row) => {
        return Object.keys(row).map((key) => {
            let center = columnsOptions[key].center ? "td_center" : ""
            let bold = columnsOptions[key].bold ? "bold" : ""
            switch(columnsOptions[key].type) {
                case "Skip":
                    return null
                case "Number":
                    return (<td className={`${center} ${bold}`}>{columnsOptions[key].decimalPlace ? row[key].toFixed(1) : row[key]}</td>)
                case "Link":
                    return (<td><a onClick={() => nextPage(row, key)}>{row[key]}</a></td>)
                case "Text":
                    return (<td className={`${center} ${bold}`}>{row[key]}</td>)
                case "Stamp":
                    switch(row[key]) {
                        case 1:
                            return (<td className={`${center} ${bold}`}><img src={`/img/SVG_Selo_Bronze.svg`} alt={iconsAltTexts[0]} /></td>)
                        case 2:
                            return (<td className={`${center} ${bold}`}><img src={`/img/SVG_Selo_Prata.svg`} alt={iconsAltTexts[1]} /></td>)
                        case 3:
                            return (<td className={`${center} ${bold}`}><img src={`/img/SVG_Selo_Ouro.svg`} alt={iconsAltTexts[2]} /></td>)
                        default:
                            return (<td className={`${center} ${bold}`}>{row[key]}</td>)
                    }
                case "Declaration":
                    switch(row[key]) {
                        case 1:
                            return (<td className={`${center} ${bold}`}><img src={`/img/SVG_Declaracao_Nao_Conforme.svg`} alt={iconsAltTexts[3]} /></td>)
                        case 2:
                            return (<td className={`${center} ${bold}`}><img src={`/img/SVG_Declaracao_Parcial_Conforme.svg`} alt={iconsAltTexts[4]} /></td>)
                        case 3:
                            return (<td className={`${center} ${bold}`}><img src={`/img/SVG_Declaracao_Conforme.svg`} alt={iconsAltTexts[5]} /></td>)
                        default:
                            return (<td className={`${center} ${bold}`}>{row[key]}</td>)
                    }
                case "MultiText":
                    return (<td className={`${center} ${bold} d-flex flex-column multi-text`}>{renderSpans(row[key])}</td>)
                case "DoubleText":
                    return (<td className={`${center} ${bold}`}><span >{row[key][0]}</span><span className={`bold`}>{row[key][1]}</span></td>)
                default:
                    return <td>{null}</td>
            }
        })
    }

    return (
        <div className="table-responsive">
            <table className={`table table_primary ${theme}`} data-sortable="true">
                <caption className="visually-hidden">
                    {caption}
                </caption>
                <thead>
                    {headers && Array.isArray(headers[0]) ? 
                        headers.map((row) => {
                            return (<tr>{row.map((th) => { return renderHeader(th)})}</tr>)
                        })
                    :
                        <tr>
                            {headers.map((th) => {
                                return renderHeader(th)
                            })}
                        </tr>
                    }
                </thead>

                <tbody>
                    {list && list.map((row) => {
                        return (
                            <tr>
                                {renderAttributes(row)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {pagination && <div className={`d-flex flex-row justify-content-between pagination ${theme}`}>
                <div className="pagination_section">
                    {((page-1)*nItemsCurrent)+ 1 + " - " + (nAllItems > nItemsCurrent && page !== lastPage ? (page*nItemsCurrent) : nAllItems) + itemsPaginationText1 + nAllItems + itemsPaginationText2}
                </div>
                <div className="pagination_section">
                    <span>{nItemsPerPageText1}</span>
                    <select aria-label="Number of rows per page" className="selection" name="itemsPerPage" id="itemsPerPage" onChange={(e) => setNItemsCurrent(e.target.value)}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                    </select>
                    <span>{nItemsPerPageText2}</span>
                </div>
                <div className="pagination_section">
                    <button disabled={page === 1 ? true : false} className={page === 1 ? "disabled button_dir" : "button_dir"} onClick={() => setPage(1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[0]}</span>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                    <button disabled={page === 1 ? true : false} className={page === 1 ? "disabled button_dir" : " button_dir"} onClick={() => setPage(page-1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[1]}</span>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage ? true : false} className={page === lastPage ? "disabled" : ""} onClick={() => setPage(page+1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[2]}</span>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage ? true : false} className={page === lastPage ? "disabled" : ""} onClick={() => setPage(lastPage)}>
                        <span className="visually-hidden">{paginationButtonsTexts[3]}</span>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                </div>
            </div>}
        </div>
    );
};

export { SortingTable };
