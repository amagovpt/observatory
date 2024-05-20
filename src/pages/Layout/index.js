import { useContext } from "react";
import { Footer, Header } from "../../components";
import { ThemeContext } from "../../context/ThemeContext";
import "./styles.css";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const mainDark = theme === "light" ? "" : "main_dark";

  return (
    <>
      <Header description={t("HEADER.text")} title={t("HEADER.title.part1")} title2={t("HEADER.title.part2")} />
      <main className={`main ${mainDark}`} id="content">
        {children}
      </main>

      <Footer />
    </>
  );
}
