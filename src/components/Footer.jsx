import React from "react"
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Footer = (props) => {

  const location = useLocation();

  const letters = useSelector((state) => state.mail.letters);
  const readLetters = useSelector((state) => state.mail.readLetters);

  const newLettersCount = letters.filter(
    (letter) => letter.status === "unlocked" && !readLetters.includes(letter.id)
  ).length;


  return (
    <div>
      <footer className="footer">
        <div className="footer-option">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">
                <img src="home.png" alt="/" className="footer-img" />
                <h3 className="footer-name">Home</h3>
              </Link>
            </li>
            <li className={location.pathname === "/mail" ? "active" : ""}>
              <Link to="mail">
              {newLettersCount > 0 && (
                  <div className="new-letter-badge">{newLettersCount}</div>
                )}
                <img src="mail.png" alt="/" className="footer-img" />
                <h3 className="footer-name">Mail</h3>
              </Link>
            </li>
            <li className={location.pathname === "/inventory" ? "active" : ""}>
              <Link to="inventory">
                <img src="box.png" alt="/" className="footer-img" />
                <h3 className="footer-name">Inventory</h3>
              </Link>
            </li>
            <li className={location.pathname === "/archive" ? "active" : ""}>
              <Link to="archive">
                <img src="gift.png" alt="/" className="footer-img" />
                <h3 className="footer-name">Archive</h3>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
};

export default Footer;
