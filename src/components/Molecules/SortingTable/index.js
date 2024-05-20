import React, {useEffect, useState} from "react";
import "./style.css";
import {Icon} from "../../Atoms/Icon"

const SortingTable = ({ headers, dataList, setDataList, nextPage, darkTheme, pagination, itemsPaginationText1, itemsPaginationText2, nItemsPerPageText1, nItemsPerPageText2 }) => {

    //SORT
    const [sort, setSort] = useState({property: "", type: ""});

    //Pagination
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();
    const [nItemsCurrent, setNItemsCurrent] = useState(10);
    const [list, setList] = useState();
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
            let type = sort.type
            if(sort.property !== property) {
                type="asc"
            }
            if(property && typeof a[property] === "string") {
                if(type === "asc") {
                    setSort({property: property, type: "des"})
                    return (a[property]).localeCompare((b[property]));
                } else {
                    setSort({property: property, type: "asc"})
                    return (b[property]).localeCompare((a[property]));
                }
            } else {
                const aValue = a[property];
                const bValue = b[property];

                if (type === "asc") {
                    setSort({property: property, type: "des"})
                    if (aValue === null && bValue !== null) return 1;  // null values come after numbers
                    if (aValue !== null && bValue === null) return -1; // numbers come before null values
                    if (aValue === null && bValue === null) return 0;  // both are null
                    return parseFloat(aValue) - parseFloat(bValue);    // both are numbers
                } else {
                    setSort({property: property, type: "asc"})
                    if (aValue === null && bValue !== null) return -1; // null values come before numbers
                    if (aValue !== null && bValue === null) return 1;  // numbers come after null values
                    if (aValue === null && bValue === null) return 0;  // both are null
                    return parseFloat(bValue) - parseFloat(aValue);    // both are numbers
                }
            }
        })
    }

    const normalSortHeader = (title, property, extraClass, justifyCenter, sortType, nCol, href) => {
        const nOfColumns = nCol ? nCol : 1
        return (
            <th style={{width: href ? "30%" : "10%"}} colSpan={nOfColumns} aria-sort={sort.property === property ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sort.property === property ? `hide-on-small-screen ${extraClass} show_icon` : `hide-on-small-screen ${extraClass}`} onClick={() => setDataList(sortByProperty(property))}>
                <div className={`d-flex ${justifyCenter} align-items-center`}>
                    <span>{title}</span>
                    {sort.property === property && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                </div>
            </th>
        )
    }
    
    const doubleIconSortHeader = (icon, description, property, sortType, nCol) => {
        const nOfColumns = nCol ? nCol : 1
        return (
            <th colSpan={nOfColumns} aria-sort={sort.property === property ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sort.property === property ? "hide-on-small-screen first-show show_icon" : "hide-on-small-screen first-show"} onClick={() => setDataList(sortByProperty(property))}>
                <div className="d-flex align-items-center justify-content-center">
                    <Icon name={icon} />
                    {sort.property === property && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                    <span className="visually-hidden">{description}</span>
                </div>
            </th>
        )
    }

    const renderAttributes = (object) => {
        let id = object.id
        return Object.keys(object).map((key) => {
            if(key !== "id" && key !== "entity") {
                if(typeof object[key] === "string") {
                    return (<td key={key}><a onClick={() => nextPage(id)}>{object[key]}</a></td>)
                } else {
                    if(key === "declaration") {
                        switch(object[key]) {
                            case 1:
                                return (<td key={key} className="td_center"><img src={`/img/SVG_Declaracao_Nao_Conforme.svg`} /></td>)
                            case 2:
                                return (<td key={key} className="td_center"><img src={`/img/SVG_Declaracao_Parcial_Conforme.svg`} /></td>)
                            case 3:
                                return (<td key={key} className="td_center"><img src={`/img/SVG_Declaracao_Conforme.svg`} /></td>)
                            default:
                                return (<td key={key} className="td_center">{object[key]}</td>)
                        }
                    } else if (key === "stamp") {
                        switch(object[key]) {
                            case 1:
                                return (<td key={key} className="td_center"><img src={`/img/SVG_Selo_Bronze.svg`} /></td>)
                            case 2:
                                return (<td key={key} className="td_center"><img src={`/img/SVG_Selo_Prata.svg`} /></td>)
                            case 3:
                                return (<td key={key} className="td_center"><img src={`/img/SVG_Selo_Ouro.svg`} /></td>)
                            default:
                                return (<td key={key} className="td_center">{object[key]}</td>)
                        }
                    } else {
                        return (<td key={key} className="td_center">{Number.isInteger(object[key]) && object[key] !== null ? object[key] : object[key].toFixed(1)}</td>)
                    }
                }
            }
        });
    }

    const renderHeaders = (headerData) => {
        if(headerData.property === "" && headerData.nCol) {
            return (<th colSpan={headerData.nCol} className="hide-on-small-screen td_center">{headerData.name === "" ? "" : headerData.name}</th>)
        } else {
            if(headerData.icon) {
                // Icon Header
                return doubleIconSortHeader(headerData.name, headerData.description, headerData.property, headerData.varType, headerData.nCol)
            } else {
                // Text Header
                return normalSortHeader(headerData.name, headerData.property, headerData.position, headerData.justify, headerData.varType, headerData.nCol, headerData.href)
            }
        }
    }

    return (
        <>
            <table className={`table table_primary ${theme}`} data-sortable="true">
                <caption className="visually-hidden">
                    Testing Sorting Table
                </caption>
                <thead>
                    {headers && Array.isArray(headers[0]) ? 
                        headers.map((row) => {
                            return (<tr>{row.map((h) => { return renderHeaders(h)})}</tr>)
                        })
                    :
                        <tr>
                            {headers.map((row) => {
                                return renderHeaders(row)
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
                    <select className="selection" name="itemsPerPage" id="itemsPerPage" onChange={(e) => setNItemsCurrent(e.target.value)}>
                        <option value="10">10</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                    </select>
                    <span>{nItemsPerPageText2}</span>
                </div>
                <div className="pagination_section">
                    <button disabled={page === 1 ? true : false} className={page === 1 ? "disabled button_dir" : "button_dir"} onClick={() => setPage(1)}>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                    <button disabled={page === 1 ? true : false} className={page === 1 ? "disabled button_dir" : " button_dir"} onClick={() => setPage(page-1)}>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage ? true : false} className={page === lastPage ? "disabled" : ""} onClick={() => setPage(page+1)}>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage ? true : false} className={page === lastPage ? "disabled" : ""} onClick={() => setPage(lastPage)}>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                </div>
            </div>}
        </>
    );
};

export { SortingTable };
