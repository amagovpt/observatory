import React from "react";
import "./style.css";

import { Gauge } from "../../Atoms/Gauge";
import { Button } from "../../Atoms/Button";

const StatisticsHeader = ({ darkTheme, stats, statsTitles, title, subtitle, oldestPage, newestPage, gaugeTitle, moment }) => {

    const theme = darkTheme ? "dark" : ""

    const extraStats = (title, subtitle) => {
        return (
            <div className="d-flex flex-column margin_mobile">
                <span className="span_title">{title}</span>
                <span className="span_subtitle">{subtitle}</span>
            </div>
        )
    }

    return (
        <div className={`${theme} d-flex flex-column section_container`}>
            {/* Web version */}
            <div className="grid_container">
                <div className="d-flex flex-column first_row">
                    <span className="container_title">{title}</span>
                    <span>{subtitle}</span>
                </div>
                <div className="first_row second_column">
                    <div className="d-flex flex-column">
                        <span className="second_column_title">{oldestPage}</span>
                        <span className="second_column_subtitle">{moment(stats.oldestPage).format("LL")}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="second_column_title">{newestPage}</span>
                        <span className="second_column_subtitle">{moment(stats.recentPage).format("LL")}</span>
                    </div>
                </div>
                <div className="second_row">
                    <Gauge percentage={stats.score} title={gaugeTitle}/>
                </div>
                <div className="second_row last_column">
                    {stats.statsTable.map((stat, index) => {
                        return extraStats(stat, statsTitles[index])
                    })}
                </div>
            </div>

            {/* Mobile version */}
            <div className="grid_container_mobile">
                <div className="d-flex flex-column row first_row">
                    <span className="container_title">{title}</span>
                    <span>{subtitle}</span>
                </div>
                <div className="row second_row">
                    <Gauge percentage={stats.score} title={gaugeTitle}/>
                </div>
                <div className="row third_row">
                    <div className="d-flex flex-column first_data">
                        <span className="second_column_title">{oldestPage}</span>
                        <span className="second_column_subtitle">{moment(stats.oldestPage).format("LL")}</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="second_column_title">{newestPage}</span>
                        <span className="second_column_subtitle">{moment(stats.recentPage).format("LL")}</span>
                    </div>
                </div>
                <div className="row fourth_row">
                    {stats.statsTable.map((stat, index) => {
                        return extraStats(stat, statsTitles[index])
                    })}
                </div>
            </div>

            <div className="d-flex flex-row justify-content-end gap-4 buttons_mobile">
                <Button variant="primary" text={"Distribuições de pontuações"} />
                <Button variant="success" text={"Boas práticas"} />
                <Button variant="danger" text={"Más práticas"} />
            </div>
        </div>
    );
};

export { StatisticsHeader };
