import {
  faChartLine,
  faChartSimple,
  faChevronRight,
  faRightFromBracket,
  faUsers,
  faWallet
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/imgs/logo.png";
import "./styles.css";

export const Nav = () => {
  return (
    <div className="nav-container">
      <nav>
        <div className="logo-nav">
          <img src={logo} alt="Fifa Trade Brasil" />
          <h3>FIFA TRADE BRASIL</h3>
        </div>
        <ul>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faChartLine} /> <b>Dashboard</b>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faChartSimple} /> <b>Estatísticas</b>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faWallet} /> <b>Transações</b>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faUsers} /> <b>Usuários</b>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faRightFromBracket} /> <b>Logout</b>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
