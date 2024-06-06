import { Icon } from "../../Atoms/Icon";
import { Accordion } from "../../Atoms/Accordion";

import "./styles.css";

const TableComponent = () => {
  const options = [
    {
      id: "1",
      title:
        "I found 1 image on the page without the alternative text equivalent.",
      component: (
        <div>
          Check if the alternative text equivalent found in the images provides
          equal information or function as the one performed by the image on the
          page. H37: Using alt attributes on img elements This WCAG 2.1
          technique is related to: Success criteria 1.1.1 (Level A) Notions
          about the SC 1.1.1
        </div>
      ),
      lvl: "AA",
      iconName: "AMA-Middle-Line",
      ele: "test",
      tdClassName: "warning-cell"
    },
  ];

  return (
    <>
      <table className="table table_primary">
        <caption className="visually-hidden">
          Práticas avaliadas
        </caption>
        <thead>
          <tr>
            <th colSpan="2">Prática encontrada</th>
            <th className="hide-on-small-screen">Nível</th>
            <th className="hide-on-small-screen">
              Ver detalhe
            </th>
          </tr>
        </thead>

        <tbody>
          {options.map((option) => (
            <tr id={option.id} key={option.id}>
              <td className={option?.tdClassName}>
                <span className="visually-hidden">
                  Prática para ver manualmente
                </span>
                <Icon name={option.iconName} />
              </td>
              <td className="mobile-options">
                <Accordion options={[option]} flush={true} id={option.id} />

                <div className="hide_desktop-screen">
                  <span>
                    Nível: {option?.lvl}
                  </span>

                  {option.ele && (
                    <button
                      className="detail_link"
                      aria-label={"Ver detalhe"}
                      aria-describedby={option.id}
                    >
                      <Icon name="AMA-Detalhe-Line" />
                    </button>
                  )}
                </div>
              </td>
              <td className="middle_col hide-on-small-screen">{option?.lvl}</td>

              <td
                className={`hide-on-small-screen ${option.ele ? "" : "visually-hidden"}`}
              >
                <button
                  className="detail_link"
                  aria-label={"Ver detalhe"}
                  aria-describedby={option.id}
                >
                  <Icon name="AMA-Detalhe-Line" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { TableComponent };
