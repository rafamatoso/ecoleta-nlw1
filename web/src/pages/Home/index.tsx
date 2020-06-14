import React from "react";
import { Link } from "react-router-dom";

import { Header } from "../../components/Header";

import ic from "../../assets/icons";
import { titleHome, descriptionHome, buttonTxtHome } from "../../utils/strings";

import "./styles.css";

export const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <Header></Header>

        <main>
          <h1>{titleHome}</h1>
          <p>{descriptionHome}</p>
          <Link to="/create-point">
            <span>
              <img
                src={ic.login}
                alt="Ícone representando o acesso a aplicação"
              />
            </span>
            <strong>{buttonTxtHome}</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};
