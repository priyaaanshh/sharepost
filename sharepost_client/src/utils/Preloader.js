import axios from "axios";
import server from "../routes/serverRoute";

export const authenticateToken = async (cookies, dispatch) => {
  if (!cookies.access_token) return;
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.get(
      `${server}/user/get/${cookies.access_token}`
    );
    if (response.data.success) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: cookies.access_token,
          user: response.data.user,
        },
      });
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    console.log(error);
  }
}

export default authenticateToken;