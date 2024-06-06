import { useTranslation } from "react-i18next";

// Components
import { Icon } from "../../../components/index"

export function Top5_Practices({ data, title, icon }) {

  const { t } = useTranslation();

  return (
    <>
      <div className="flex-1 mobile_margin">
        <div className="d-flex flex-row align-items-center">
          <Icon name={icon} />
          <h2 className="ms-2">{title}</h2>
        </div>
        <ul className="ps-0">
        {data.map((practice, index) => 
          <li className="d-flex align-items-center mb-3">
            <span className="top5_number pt-1 me-2">{index+1}</span>
            <span>{t(`RESULTS.${practice.key}`)}</span>
          </li>
        )}
        </ul>
      </div>
    </>
  );
}
