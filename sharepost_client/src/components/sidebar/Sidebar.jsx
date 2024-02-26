import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty, IoIosSend, IoMdLogOut } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoCompassOutline, IoSearchOutline } from "react-icons/io5";
import { BsPlusSquare } from "react-icons/bs";
import { AuthContext } from "../../context/authContext";
import { useCookies } from "react-cookie";

const Sidebar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  return (
    <div className="sticky top-0 shadow-md text-lg flex flex-col items-start justify-between py-8 w-max lg:w-64 h-screen bg-cyan-100">
      <div className="flex flex-col w-full items-center justify-start gap-4">
        <Link
          to="/"
          className="flex my-8 items-center justify-start gap-3 px-6 lg:px-12 py-8 w-full h-10 rounded-md cursor-pointer"
        >
          <div className="text-xl font-semibold italic">
            Sharepost.com
          </div>
        </Link>

        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <GoHome />
          </div>
          <div className="flex">Home</div>
        </Link>
        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <IoSearchOutline />
          </div>
          <div className="flex">Search</div>
        </Link>
        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <IoCompassOutline />
          </div>
          <div className="flex">Explore</div>
        </Link>
        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <IoIosSend />
          </div>
          <div className="flex">Messages</div>
        </Link>
        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <IoIosHeartEmpty />
          </div>
          <div className="flex">Notification</div>
        </Link>
        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <BsPlusSquare />
          </div>
          <div className="flex">Create</div>
        </Link>
        <Link
          to="/"
          className="flex items-center justify-start gap-3 px-5 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
        >
          <div className="flex items-center justify-center ">
            <img
              className="h-6 object-cover rounded-full overflow-hidden"
              src={user?.profilePicture}
              alt=""
            />
          </div>
          <div className="flex">Profile</div>
        </Link>
      </div>

      <div className="flex w-full">
        <Link
          to="/login"
          className="flex items-center justify-start gap-3 px-6 lg:px-12 py-2 w-full  h-10  cursor-pointer
                  hover:bg-slate-300 duration-200
                  
          "
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            removeCookie("access_token");
          }}
        >
          <div className="flex items-center justify-center ">
            <IoMdLogOut />
          </div>
          <div className="flex">Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
