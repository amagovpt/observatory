import React, {useState} from "react";
import "./style.css";
import {Icon} from "../../Atoms/Icon"

const SortingTable = ({ headers, data, setData }) => {
    const [sort, setSort] = useState({property: "", type: ""});

    const sortByProperty = (property, sortType) => {
        return data.slice().sort((a, b) => {
            let type = sort.type
            if(sort.property !== property) {
                type="asc"
            }
    
            if(sortType === "string") {
                if(type === "asc") {
                    setSort({property: property, type: "des"})
                    return a[property].localeCompare(b[property]);
                } else {
                    setSort({property: property, type: "asc"})
                    return b[property].localeCompare(a[property]);
                }
            } else {
                if(type === "asc") {
                    setSort({property: property, type: "des"})
                    return parseFloat(a[property]) - parseFloat(b[property]);
                } else {
                    setSort({property: property, type: "asc"})
                    return parseFloat(b[property]) - parseFloat(a[property]);
                }
            }
        })
    }

    const normalSortHeader = (title, property, extraClass, justifyCenter, sortType, nCol, href) => {
        const nOfColumns = nCol ? nCol : 1
        return (
            <th style={{width: href ? "70%" : "10%"}} colSpan={nOfColumns} aria-sort={sort.property === property ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sort.property === property ? `hide-on-small-screen ${extraClass} show_icon` : `hide-on-small-screen ${extraClass}`} onClick={() => setData(sortByProperty(property, sortType))}>
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
            <th colSpan={nOfColumns} aria-sort={sort.property === property ? (sort.type === "asc" ? "descending" : "ascending"):null} className={sort.property === property ? "hide-on-small-screen first-show show_icon" : "hide-on-small-screen first-show"} onClick={() => setData(sortByProperty(property, sortType))}>
                <div className="d-flex align-items-center">
                    <Icon name={icon} />
                    {sort.property === property && sort.type === "asc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />}
                    <span className="visually-hidden">{description}</span>
                </div>
            </th>
        )
    }

    const renderAttributes = (object) => {
        return Object.keys(object).map((key) => {
            if(object[key] && !object[key].href){
                if(object[key].includes("SVG_")) {
                    return (<td key={key}>
                        <img src={`/img/${object[key]}.svg`} alt="SVG Image" />
                    </td>)
                } else {
                    return (<td key={key}>{object[key]}</td>)
                }
            } else {
                return (<td key={key}><a href={object[key].href}>{object[key].name}</a></td>)
            }
        });
    }

    const renderHeaders = (headerData) => {
        if(headerData.property === "" && headerData.nCol) {
            return (<th colSpan={headerData.nCol} className="hide-on-small-screen">{headerData.name === "" ? "" : headerData.name}</th>)
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
        <table className="table table_primary" data-sortable="true">
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
                {data.map((row) => {
                    return (
                        <tr>
                            {renderAttributes(row)}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export { SortingTable };
