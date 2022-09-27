import {
  faChartLine,
  faChartSimple,
  faChevronRight,
  faRightFromBracket,
  faUsers,
  faWallet
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/imgs/logo.png";
import { AuthContext } from "../../context/Auth";
import { User } from "../../services/auth.service";
import { getItem } from "../../utils/asyncStorage";
import "./styles.css";

export const Nav = () => {
  const { singOut } = useContext(AuthContext);
  const [profile, setProfile] = useState<User>({} as User);

  useEffect(() => {
    const getProfile = async () => {
      const user = JSON.parse((await getItem("@user")) as string);
      setProfile(user);
    };

    getProfile();
  }, [profile, setProfile]);

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
            <a href="/" onClick={singOut}>
              <FontAwesomeIcon icon={faRightFromBracket} /> <b>Logout</b>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </a>
          </li>
        </ul>
        <div className="profile">
          <h6>Bem vindo 😁</h6>
          <h4>{profile.name}</h4>
          <h5>{profile.email}</h5>
        </div>
      </nav>
    </div>
  );
};
