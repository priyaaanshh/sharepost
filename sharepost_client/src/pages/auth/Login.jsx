import { useContext, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { FcGoogle } from "react-icons/fc";
import { PiEyeClosedBold, PiEyeLight } from "react-icons/pi";

import wolf from "../../assets/images/wolf.png";
import { Link, useNavigate } from "react-router-dom";
import server from "../../routes/serverRoute";

import { auth, provider } from "../../components/GoogleAuth/googleAuth";
import { signInWithPopup } from "firebase/auth";
import ResponseMessage from "../../components/messageResponse/MessageResponse";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = (e) => {
    setError(null);
    setSuccess(null);
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    removeCookie("access_token");
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(`${server}/auth/login`, loginInfo);
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        removeCookie("access_token");
        try {
          const response = await axios.post(`${server}/auth/login`, {
            email: result.user.email,
            password: result.user.uid,
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
          setError(error.response.data);
          dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
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
          <h2 className="font-bold text-3xl mt-16">Login</h2>
          <p className="text-sm mt-4">
            If you&apos;re already a member, Easily log in
          </p>

          <form
            onSubmit={(e) => handleLogin(e)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              className="p-2 mt-8 rounded-xl border  focus:outline-none"
              name="username"
              placeholder="Username"
              disabled={loading}
              onChange={(e) => handleChange(e)}
            />
            <div className="relative">
              <input
                type={hide ? "password" : "text"}
                className="p-2 w-full rounded-xl border focus:outline-none"
                name="password"
                placeholder="Password"
                disabled={loading}
                onChange={(e) => handleChange(e)}
              />
              <div
                className="absolute bg-white rounded-xl p-2 top-1/2 right-1 -translate-y-1/2 cursor-pointer"
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
              {loading ? "Logging In" : "Log In"}
            </button>
          </form>

          <div className="my-8 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="flex items-center justify-center">OR</p>
            <hr className="border-gray-400" />
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-white text-gray-600  border-2 w-full rounded-xl py-2"
            onClick={() => handleGoogleLogin()}
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <div className="flex flex-col py-5">
            <p className="text-xs cursor-pointer mb-1">Forgot Password</p>
            <hr className="border-gray-400 my-3" />
            <div className="flex justify-between items-cente">
              <p className="text-xs flex items-center justify-center">
                If you don&rsquo;t have an account, Create
              </p>
              <Link to="/signup">
                <button
                  className="rounded-xl text-xs border-2 p-2 bg-white "
                  disabled={loading}
                >
                  Register
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
}
