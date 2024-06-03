import React from "react";
import PropTypes from "prop-types";
import { Tabs as BTabs, Tab, Row, Col, Nav } from "react-bootstrap";

import "./styles.css";

const Tabs = ({ tabs, vertical, ...props }) => {
  return (
    <div className={`tabs-container ${vertical ? "vertical-tabs" : ""}`}>
      {vertical ? (
        <BTabs {...props}>
          {tabs.map((item) => (
            <Tab
              key={item.eventKey}
              eventKey={item.eventKey}
              title={item.title}
              disabled={item.disabled}
            >
              {item.component}
            </Tab>
          ))}
        </BTabs>
      ) : (
        <BTabs {...props}>
          {tabs.map((item) => (
            <Tab
              key={item.eventKey}
              eventKey={item.eventKey}
              title={item.title}
              disabled={item.disabled}
            >
              {item.component}
            </Tab>
          ))}
        </BTabs>
      )}
    </div>
  );
};

Tabs.defaultProps = {
  tabs: [],
  className: "mb-3",
  defaultActiveKey: "",
  vertical: false,
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(Object),
  className: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Tabs;
export { Tabs };
