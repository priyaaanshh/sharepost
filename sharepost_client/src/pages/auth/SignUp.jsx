import { useContext, useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { PiEyeClosedBold, PiEyeLight } from "react-icons/pi";
import { FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import wolf from "../../assets/images/wolf.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import server from "../../routes/serverRoute";

import { auth, provider } from "../../components/GoogleAuth/googleAuth";
import { signInWithPopup } from "firebase/auth";
import ResponseMessage from "../../components/messageResponse/MessageResponse";
import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../../context/authContext";

const override = css`
  position: absolute,
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [hide, setHide] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [registerInfo, setRegisterInfo] = useState({
    profilePicture:
      "https://res.cloudinary.com/dox9ptswj/image/upload/v1708110970/HotelBookUploads/avatar_xxwxee.png",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setSuccess(null);
    setError(null);
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      confirmPassword !== "" &&
      registerInfo.password !== "" &&
      !registerInfo.password?.startsWith(confirmPassword)
    ) {
      setError({ message: "Passwords do not match!!!" });
    } else {
      setError(null);
    }
    setSuccess(null);
  }, [confirmPassword, registerInfo.password]);

  const handleProfilePictureChange = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "HotelBook.com");
      data.append("cloud_name", "dox9ptswj");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dox9ptswj/image/upload",
        data
      );

      const { url } = await uploadRes.data;
      // console.log(url);

      setRegisterInfo({ ...registerInfo, [e.target.name]: url });
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    removeCookie("access_token");
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        `${server}/auth/register`,
        registerInfo
      );
      if (response.data.success) {
        const token = response.data.access_token;
        setCookie("access_token", token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }); // Max age is in seconds (7 days)
        setSuccess(response.data.message);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.access_token,
            user: response.data.user,
          },
        });
        setError(null);
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      removeCookie("access_token");
      console.log(error);
    }
    setLoading(false);
  };

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  function generateUsername(name, length = 3) {
    const words = name.split(" ");
    const firstName = words[0];
    const randomString = generateRandomString(length);
    const username = `${firstName}@${randomString}`;
    return username;
  }

  const handleGoogleSignUp = async () => {
    dispatch({ type: "LOGIN_START" });
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const username = generateUsername(result?.user?.displayName);

      if (result.user) {
        removeCookie("access_token");
        try {
          const response = await axios.post(`${server}/auth/register`, {
            username: username,
            email: result.user.email,
            password: result.user.uid,
            profilePicture: result.user.photoURL,
            name: result.user.displayName,
          });
          if (response.data.success) {
            const token = response.data.access_token;
            setCookie("access_token", token, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            }); // Max age is in seconds (7 days)
            setSuccess(response.data.message);
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                token: response.data.access_token,
                user: response.data.user,
              },
            });
            setError(null);
            navigate("/");
          }
        } catch (error) {
          dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
          setError(error.response.data);
          removeCookie("access_token");
          console.log(error);
        }
      }
    } catch (error) {
      console.log("Error signing in with Google:", error.code, error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 h-screen flex items-center justify-center p-5">
      <div className="bg-cyan-100 flex rounded-2xl max-w-4xl p-5 shadow-lg">
        <div className="sm:w-1/2 text-[#002D74] px-8">
          <h2 className="font-bold text-3xl mt-16">Sign Up</h2>
          <p className="text-sm mt-4">
            If you don&apos;t have an account, Easily create
          </p>

          <form
            onSubmit={(e) => handleRegister(e)}
            className="flex flex-col gap-4"
          >
            <div
              className="
              mt-4
              w-full
              flex
              items-center justify-center
            "
            >
              <div
                className="
                    flex items-center justify-center 
                    text-center
                    w-20 h-20
                    "
              >
                <label
                  className="cursor-pointer relative"
                  htmlFor="profilePicture"
                >
                  {!uploading && (
                    <div>
                      <img
                        src={registerInfo.profilePicture}
                        alt="Profile"
                        className="rounded-5xl"
                      />

                      <div className="absolute flex items-center justify-center bg-white rounded-full text-black text-xl  bottom-0 right-0">
                        <FaPlusCircle />
                      </div>
                    </div>
                  )}
                  <FadeLoader
                    color={"#123abc"}
                    loading={uploading}
                    css={override}
                    size={150}
                  />
                </label>
              </div>
              <input
                className="hidden"
                name="profilePicture"
                id="profilePicture"
                type="file"
                onChange={(e) => handleProfilePictureChange(e)}
              />
            </div>
            <input
              type="text"
              className="p-2 rounded-xl border focus:outline-none"
              name="username"
              placeholder="Username"
              disabled={loading}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              className="p-2 rounded-xl border focus:outline-none"
              name="email"
              placeholder="Email"
              disabled={loading}
              onChange={(e) => handleChange(e)}
            />{" "}
            <input
              type="password"
              className="p-2 w-full rounded-xl border focus:outline-none"
              name="password"
              placeholder="Password"
              disabled={loading}
              onChange={(e) => handleChange(e)}
            />
            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                className="p-2 w-full rounded-xl border focus:outline-none"
                placeholder="Confirm Password"
                disabled={loading}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                onClick={() => setHide(!hide)}
              >
                {hide ? (
                  <PiEyeClosedBold fill="gray" />
                ) : (
                  <PiEyeLight fill="gray" />
                )}
              </div>
            </div>
            {error && <ResponseMessage message={error.message} error={true} />}
            {success && <ResponseMessage message={success} error={false} />}
            <button
              className="bg-[#003674db] rounded-xl text-white py-2
            hover:bg-[#002D74] duration-300
            "
              disabled={loading}
            >
              Sign Up
            </button>
          </form>

          <div className="my-8 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="flex items-center justify-center">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button
            className="flex items-center justify-center gap-2 bg-white text-gray-600  border-2 w-full rounded-xl py-2"
            onClick={() => handleGoogleSignUp()}
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <div className="flex flex-col py-5">
            <div className="flex justify-between items-cente">
              <p className="text-xs flex items-center justify-center">
                If you&rsquo;re already a member, log in
              </p>
              <Link to="/login">
                <button
                  className="rounded-xl text-xs border-2 p-2 bg-white"
                  disabled={loading}
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:flex hidden items-center justify-center w-1/2">
          <img src={wolf} alt="/" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
