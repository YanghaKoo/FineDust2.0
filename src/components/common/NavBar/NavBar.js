import React from "react";
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = props => {
  return (
    
      <div className="father">        
        <Link to={"/"}><div className="nav-bar">FineDust</div></Link>
        <div></div>
        <div></div>
        <div></div>
        {/* <div className="nav-content">우리동네 미세먼지 & 산책로 알아보기</div> */}
      </div>
    
  );
};

export default NavBar;
