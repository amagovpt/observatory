import { useTranslation } from "react-i18next";

// Components
import { Icon, Tabs } from "ama-design-system"

export function ObservatoryInfoTabs({ }) {

  const { t } = useTranslation();

  // Each vertical tab
  const tab = (title, paragraph, bullet1, bullet2, bullet3) => {
    return (
      <div className="tabs_info_container">
        <h2 className="bold">{title}</h2>
        <p className="ama-typography-body-large">{paragraph}</p>
        <ul className="ps-0">
          <li className="d-flex p-1">
            <Icon name="AMA-Ponto-Solid" />
            <p className="ama-typography-body-large pt-2">{bullet1}</p>
          </li>
          <li className="d-flex p-1">
            <Icon name="AMA-Ponto-Solid" />
            <p className="ama-typography-body-large pt-2">{bullet2}</p>
          </li>
          <li className="d-flex p-1">
            <Icon name="AMA-Ponto-Solid" />
            <p className="ama-typography-body-large pt-2">{bullet3}</p>
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
