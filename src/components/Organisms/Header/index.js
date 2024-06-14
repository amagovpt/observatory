import { useTranslation } from "react-i18next"

import LogoAcessmonitor from "./components/content-logo";

import { TopBar } from "./components/top-bar";
import { WidgetBar } from "./components/widgets-bar";

import "./styles/styles.css";

export function Header({description, title, title2}) {
  const {t} = useTranslation()
  return (
    <header id="wrapper-navbar" aria-label={t("HEADER.header_arial_label")}>
      <div className="skip-to-content">
        <div className="container">
          <a className="skip-to-content-link p-0 d-flex align-items-center" href="#content">
            <span className="ama-typography-action-small py-2 px-3">{t("MISC.skip_to_main")}</span>
          </a>
        </div>
      </div>

      <TopBar />

      <WidgetBar
        logo={<LogoAcessmonitor />}
        title={title}
        title2={title2}
        description={description}
      />
    </header>
  );
}
