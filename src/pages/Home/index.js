import "./styles.css";

import { Breadcrumb } from "../../components/index";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import { useTranslation } from "react-i18next";

export default function Home({ changeState }) {
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    { title: "Observatório", href: "/" },
  ];

  const { theme } = useContext(ThemeContext);
  const main_content_home = theme === "light" ? "" : "main_content_home";

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} />
        </div>

        <section
          className={`bg-white validator_container ${main_content_home}`}
        >
          <div className="d-flex flex-column align-items-stretch left_container">
            <p className="validator_container_description">
              {t("HOME_PAGE.intro_text")}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}