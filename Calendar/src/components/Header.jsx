import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    My Calendar
    <nav>
      <Link to="/signup">
          Sign Up
        </Link>
        <Link to="/signin">
          Sign In
        </Link>
      </nav>
  </header>
);

export default Header;