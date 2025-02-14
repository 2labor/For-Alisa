import React from "react"
import { useLocation } from "react-router-dom";

const Header = (props) => {

  const location = useLocation()

  const getTitle = (pathname) => {
    if (pathname === '/') return "Home";
    if (pathname.startsWith("/mail")) return "Mail";
    if (pathname.startsWith("/inventory")) return "Inventory";
    if (pathname.startsWith("/archive")) return "Archive";
    return "Error: 404";
  };

  const title = getTitle(location.pathname);

  return (
    <header className="header">
      <h1>
        {title}
      </h1> 
    </header>
  )
};

export default Header;
