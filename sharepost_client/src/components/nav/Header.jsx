import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-600 w-full text-white">
      <div className="flex items-center justify-between px-12 py-4">
        <Link to="/">My Site</Link>
        <div className="flex items-center justify-center gap-4">
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
