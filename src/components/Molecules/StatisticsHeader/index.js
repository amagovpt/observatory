import React from "react";
import "./style.css";

import { Gauge } from "../../Atoms/Gauge";
import { Button } from "../../Atoms/Button";

const StatisticsHeader = ({ darkTheme, stats, statsTitles, doubleRow, title, subtitle, oldestPage, newestPage, gaugeTitle, buttons }) => {

    // Theme
    const theme = darkTheme ? "dark" : ""

    // Normal stats with Value (Title) and description (Subtitle)
    const normalExtraStats = (value, subtitle) => {
        return (
            <div className="d-flex flex-column margin_mobile">
                <span className="span_title">{value}</span>
                <span className="span_subtitle">{subtitle}</span>
            </div>
        )
    }

    // Stats with percentage and multiple subtitles
    const percentageStats = (value, object, total, first) => {
        const percentage = (value*100/total).toFixed(1)
        return (
            <div className="d-flex flex-column margin_mobile">
                <span className="percentage_title">
                    {value}
                    {!first ? <span className="percentage">{percentage}%</span> : null}
                </span>
                {object.subtitle2 !== "" ? <span className="percentage_subtitle extra">{object.subtitle2}</span> : null}
                <span className="percentage_subtitle">{object.subtitle}</span>
            </div>
        )
    }

    return (
        <div className={`${theme} d-flex flex-column section_container p-3 m-0`}>
            {/* Web version */}
            <div className="grid_container">
                <div className="d-flex flex-column first_row">
                    <span className="container_title">{title}</span>
                    <span className="container_subtitle">{subtitle}</span>
                </div>
                <div className="first_row second_column">
                    <div className="d-flex flex-column">
                        <span className="second_column_title">{oldestPage}</span>
                        <span className="second_column_subtitle">{stats.oldestPage}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="second_column_title">{newestPage}</span>
                        <span className="second_column_subtitle">{stats.recentPage}</span>
                    </div>
                </div>
                <div className="second_row">
                    <Gauge percentage={stats.score} title={gaugeTitle}/>
                </div>
                {/* doubleRow checks if its just one row os stats or two */}
                <div className={`second_row last_column ${doubleRow ? "double" : ""}`}>
                    {doubleRow ?
                        <>
                            <div className="double_row first">
                                {stats.statsTable.map((stat, index) => {
                                    const total = stats.statsTable[0]
                                    const first = index === 0
                                    return index < 3 ? percentageStats(stat, statsTitles[index], total, first) : null
                                })}
                            </div>
                            <div className="double_row">
                                {stats.statsTable.map((stat, index) => {
                                    const total = stats.statsTable[0]
                                    return index >= 3 ? percentageStats(stat, statsTitles[index], total) : null
                                })}
                            </div>
                        </>
                    : stats.statsTable.map((stat, index) => {
                        return normalExtraStats(stat, statsTitles[index])
                    })}
                </div>
            </div>

            {/* Mobile version */}
            <div className="grid_container_mobile">
                <div className="d-flex flex-column row first_row">
                    <span className="container_title">{title}</span>
                    <span className="container_subtitle">{subtitle}</span>
                </div>
                <div className="row second_row">
                    <Gauge percentage={stats.score} title={gaugeTitle}/>
                </div>
                <div className="row third_row">
                    <div className="d-flex flex-column first_data">
                        <span className="second_column_title">{oldestPage}</span>
                        <span className="second_column_subtitle">{stats.oldestPage}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="second_column_title">{newestPage}</span>
                        <span className="second_column_subtitle">{stats.recentPage}</span>
                    </div>
                </div>
                <div className="row fourth_row">
                    {stats.statsTable.map((stat, index) => {
                        const total = stats.statsTable[0]
                        const first = index === 0
                        return doubleRow ? percentageStats(stat, statsTitles[index], total, first) : normalExtraStats(stat, statsTitles[index])
                    })}
                </div>
            </div>

            {buttons && <div className="d-flex flex-row justify-content-end gap-4 buttons_mobile">
                <Button variant="primary" text={"Distribuições de pontuações"} />
                <Button variant="success" text={"Boas práticas"} />
                <Button variant="danger" text={"Más práticas"} />
            </div>}
        </div>
    );
};

export { StatisticsHeader };
