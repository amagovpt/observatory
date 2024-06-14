import React, {useEffect, useState} from "react";
import "./style.css";
import {Icon} from "../../Atoms/Icon"

/*
    hasSort -> If Table has sorting
    caption -> Table caption
    headers -> Custom Array of Headers
    dataList -> Array of data
    setDataList -> Set function to change the data shown based on sorting
    columnsOptions -> Custom array to help render the data cells
    nextPage -> Function used for the button click
    darkTheme -> If Dark theme activated or not
    pagination -> If Table has pagination
    itemsPaginationTexts -> Texts for the text telling how many items in that page out of the total
    nItemsPerPageTexts -> Texts for the selection of how many items per page (Pagination)
    iconsAltTexts -> Alternative texts for the icons of the data cells
    paginationButtonsTexts ->  texts for accessibility screen readers for the 4 buttons of pagination (Pagination)
*/
const SortingTable = ({ hasSort, caption, headers, dataList, setDataList, columnsOptions, nextPage, darkTheme, pagination, itemsPaginationTexts, nItemsPerPageTexts, iconsAltTexts, paginationButtonsTexts }) => {

    //SORT
    const [sort, setSort] = useState({property: "", type: ""});

    //Pagination
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [nItemsCurrent, setNItemsCurrent] = useState(50);
    const [list, setList] = useState(null);
    const nAllItems = dataList && dataList.length

    // Theme
    const theme = darkTheme ? "dark" : ""

    // useEffect that gives the data to the table
    // based on how many items per page is to be shown
    useEffect(() => {
        if(dataList && pagination) {
            setPage(1)
            setLastPage(Math.ceil(dataList.length / nItemsCurrent))
            setList(dataList.slice(0, nItemsCurrent))
        } else {
            setList(dataList)
        }
    }, [nItemsCurrent, dataList])

    // useEffect that runs after a page change
    // Gives the new data to the table
    useEffect(() => {
        if(dataList && pagination) {
            const start = page === 1 ? 0 : (page-1) * nItemsCurrent
            const end = page === 1 ? nItemsCurrent : page * nItemsCurrent
            setList(dataList.slice(start, end))
        } else {
            setList(dataList)
        }
    }, [page])

    // Property sorting function
    const sortByProperty = (property) => {
        return dataList.slice().sort((a, b) => {
            // Gets the values for the given property
            const valueA = a[property]
            const valueB = b[property]

            // If its not the same property then the order is always ASCENDING
            // If its a repeting property then the type being ASCENDING will make
            // in the if's below to sort by DESCENDING
            let type = sort.type
            if(sort.property !== property) {
                type="asc"
            }
            if(property && typeof valueA === "string") {
                if(type === "asc") {
                    // Set the last property and type of sorting
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

    // Function that renders the Headers of the Table
    // Receives an Object from the custom array that tells everything we need to render
    const renderHeader = (headerData) => {

        // If it specifies a nCol means that the header will be more than 1 column
        const nOfColumns = headerData.nCol ? headerData.nCol : 1

        // If the table doesn't have sorting OR it has but this specific column will ocuppy more than 1
        // Then it means it will be a normal text render with no sorting icon or functionallity
        if(!hasSort || hasSort && nOfColumns !== 1) {
            const justifyCenter = headerData.justifyCenter ? "text-center" : ""
            if(headerData.icon) {
                // Icon Header
                // Icons need to have a discription with the class visually-hidden for accessibility screen readers
                return (
                    <th colSpan={nOfColumns} className={`hide-on-small-screen ${justifyCenter} no_pointer first-show`}>
                        <Icon name={headerData.name} />
                        <span className="visually-hidden">{headerData.description}</span>
                    </th>
                )
            } else {
                // If column has bidWidth it means that column ocupies more than normal on the size of the table
                return (
                    <th style={{width: headerData.bigWidth ? headerData.bigWidth : "10%"}} colSpan={nOfColumns} className={`hide-on-small-screen ${justifyCenter} no_pointer`}>
                        {/* If there is nothing to be rendered on the table, render a visually-hidden text because of accessibility */}
                        {!headerData?.empty ? <span className="ama-typography-body bold">{headerData.name}</span> : <span className="visually-hidden">Empty</span>}
                    </th>
                )
            }
        } else {
            // sameProp is used to see which Icon to render
            const sameProp = sort.property === headerData.property
            const justifyCenter = headerData.justifyCenter ? "justify-content-center" : ""
            // If the column will be a Icon or a Text being displayed
            if(headerData.icon) {
                // Icon Header
                // Icons need to have a discription with the class visually-hidden for accessibility screen readers
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
                            <span className="ama-typography-body bold">{headerData.name}</span>
                            {sameProp && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                        </div>
                    </th>
                )
            }
        }
    }


    const renderSpans = (spans) => {
        return spans.map((span) => {
            return (<span className="ama-typography-body mb-1">{span}</span>)
        })
    }

    // Function that renders the individual cells on the table
    // We receive an entire data row, then we go 1 by 1 on the properties of the object
    // Then we also get help from our --> columnsOptions
    // This custom array passed to the component helps us know what to render and what specifics for each cell
    // the custom array will have the same exact properties and for each one will tell if its a Text or a Number or an Icon ...
    const renderAttributes = (row) => {
        return Object.keys(row).map((key) => {
            let center = columnsOptions[key].center ? "text-center" : ""
            let bold = columnsOptions[key].bold ? "bold" : ""
            // Use the custom array to check the type of render to do
            switch(columnsOptions[key].type) {
                case "Skip":
                    // Don't render this property
                    return null
                case "Number":
                    // Render a number, if it has "decimalPlace" as TRUE then render the number with 1 decimal place
                    return (<td className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].decimalPlace ? row[key].toFixed(1) : row[key]}</td>)
                case "Button":
                    // Render a button disguised as a text link
                    return (<td><button className="sortingTableButton" onClick={() => nextPage(row, key)}>{row[key]}</button></td>)
                case "Text":
                    // Render normal text
                    return (<td className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>)
                case "Stamp":
                    // Render one of the 3 Stamp Icons based on the number received (from: 1 to 3)
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
                    // Render one of the 3 Declaration Icons based on the number received (from: 1 to 3)
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
                    // Render 2 or more spans that are all normal text.
                    return (<td className={`${center} ${bold} d-flex flex-column multi-text`}>{renderSpans(row[key])}</td>)
                case "DoubleText":
                    // Render 2 texts where the second one is bold and the first one not. If this property also comes with bold then all text will be bold
                    return (<td className={`${center} ${bold}`}><span className="ama-typography-body">{row[key][0]}</span><span className="ama-typography-body bold">{row[key][1]}</span></td>)
                default:
                    // Render an empty cell
                    return <td>{null}</td>
            }
        })
    }

    return (
        <div className={`table-responsive ${theme}`}>
            <table className="table table_primary" data-sortable="true">
                {/* Table caption -> descripton of the table */}
                <caption className="visually-hidden">
                    {caption}
                </caption>
                <thead>
                    {/* Check if the array has multiple sub-arrays or not
                        If Yes then means theres more than 1 row of headers
                        If No then it's just 1 row of headers
                    */}
                    {headers && Array.isArray(headers[0]) ? 
                        // Multiple rows of headers
                        headers.map((row) => {
                            return (<tr>{row.map((th) => { return renderHeader(th)})}</tr>)
                        })
                    :
                        <>
                            {/* Just 1 row of headers */}
                            <tr>
                                {headers.map((th) => {
                                    return renderHeader(th)
                                })}
                            </tr>
                        </>
                    }
                </thead>

                <tbody>
                    {/* Render the data cells of the table */}
                    {list && list.map((row) => {
                        return (
                            <tr>
                                {renderAttributes(row)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Pagination */}
            {pagination && <div className={`d-flex flex-row justify-content-between pagination ${theme}`}>
                {/* Section informing the number of items in that page from the total*/}
                <div className="ama-typography-body pagination_section">
                    {((page-1)*nItemsCurrent)+ 1 + " - " + (nAllItems > nItemsCurrent && page !== lastPage ? (page*nItemsCurrent) : nAllItems) + itemsPaginationTexts[0] + nAllItems + itemsPaginationTexts[1]}
                </div>

                {/* Section informing the number of items per page and option to change */}
                <div className="pagination_section">
                    <span className="ama-typography-body">{nItemsPerPageTexts[0]}</span>
                    <select aria-label="Number of rows per page" className="selection" name="itemsPerPage" id="itemsPerPage" onChange={(e) => setNItemsCurrent(e.target.value)}>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="250">250</option>
                        <option value="500">500</option>
                    </select>
                    <span className="ama-typography-body">{nItemsPerPageTexts[1]}</span>
                </div>

                {/* Section with the pagination navigation */}
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
