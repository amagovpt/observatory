import { useTranslation } from "react-i18next";

// Components
import { Icon, Tabs } from "../../../components/index"

export function ObservatoryInfoTabs({ }) {

  const { t } = useTranslation();

  // Each vertical tab
  const tab = (title, paragraph, bullet1, bullet2, bullet3) => {
    return (
      <div className="tabs_info_container">
        <h2>{title}</h2>
        <p>{paragraph}</p>
        <ul>
          <li>
            <Icon name="AMA-Ponto-Solid" />
            <span className="pt-2">{bullet1}</span>
          </li>
          <li>
            <Icon name="AMA-Ponto-Solid" />
            <span className="pt-2">{bullet2}</span>
          </li>
          <li>
            <Icon name="AMA-Ponto-Solid" />
            <span className="pt-2">{bullet3}</span>
          </li>
        </ul>
      </div>
    )
  }

  // Vertical tabs
  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("HOME.tabs._1.title"),
      component: tab(t("HOME.tabs._1.title"), t("HOME.tabs._1.paragraph"), t("HOME.tabs._1.bullet1"), t("HOME.tabs._1.bullet2"), t("HOME.tabs._1.bullet3")),
    },
    {
      eventKey: "tab2",
      title: t("HOME.tabs._2.title"),
      component: tab(t("HOME.tabs._2.title"), t("HOME.tabs._2.paragraph"), t("HOME.tabs._2.bullet1"), t("HOME.tabs._2.bullet2"), t("HOME.tabs._2.bullet3")),
    },
    {
      eventKey: "tab3",
      title: t("HOME.tabs._3.title"),
      component: tab(t("HOME.tabs._3.title"), t("HOME.tabs._3.paragraph"), t("HOME.tabs._3.bullet1"), t("HOME.tabs._3.bullet2"), t("HOME.tabs._3.bullet3")),
    },
  ];

  return (
    <>
      <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={true} />
    </>
  );
}
