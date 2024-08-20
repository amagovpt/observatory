import { useContext } from "react";
import { Footer, Header } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom'

import { pathURL } from "../../App";

export default function Layout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation()
  const mainDark = theme === "light" ? "" : "main_dark";

  const { t, i18n: {language, changeLanguage} } = useTranslation();

  const toggleLanguage = () => {
    if (language === "en") {
      changeLanguage("pt");
      document.querySelector("html")?.setAttribute("lang", "pt-PT");
    } else {
      changeLanguage("en");
      document.querySelector("html")?.setAttribute("lang", "en");
    }
  };

  return (
    <>
      <Header
        description={t("HEADER.text")}
        title={t("HEADER.title.part1")}
        title2={t("HEADER.title.part2")}
        darkTheme={theme}
        homePage={location.pathname === `${pathURL}` ? true : false}
        language={language}
        changeLanguage={toggleLanguage}
        changeTheme={toggleTheme}
        linkTo={`${pathURL}`}
        ariaLabel={t("HEADER.header_arial_label")}
      />
      <main className={`main ${mainDark}`} id="content" aria-label={t("HOME.main_aria")}>
        {children}
      </main>

      <Footer darkTheme={theme} />
    </>
  );
}
