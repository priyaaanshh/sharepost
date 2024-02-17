import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    user: null,
    access_token: null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {

    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                access_token: null,
                loading: false,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                access_token: action.payload.token,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                access_token: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                access_token: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                access_token: state.access_token,
                loading: state.loading,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}