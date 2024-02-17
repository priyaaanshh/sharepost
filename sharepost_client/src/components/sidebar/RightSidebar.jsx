import React, { useContext } from "react";
import avatar from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useCookies } from "react-cookie";

const RightSidebar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  return (
    <div className="sticky top-0 text-lg flex flex-col items-start justify-between py-2 px-4 w-full  lg:w-80 h-screen">
      <div className="shadow-md flex items-center justify-between px-4 py-2 w-full h-20 bg-cyan-100 rounded-lg flex-col lg:flex-row">
        <div className="flex items-center justify-normal gap-3 cursor-pointer">
          <img
            className="w-10 rounded-full object-cover overflow-hidden"
            src={user?.profilePicture}
            alt=""
          />
          <div className="text-semibod hidden lg:flex">{user?.username}</div>
        </div>
        <Link
          to="/login"
          className="cursor-pointer text-sm text-blue-700"
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            removeCookie("access_token");
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default RightSidebar;
