import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <div>
      <Link to="/" className="text-white !visited:text-white no-underline" style={{ color: "white" }}>
        Tempo
      </Link>
    </div>
    <nav>
      <Link to="/signup" className="text-white !visited:text-white no-underline" style={{ color: "white" }}>
        Sign Up
      </Link>
      <Link to="/signin" className="text-white !visited:text-white no-underline" style={{ color: "white" }}>
        Sign In
      </Link>
    </nav>
  </header>
);

export default Header;
