import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb as BBreadcrumb } from "react-bootstrap";

import "./styles.css";

const { Item } = BBreadcrumb;

const Breadcrumb = ({ data, onClick, darkTheme, ...props }) => {

  const { t } = useTranslation();

  // Theme
  const theme = darkTheme ? "dark" : ""
  
  const size = data.length - 1;
  const handleOnClick = (item) => (e) => {
    if (item.href === "") {
      e.preventDefault();
      onClick(item, e);
    }
  };
  return (
    <div className={`breadcrumbs ${theme}`}>
      <BBreadcrumb {...props}>
        {data.map((item, index) => (
          <Item
            key={`id-${index}`}
            href={item.href === "" ? "" : item.href}
            active={index === size}
            onClick={handleOnClick(item)}
            aria-label={index === size ? t("HEADER.DROPDOWN.youarehere") : undefined}
          >
            {item.title}
          </Item>
        ))}
      </BBreadcrumb>
    </div>
  );
};

Breadcrumb.defaultProps = {
  data: [],
  onClick: () => {},
  darkTheme: false
};

Breadcrumb.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
  darkTheme: PropTypes.bool
};

export default Breadcrumb;
export { Breadcrumb };
