import { Icon } from "../../../index";
import "./styles.css";

export function TableAlternative() {
  return (
    <>
      <table className="table table-bordereds table-alterantive">
        <caption className="visually-hidden">Sumário das práticas avaliadas</caption>
        <thead>
          <tr className="mobile_table">
            <th scope="col" className="text-left border_right practices_found_container">
              <span className="total_practices">33</span>{" "}
              <span className="practices_found">práticas encontradas</span>
            </th>
            <th className="border_right heading_total total_top">A</th>
            <th className="border_right heading_total total_top">AA</th>
            <th className="border_right heading_total total_top">AAA</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <Icon name="AMA-Check-Line" />

                  <span className="title">Aceitáveis</span>
                </div>
                <div
                  className="overlay overlay_aceptable"
                  style={{ width: "70%" }}
                />

                <span className="ammount">24 </span>
              </div>
              {/* MOBILE */}
              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>A</span>
                  <span>14</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AA</span>
                  <span>10</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AAA</span>
                  <span>0</span>
                </div>
              </div>
            </th>
            {/* DESKTOP */}

            <td className="border_right body_text desk_row">
              14
            </td>
            <td className="border_right body_text desk_row">
              10
            </td>
            <td className="border_right body_text desk_row">
              0
            </td>
          </tr>

          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <Icon name="AMA-Middle-Line" />
                  <span className="title">Para ver manualmente</span>
                </div>
                <div
                  className="overlay overlay_manual"
                  style={{ width: "20%" }}
                />

                <span className="ammount">7</span>
              </div>
              {/* MOBILE */}
              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>A</span>
                  <span>4</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AA</span>
                  <span>0</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AAA</span>
                  <span>3</span>
                </div>
              </div>
            </th>
            {/* DESKTOP */}

            <td className="border_right body_text desk_row">
              4
            </td>
            <td className="border_right body_text desk_row">
              0
            </td>
            <td className="border_right body_text desk_row">
              3
            </td>
          </tr>

          <tr>
            <th scope="row" className="border_right">
              <div className="aceptable_continer">
                <div className="icon_and_text">
                  <Icon name="AMA-Wrong-Line" />

                  <span className="title">Não aceitáveis</span>
                </div>

                <div
                  className="overlay overlay_no_aceptable"
                  style={{ width: "2%" }}
                />

                <span className="ammount">2</span>
              </div>
              {/* MOBILE */}

              <div className="d-flex flex-row justify-content-end mobile_row-container">
                <div className="d-flex flex-column mobile-row">
                  <span>A</span>
                  <span>1</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AA</span>
                  <span>0</span>
                </div>

                <div className="d-flex flex-column mobile-row">
                  <span>AAA</span>
                  <span>0</span>
                </div>
              </div>
            </th>
            {/* DESKTOP */}
            <td className="border_right body_text desk_row">
              1
            </td>
            <td className="border_right body_text desk_row">
              0
            </td>
            <td className="border_right body_text desk_row">
              0
            </td>
          </tr>

          {/* MOBILE */}
          <div className="d-flex flex-row justify-content-end total_mobile mobile_row-container-total">
            <div className="d-flex flex-column mobile-row">
              <span>Total</span>
              <span>33</span>
            </div>

            <div className="d-flex flex-column mobile-row">
              <span>A</span>
              <span>19</span>
            </div>

            <div className="d-flex flex-column mobile-row">
              <span>AA</span>
              <span>10</span>
            </div>

            <div className="d-flex flex-column mobile-row">
              <span>AAA</span>
              <span>4</span>
            </div>
          </div>

          {/* DESK */}
          <tr className="total_bottom-container">
            <th
              scope="row"
              className="border-bottom-0 border_right visually-hidden sr-only"
            >
              <span className="visually-hidden">Total</span>
            </th>
            <td className="border-bottom-0 border_right border_left heading_total total_bottom">
              19
            </td>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              10
            </td>
            <td className="border-bottom-0 border_right heading_total total_bottom">
              4
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
